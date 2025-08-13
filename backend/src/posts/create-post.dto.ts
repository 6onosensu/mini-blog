import { IsString, MinLength, IsOptional, IsArray, } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  @MinLength(200, { 
    message: 'Description must be at least 200 characters long.' 
  })
  description: string;

  @IsString()
  content: string; 

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}

