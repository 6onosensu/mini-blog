import { IsString, MinLength, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class ChangePasswordDto {
  @Transform(({ value }) => value?.trim())
  @IsString()
  @MinLength(8)
  currentPassword: string;

  @Transform(({ value }) => value?.trim())
  @IsString()
  @MinLength(8)
  newPassword: string;
}
