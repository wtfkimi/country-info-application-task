import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    let message: string | string[] = exception.message;

    if (typeof exceptionResponse === 'object' && exceptionResponse !== null && 'message' in exceptionResponse) {
      message = (exceptionResponse as any).message;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}

export class HttpExceptionFilterSwagger {
  @ApiProperty({
    type: Number,
    required: true,
    description: 'status code',
  })
  statusCode: number;

  @ApiProperty({
    type: String,
    required: true,
    description: 'timestamp error',
  })
  timestamp: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'path of request',
  })
  path: string;
  @ApiProperty({
    type: String,
    required: true,
    description: 'error message description\n P.S could be also array of string string[]',
  })
  message: string | string[];
}
