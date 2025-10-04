import logger from "../config/logger";
import User, { AuthUser, Role, UserCreationAttributes } from "../models/user";
import { SignUpResponseDto, LoginRequestDto, AuthServiceLoginResponse, VerifyEmailRequestDto, ResetPasswordRequestDto } from "../types/auth.types";
import { NotFoundError, BadRequestError } from "../utils/errors";
import { PasswordService } from "./PasswordService";
import { UserService } from "./UserService";
import { tokenService, VerificationService } from "./VerificationService";
import EmailService from './emailService'
import { AccountHolderService } from ".";

const accountHolderService = new AccountHolderService()
const userService = new UserService()
const verificationService = new VerificationService()
export class AuthService {



  /**
   * Registers a new user and initiates email verification.
   * @param data - User sign-up data.
   * @param roles - Optional array of user roles.
   * @returns Sign-up response with verification token.
   */
  async signUp(data: UserCreationAttributes): Promise<{ result: SignUpResponseDto; user: User }> {
    try {
      logger.info('Sign up process started', { email: data.email })

      const hashedPassword = await PasswordService.hashPassword(data.password as string)
      const user = await userService.createUser({
        ...data,
        password: hashedPassword,
      })

      const result = await verificationService.generateVerificationDetails(user)

      logger.info('Sign up completed successfully', { userId: user.id })
      return { result, user }
    } catch (error) {
      console.error(error)
      return this.handleAuthError('Sign up', { email: data.email }, error)
    }
  }

  /**
   * Logs a user in by validating credentials and returning tokens.
   * @param data - Login DTO containing email and password.
   * @returns LoginAuthServiceReturn or SignUpResponseDto for unverified users.
   */
  async loginAccountHolder(data: {username:string,password:string}): Promise<any> {
    try {
      logger.info('Login attempt started', { email: data.username })

      const user = await User.findOne({
        where:{
          username:data.username
        }
      })
      console.log('PASSWORD', user?.password)
      // await this.validatePassword(user, data.password)
      if (!user) {
        throw new NotFoundError('user not found')
      }
      if(data.password !== user.password){
        throw new BadRequestError('invalid credentials')
      }
        const accHolder = await accountHolderService.getAccountHolderById(user.id)
        if(!accHolder ){
          throw new NotFoundError('account holder not found')
        }
      const { accessToken, refreshToken } = this.generateTokenPair(user)
      logger.info('Login successful', { userId: user?.id })
      const returnUser = {username:accHolder.firstName,role:Role.ACCOUNT_HOLDER,id:accHolder.id}
      user.refreshToken = refreshToken
      await user.save()
      return { user: returnUser, accessToken, refreshToken }
    } catch (error) {
      console.error(error)
      return this.handleAuthError('Login', { email: data.username }, error)
    }
  }



  /**
   * Logs a user in by validating credentials and returning tokens.
   * @param data - Login DTO containing email and password.
   * @returns LoginAuthServiceReturn or SignUpResponseDto for unverified users.
   */
  async login(data: LoginRequestDto): Promise<AuthServiceLoginResponse | SignUpResponseDto> {
    try {
      logger.info('Login attempt started', { email: data.email })

      const user = await userService.findUserByEmail(data.email, true)
      console.log('PASSWORD', user?.password)
      // await this.validatePassword(user, data.password)
      if (!user) {
        throw new NotFoundError('user not found')
      }
      if(data.password !== user.password){
        throw new BadRequestError('invalid credentials')
      }
      // if (!user.isEmailVerified) {
      //   logger.warn('Login attempted by unverified user', { userId: user.id })
      //   const { verificationToken } =
      //     await verificationService.generateVerificationDetails(user)
      //   return { id: user.id, verificationToken }
      // }
     
      const { accessToken, refreshToken } = this.generateTokenPair(user)
      logger.info('Login successful', { userId: user?.id })
      const returnUser = { ...user.get({ plain: true }) }
      user.refreshToken = refreshToken
      await user.save()
      return { user: returnUser, accessToken, refreshToken }
    } catch (error) {
      console.error(error)
      return this.handleAuthError('Login', { email: data.email }, error)
    }
  }

  /**
   * Issues a new access token from a refresh token.
   * @param refreshToken - JWT refresh token.
   * @returns Object containing a new access token.
   */
  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      logger.info('Token refresh attempted')

      const { decoded } = tokenService.verifyToken(refreshToken, 'refresh')

      if (!decoded.AdminId) {
        logger.warn('Invalid refresh token provided')
        throw new BadRequestError('Invalid refresh token')
      }

      const user = await userService.findUserById(decoded.AdminId)
      const newAccessToken = tokenService.generateAccessToken(user)

