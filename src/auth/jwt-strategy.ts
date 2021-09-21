import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy, ExtractJwt } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./users.repository";
import { User } from "./user.entity";
@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {
    super({
      secretOrKey: 'manakibako',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate(payload: { username: string }): Promise<User> {
    const { username } = payload
    const user: User = await this.userRepository.findOne({ username })
    if (!user) throw new UnauthorizedException()
    return user

  }
}