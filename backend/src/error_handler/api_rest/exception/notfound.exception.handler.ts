import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UserGameNotFoundException } from 'src/game/domain/exception/user.game.notfound.exception';
import { UserGameStateNotFoundException } from 'src/game/domain/exception/user.game.state.notfound.exception';
import { UserNotFoundException } from 'src/user/domain/exception/user.notfound.exception';

@Catch(UserNotFoundException, UserGameNotFoundException, UserGameStateNotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = HttpStatus.NOT_FOUND;
    const message = exception.message;
    const errorName = HttpStatus[status];

    response.status(status).json({
      statusCode: status,
      error: errorName,
      message: message,
    });
  }
}
