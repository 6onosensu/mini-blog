import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { UserValidatorService } from "src/users/application/user-validator.service";


@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userValidator: UserValidatorService
  ) {}

  async execute(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        refreshToken, 
        {
          secret: process.env.JWT_SECRET,
        }
      );
      const user = await this.userValidator.getActiveUserById(payload.sub);
      const newAccessToken = await this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
          role: user.role,
        },
        {
          expiresIn: process.env.JWT_ACCESS_EXPIRES,
        }
      );

      return { accessToken: newAccessToken };
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}