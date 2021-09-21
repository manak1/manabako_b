import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt"

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { username, password } = createUserDto;

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = this.create({
      username,
      password: hashedPassword,
      questions: []
    })
    try {
      await this.save(user)
    } catch (error) {
      if (error.code === 23505) {
        throw new ConflictException('ユーザー名が既に利用されています。')
      }
      else {
        throw new InternalServerErrorException()
      }
    }
  }
}