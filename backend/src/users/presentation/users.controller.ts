import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { CreateUserUseCase } from "../application/create-user.use-case";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: CreateUserDto) {
    await this.createUserUseCase.execute(dto);
    return { message: 'User created!'}
  }
}