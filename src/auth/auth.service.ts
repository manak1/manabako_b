import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt"
@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserRepository) private usersRepository: UserRepository, private jwtService: JwtService) {}

  signUp(createUserDto: CreateUserDto) {
    return this.usersRepository.createUser(createUserDto)
  }

  async signIn(getUserDto: CreateUserDto): Promise<{ accessToken: string }> {
    const { username, password } = getUserDto
    const user = await this.usersRepository.findOne({ username })

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username }
      const accessToken = await this.jwtService.sign(payload)
      return { accessToken }
    }
    else {
      throw new UnauthorizedException()
    }
  }
}
