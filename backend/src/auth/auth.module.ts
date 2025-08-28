import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from "./auth.controller";
import { UsersModule } from "src/users/users.module";
import { LoginUseCase } from "./application/login.use-case";
import { RegisterUserUseCase } from "src/users/application/register-user.use-case";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET!,
      signOptions: { expiresIn: process.env.JWT_ACCESS_EXPIRES},
    }),
    UsersModule, 
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    RegisterUserUseCase,
    LoginUseCase,
  ],
})

export class AuthModule {}