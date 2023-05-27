import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UserGameExistsException } from 'src/game/domain/exception/user.game.exists.exception';
import { EmailUsedException } from 'src/user/domain/exception/email.used.exception';
import { PassNotMatchException } from 'src/user/domain/exception/pass.not.match.exception';
import { UsernameUsedException } from 'src/user/domain/exception/username.used.exception';

@Catch(EmailUsedException, PassNotMatchException, UserGameExistsException)
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
