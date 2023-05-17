import { PassNotMatchException } from './../../domain/exception/pass.not.match.exception';
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { EmailUsedException } from 'src/user/domain/exception/email.used.exception';
import { UsernameUsedException } from 'src/user/domain/exception/username.used.exception';
import { Response } from 'express';

@Catch(UsernameUsedException, EmailUsedException, PassNotMatchException)
export class ConflictExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = HttpStatus.CONFLICT;
    const message = exception.message;
    const errorName = HttpStatus[status];

    response.status(status).json({
      statusCode: status,
      error: errorName,
      message: message,
    });
  }
}
