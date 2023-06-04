import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConflictExceptionFilter } from './api_rest/exception/conflict.exception.handler';
import { NotFoundExceptionFilter } from './api_rest/exception/notfound.exception.handler';
import { BadRequestExceptionFilter } from './api_rest/exception/badrequest.exception.handler';
import { ForbiddenExceptionFilter } from './api_rest/exception/forbidden.exception.handler';

@Module({
  providers: [
    {
      //To create the exception handler
      provide: APP_FILTER, //Exception filter provider of app
      useClass: ConflictExceptionFilter, //Filter type (exceptions)
    },
    {
      //To create the exception handler
      provide: APP_FILTER, //Exception filter provider of app
      useClass: NotFoundExceptionFilter, //Filter type (exceptions)
    },
    {
      //To create the exception handler
      provide: APP_FILTER, //Exception filter provider of app
      useClass: BadRequestExceptionFilter, //Filter type (exceptions)
    },
    {
      //To create the exception handler
      provide: APP_FILTER, //Exception filter provider of app
      useClass: ForbiddenExceptionFilter, //Filter type (exceptions)
    },
  ],
})
export class ErrorHandlerModule {}