      logger.info('Token refreshed successfully', { userId: user.id })
      return { accessToken: newAccessToken }
    } catch (error) {
      console.error(error)
      return this.handleAuthError('Token refresh', {}, error)
    }
  }

  /**
   * Verifies a user's email using a token and code.
   * @param data - DTO containing token and verification code.
   * @returns Auth tokens for the verified user.
   */
  async verifyEmail(data: VerifyEmailRequestDto): Promise<AuthServiceLoginResponse> {
    try {
      logger.info('Email verification started')

      const { decoded } = tokenService.verifyToken(
        data.verificationToken,
        'email_verification'
      )
      console.log(decoded)
      const userId = decoded.AdminId

      if (!userId) {
        logger.warn('Invalid verification token provided')
        throw new BadRequestError('Unsuitable token')
      }

      const user = await userService.findUserById(userId)
  

      verificationService.validateVerificationCode(user, data.verificationCode)
      await userService.markUserAsVerified(user)

      const { accessToken, refreshToken } = this.generateTokenPair(user)
      logger.info('Email verification successful', { userId: user.id })
      const returnUser = { ...user.get({ plain: true }) }
      user.refreshToken = refreshToken
      await user.save()
      return { user: returnUser, accessToken, refreshToken }
    } catch (error) {
      console.error(error)
      return this.handleAuthError('Email verification', {}, error)
    }
  }

  /**
   * Generates a new email verification code.
   * @param token - JWT token associated with the verification.
   * @returns A new verification code string.
   */
  async generateNewCode(id: string, token: string): Promise<string> {
    try {
      logger.info('New verification code generation requested')
      return await verificationService.regenerateVerificationCode(id, token)
    } catch (error) {
      console.error(error)
      return this.handleAuthError('New code generation', {}, error)
    }
  }

  /**
   * Sends a password reset email to the user.
   * @param email - User's email address.
   */
  async forgotPassword(email: string): Promise<void> {
    try {
      logger.info('Password reset requested', { email })

      const user = await userService.findUserByEmail(email)
      if (!user) {
        logger.error('Password reset requested for non-existent email', { email })
        throw new NotFoundError('user for forgot password not found')
      }

      const { token, hashedToken } = PasswordService.generateResetToken()
      await userService.setPasswordResetDetails(user, hashedToken)
      await EmailService.sendPasswordResetEmail(user.email, token)

      logger.info('Password reset email sent', { userId: user.id })
    } catch (error) {
      console.error(error)
      return this.handleAuthError('Password reset', { email }, error)
    }
  }

  /**
   * Resets the user's password using the reset token.
   * @param data - DTO with new password and reset token.
   * @returns New auth tokens.
   */
  async resetPassword(data: ResetPasswordRequestDto): Promise<AuthServiceLoginResponse> {
    try {
      logger.info('Password reset process started')

      const user = await userService.findUserByResetToken(data.resetPasswordToken)
      const hashedPassword = await PasswordService.hashPassword(data.password)
      await userService.updateUserPassword(user, hashedPassword)

      const { accessToken, refreshToken } = this.generateTokenPair(user)
      logger.info('Password reset successful', { userId: user.id })
     
      return this.saveRefreshTokenAndReturn(user, accessToken, refreshToken)
    } catch (error) {
      console.error(error)
      return this.handleAuthError('Password reset', {}, error)
    }
  }

  /**
   * Retrieves a user by ID.
   * @param userId - ID of the user.
   * @returns User object.
   */
  async getUserById(userId: string) {
    try {
      logger.info('Get user by ID requested', { userId })

      const user = await userService.findUserById(userId)
      logger.info('User retrieved successfully', { userId: user.id })

      return user
    } catch (error) {
      console.error(error)
      return this.handleAuthError('Get user by ID', { userId }, error)
    }
  }

  /**
   * Returns the current authenticated user's details.
   * @param userId - Authenticated user's ID.
   * @returns User object.
   */
  async getMe(userId: number): Promise<AuthUser> {
    try {
      logger.info('Get current user requested', { userId })

      const user = await userService.findUserById(userId)
      let authUser ={
        id:0,
        username:'',
        role:user.role
      }
      if(user.role === Role.ACCOUNT_HOLDER){
      
        const accHolder = await accountHolderService.getAccountHolderById(user.id)
        if(!accHolder ){
          throw new NotFoundError('account holder not found')
        }

        authUser.id = accHolder.id
        authUser.username = accHolder.firstName
      }else{
        authUser = user
      }
      logger.info('Current user retrieved successfully', { userId })

      return authUser as unknown as AuthUser
    } catch (error) {
      console.error(error)
      return this.handleAuthError('Get current user', { userId }, error)
    }
  }

  /**
   * Compares the given password with the user's stored password.
   * @param user - User instance.
   * @param password - Plain text password to validate.
   */
  private async validatePassword(user: any, password: string): Promise<void> {
    const isMatch = await PasswordService.comparePasswords(password, user.password)
    if (!isMatch) {
      logger.warn('Password validation failed', { userId: user.id })
      throw new BadRequestError('Invalid credentials')
    }
    logger.info('Password validated successfully', { userId: user.id })
  }

  /**
   * Generates a new access/refresh token pair.
   * @param userId - ID of the user.
   * @returns Object containing access and refresh tokens.
   */
  private generateTokenPair(user:User ): { accessToken: string; refreshToken: string } {
    const accessToken = tokenService.generateAccessToken(user)

    const refreshToken = tokenService.generateRefreshToken(user)

    return { accessToken, refreshToken }
  }

  /**
   * Saves the refresh token on the user and returns the full auth response.
   * @param user - User instance.
   * @param accessToken - JWT access token.
   * @param refreshToken - JWT refresh token.
   * @returns Full login/auth return object.
   */
  private async saveRefreshTokenAndReturn(
    passedUser: any,
    accessToken: string,
    refreshToken: string,
  
  ): Promise<AuthServiceLoginResponse> {
    passedUser.refreshToken = refreshToken
    await passedUser.save()
    const user = { ...passedUser }

    return { accessToken, user, refreshToken }
  }

  /**
   * Unified error handler for all auth-related operations.
   * @param operation - Operation name for logging.
   * @param context - Additional context info.
   * @param error - Error caught during operation.
   * @throws Error - Re-throws the original error.
   */
  private async handleAuthError(
    operation: string,
    context: Record<string, any>,
    error: any
  ): Promise<never> {
    logger.error(`${operation} failed`, { ...context, error })
    throw error
  }
}