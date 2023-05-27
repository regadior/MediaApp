import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = HttpStatus.BAD_REQUEST;
    const { message } = exception.getResponse();
    const errorName = HttpStatus[status];
    const errors = Array.isArray(message) ? message : [message];
    response.status(status).json({
      statusCode: status,
      error: errorName,
      message: errors,
    });
  }
}
