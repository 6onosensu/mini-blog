import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from "./auth.controller";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET!,
      signOptions: { expiresIn: process.env.JWT_ACCESS_EXPIRES},
    }),
    UsersModule, 
  ],
  controllers: [AuthController],
  providers: [JwtStrategy],
})

export class AuthModule {}