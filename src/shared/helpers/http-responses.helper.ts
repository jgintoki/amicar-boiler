import { HttpException } from '@nestjs/common';
import { HttpResponse } from '../types/commons.interface';

export const httpErrorResponse = (params: HttpResponse) => {
  const defaultParams: HttpResponse = {
    statusCode: 500,
    message: 'An unexpected error occurred',
  };

  throw new HttpException(
    {
      ...defaultParams,
      statusCode: params.statusCode,
      message: params.message,
      response: params.response,
    },
    params.statusCode,
  );
};

export const httpSuccessResponse = <T extends Record<string, unknown>>(
  params: HttpResponse<T>,
) => {
  return {
    statusCode: params.statusCode,
    message: params.message,
    response: params.response,
  };
};
