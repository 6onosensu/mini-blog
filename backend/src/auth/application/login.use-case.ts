import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compareSync } from 'bcrypt';
import { UserValidatorService } from "src/users/application/user-validator.service";


@Injectable()
export class LoginUseCase {
  constructor(
    private readonly validator: UserValidatorService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    email: string, 
    password: string
  ): Promise<{ accessToken: string }> {
    const user = await this.validator.getActiveUserByEmail(email);

    const ok = compareSync(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}