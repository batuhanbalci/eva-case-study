import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

export enum PrismaErrorCode {
  RecordDoesNotExist = 'P2025',
  CredentialsAreTaken = 'P2002',
  UniqueConstraintFailed = 'P2002',
}

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  private simplifyErrorMessage(message: string): string {
    const shortMessage = message.substring(message.indexOf('→'));

    return shortMessage
      .substring(shortMessage.indexOf('\n'))
      .replace(/\n/g, '')
      .trim();
  }

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);

    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const message = this.simplifyErrorMessage(exception.message);

    switch (exception.code) {
      case PrismaErrorCode.UniqueConstraintFailed: {
        const status = HttpStatus.FORBIDDEN;
        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;
      }
      case PrismaErrorCode.RecordDoesNotExist: {
        const status = HttpStatus.NOT_FOUND;
        response.status(status).json({
          statusCode: status,
          message: message,
        });
      }
      default:
        super.catch(exception, host);
        break;
    }
  }
}
