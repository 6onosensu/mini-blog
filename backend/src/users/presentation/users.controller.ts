import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { ChangePasswordUseCase } from "../application/change-password.use-case";
import { AuthGuard } from "@nestjs/passport";
import { ChangePasswordDto } from "./dto/change-password.dto";


@Controller('users')
export class UsersController {
  constructor(
    private readonly changePassword: ChangePasswordUseCase
  ) {}

  @UseGuards(AuthGuard("jwt"))
  @Post("me/password")
  @HttpCode(HttpStatus.NO_CONTENT)
  async changeMyPassword(
    @Body() dto: ChangePasswordDto, 
    @Req() req: any
  ): Promise<void> {
    await this.changePassword.execute(
      req.user.sub, dto.newPassword, dto.currentPassword
    );
  }
}