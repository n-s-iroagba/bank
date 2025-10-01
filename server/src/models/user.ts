import { DataTypes, Model, Sequelize, Optional } from 'sequelize'
import sequelize from '../config/database'

export enum Role {
  ADMIN = 'ADMIN',
  ACCOUNT_HOLDER = 'ACCOUNT_HOLDER'
}

export interface AuthUser {
  id: number
  username: string
  role: Role
  email: string
}

interface UserAttributes {
  id: number
  username: string
  email: string
  password: string
  role: Role
  isEmailVerified: boolean
  verificationCode?: string | null
  verificationToken?: string | null
  passwordResetToken?: string | null
  refreshToken?: string | null
  googleId?: string | null
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    | 'id'
    | 'isEmailVerified'
    | 'verificationCode'
    | 'verificationToken'
    | 'passwordResetToken'
    | 'role'
    | 'googleId'
    | 'createdAt'
    | 'refreshToken'
    | 'updatedAt'
    | 'password'
    | 'deletedAt'
  > {}

class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: number
  public username!: string
  public email!: string
  public password!: string
  public role!: Role
  public isEmailVerified!: boolean
  public verificationToken!: string | null
  public refreshToken!: string | null
  public verificationCode!: string | null
  public passwordResetToken!: string | null
  public googleId!: string | null

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date | null

  public static initialize(sequelize: Sequelize) {
    return User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isEmailVerified: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        verificationToken: {
          type: DataTypes.STRING(400),
          allowNull: true,
        },
        verificationCode: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        googleId: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        passwordResetToken: {
          type: DataTypes.STRING(400),
          allowNull: true,
        },
        refreshToken: {
          type: DataTypes.STRING(400),
          allowNull: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM(...Object.values(Role)),
          allowNull: false,
          defaultValue: Role.ACCOUNT_HOLDER,
        },
      },
      {
        sequelize,
        tableName: 'users',
        paranoid: true, // soft delete enabled
        timestamps: true,
      }
    )
  }
}

export default User
