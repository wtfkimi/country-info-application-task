import { BadRequestException, Body, Controller, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../infrastructure/decorators/public.decorator';
import { AccessToken, AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import {
  LoginBodyRequest,
  LoginBodyUserNotAuthorizedResponse,
  LoginBodyUserNotFoundResponse,
  RegisterUserExistResponse,
  TokenResponse,
} from './swagger/auth.swagger';
import { AuthenticatedRequest } from './types/auth.types';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login to application' })
  @ApiBody({
    type: LoginBodyRequest,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: TokenResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: LoginBodyUserNotFoundResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: LoginBodyUserNotAuthorizedResponse,
  })
  @UseGuards(AuthGuard('local'))
  @Public()
  @Post('login')
  async login(@Request() req: AuthenticatedRequest): Promise<AccessToken> {
    return await this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Register to application' })
  @ApiBody({
    type: RegisterDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: TokenResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: RegisterUserExistResponse,
  })
  @Public()
  @Post('register')
  async register(@Body() registerBody: RegisterDto): Promise<AccessToken> {
    return await this.authService.register(registerBody);
  }
}
