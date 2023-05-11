import { UserNotFoundException } from './../../domain/exception/user.notfound.exception';
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';

@Catch(UserNotFoundException)
export class UserNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: UserNotFoundException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = HttpStatus.NOT_FOUND;
    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
