// services/verification.service.ts

import dotenv from 'dotenv'
import logger from "../config/logger";
import User from "../models/user";

import { BadRequestError, ForbiddenError } from "../utils/errors";

import { UserService } from "./UserService";
import { CodeHelper } from '../utils/codeHelper';
import { TokenService } from './TokenService';
export const tokenService = new TokenService('udorakpuenyi')
dotenv.config()
export class VerificationService {
  
     private readonly userService = new UserService()
     private readonly tokenService = tokenService
  

  async generateVerificationDetails(
    user: User
  ): Promise<{ verificationToken: string; id: number }> {
    try {
      const verificationToken = this.tokenService.generateEmailVerificationToken(user)

      const verificationCode =
        process.env.NODE_ENV === 'production' ? CodeHelper.generateVerificationCode() : '123456'
      console.log('VVVV', verificationCode)

      await this.userService.updateUserVerification(user, verificationCode, verificationToken)
      //await this.emailService.sendVerificationEmail(user)

      logger.info('Verification details generated successfully', { userId: user.id })
      return { verificationToken, id: user.id }
    } catch (error) {
      logger.error('Error generating verification details', { userId: user.id, error })
      throw error
    }
  }

  async regenerateVerificationCode(id: string, token: string): Promise<string> {
    try {
      const user = await this.userService.findUserById(id)
      if (user.verificationToken !== token) throw new BadRequestError('Token does not match')
      const { verificationToken } = await this.generateVerificationDetails(user)
      //await this.emailService.sendVerificationEmail(user)

      logger.info('Verification code regenerated', { userId: user.id })
      return verificationToken
    } catch (error) {
      logger.error('Error regenerating verification code', { error })
      throw error
    }
  }

  validateVerificationCode(user: User, code: string): void {
    console.log(user)
    if (user.verificationCode !== code) {
      logger.warn('Invalid verification code provided', { userId: user.id })
      throw new ForbiddenError('Invalid verification code')
    }
    logger.info('Verification code validated successfully', { userId: user.id })
  }
}