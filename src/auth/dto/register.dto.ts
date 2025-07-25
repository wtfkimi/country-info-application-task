import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'first name',
    example: 'vasya',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  firstName: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'last name',
    example: 'pupkin',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  lastName: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'email',
    example: 'example@example.com',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'password',
    example: '12345678',
  })
  @MinLength(8)
  @MaxLength(255)
  @IsString()
  password: string;
}
