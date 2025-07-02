import { HttpException } from '@nestjs/common';
import { HttpResponse } from '../types/commons.interface';

export const httpErrorResponse = (params: HttpResponse) => {
  throw new HttpException(
    {
      status: params.status,
      title: params.title,
      message: params.message,
      response: params.response,
    },
    params.status,
  );
};

export const httpSuccessResponse = <T extends Record<string, unknown>>(
  params: HttpResponse<T>,
) => {
  return {
    status: params.status,
    title: params.title,
    message: params.message,
    response: params.response,
  };
};
