import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UnauthorizedException } from 'src/auth/application/exception/unauthorized.exception';

@Catch(UnauthorizedException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = HttpStatus.FORBIDDEN;
    const message = exception.message;
    const errorName = HttpStatus[status];

    response.status(status).json({
      statusCode: status,
      error: errorName,
      message: message,
    });
  }
}
