import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from "@nestjs/jwt"
import { JwtStrategy } from './jwt-strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { async } from 'rxjs';

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.registerAsync(
    {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get("JWT_SECRET"),
          signOptions: {
            expiresIn: 3600
          }
        }
      }
    }
  ),
  TypeOrmModule.forFeature([UserRepository]),
    ConfigModule
  ],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
