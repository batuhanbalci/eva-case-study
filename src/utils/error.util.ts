import { HttpException, HttpStatus } from '@nestjs/common';

export const generateHttpException = (status: HttpStatus, error: string) => {
  return new HttpException(
    {
      status,
      error,
    },
    status,
    {},
  );
};
