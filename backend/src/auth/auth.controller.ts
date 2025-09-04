import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { LoginUseCase } from "./application/login.use-case";
import { CreateUserDto } from "src/users/presentation/dto/create-user.dto";
import { RegisterUserUseCase } from "src/users/application/register-user.use-case";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { RefreshTokenUseCase } from "./application/refresh-token.use-case";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { ForgotPasswordUseCase } from "./application/forgot-password.use.case";
import { ResetPasswordUseCase } from "./application/reset-password.use-case";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly refreshUseCase: RefreshTokenUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
  ) {}

  @Post('login')
  async login (@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto.email, dto.password);
  }

  @Post('register')
  async register(@Body() dto: CreateUserDto): Promise<{ message: string }> {
    await this.registerUserUseCase.execute(dto);
    return { message: 'User successfully registered' };
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.refreshUseCase.execute(dto.refreshToken);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.forgotPasswordUseCase.execute(dto.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.resetPasswordUseCase.execute(dto.token, dto.newPassword);
  }
}