import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UserNotFoundException } from 'src/user/domain/exception/user.notfound.exception';

@Catch(UserNotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = HttpStatus.NOT_FOUND;
    const message = exception.message;
    const errorName = HttpStatus[status];

    response.status(status).json({
      statusCode: status,
      errorName: errorName,
      message: message,
    });
  }
}
