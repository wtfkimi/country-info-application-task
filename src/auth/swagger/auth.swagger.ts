import { ApiProperty } from '@nestjs/swagger';
import { HttpExceptionFilterSwagger } from '../../infrastructure/exception.filter';

export class LoginBodyRequest {
  @ApiProperty({
    required: true,
    description: 'email address',
    type: String,
    example: 'admin@example.com',
  })
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'password',
    example: '12345678',
  })
  password: string;
}

export class TokenResponse {
  @ApiProperty({
    required: false,
    description: 'token for request',
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTc1MzU1MDAwMH0.xTTFFdQJDl5Ht_RFhPdK7kRBUpwS4_WnBACQvafwNKQ',
  })
  access_token: string;
}

export class LoginBodyUserNotFoundResponse extends HttpExceptionFilterSwagger {
  @ApiProperty({
    type: String,
    description: 'message: "User not found", statusCode: 404, path: /auth/login',
    required: true,
  })
  message: string;
}

export class LoginBodyUserNotAuthorizedResponse extends HttpExceptionFilterSwagger {
  @ApiProperty({
    type: String,
    description: 'message: "Unauthorized", statusCode: 404, path: /auth/login',
    required: true,
  })
  message: string;
}

export class RegisterUserExistResponse extends HttpExceptionFilterSwagger {
  @ApiProperty({
    type: String,
    description: 'message: "email already exists", statusCode: 400, path: /auth/register',
    required: true,
  })
  message: string;
}
