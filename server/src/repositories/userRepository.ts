import User, { UserCreationAttributes } from "../models/user"
import { BaseRepository } from "./baseRepository"

class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User)
  }

  async createUser(userData: UserCreationAttributes): Promise<User> {
    return await this.create(userData)
  }

  async findUserByEmail(email: string): Promise<User| null> {
  
    return await this.findOne({ email }) as User| null
  }

  async findUserById(id: number): Promise<User| null> {
  
    return await this.findById(id) as User| null
  }

  async findUserByResetToken(hashedToken: string): Promise<User| null> {
  
    return await this.findOne({ passwordResetToken: hashedToken }) as User| null
  }

  async findUserByVerificationToken(token: string): Promise<User | null> {
    return await this.findOne({ verificationToken: token })
  }

  async updateUserById(id: string | number, updates: Partial<User>){
    return await this.update(id as number, updates)
  }

  async getAllUsers(): Promise<User[]> {
    const result = await this.findAll()
    return result
  }
   async findByRole(role: string): Promise<User[]> {
    return await this.findAll({
      where: { role },
      order: [['email', 'ASC']],
    });
  }
}

export default UserRepository