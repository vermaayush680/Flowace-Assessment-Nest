import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller'

@Module({
  controllers: [AuthController],
  imports: [PrismaModule,PassportModule, JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s' },
    }),],
  providers: [AuthService, JwtStrategy, UsersService],
  exports: [AuthService]
})
export class AuthModule {}