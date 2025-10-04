import bcrypt from 'bcryptjs'
import logger from '../config/logger'
import { CryptoUtil } from '../utils/cryptoUtil'



export class PasswordService {
  static readonly SALT_ROUNDS = 12

  static async hashPassword(password: string): Promise<string> {
    if (!password) {
      logger.error('Password hashing attempted with empty password')
      throw new Error('Password is required')
    }

    try {
      const hashedPassword = await bcrypt.hash(password, PasswordService.SALT_ROUNDS)
      logger.info('Password hashed successfully')
      return hashedPassword
    } catch (error) {
      logger.error('Password hashing failed', { error })
      throw new Error('Password hashing failed')
    }
  }

  static async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    if (!plainPassword || !hashedPassword) {
      logger.error('Password comparison attempted with missing parameters')
      throw new Error('Both passwords are required for comparison')
    }

    try {
      const isMatch = await bcrypt.compare(plainPassword, hashedPassword)
      console.log('UUUUUUUUUUUUU', isMatch)
      logger.info('Password comparison completed', { isMatch })
      return isMatch
    } catch (error) {
      logger.error('Password comparison failed', { error })
      throw new Error('Password comparison failed')
    }
  }

  static generateResetToken(): { token: string; hashedToken: string } {
    try {
      const tokens = CryptoUtil.generateSecureToken()
      logger.info('Password reset token generated successfully')
      return tokens
    } catch (error) {
      logger.error('Reset token generation failed', { error })
      throw new Error('Reset token generation failed')
    }
  }
}