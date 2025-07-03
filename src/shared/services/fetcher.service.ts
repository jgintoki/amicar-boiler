import { Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosResponse } from 'axios';

export interface FetchParams {
  url: string;
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
  headers?: Record<string, string>;
  body?: Record<string, any>;
  timeout?: number;
  responseType?:
    | 'json'
    | 'arraybuffer'
    | 'blob'
    | 'document'
    | 'text'
    | 'stream';
}

const defaultOptions = {
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
  },
};

@Injectable()
export class FetchService {
  async send<T>({
    url,
    headers,
    method,
    body,
    timeout = 120000,
    responseType,
  }: FetchParams): Promise<AxiosResponse<T>> {
    const axiosConfig = {
      url,
      method,
      headers: {
        ...defaultOptions.headers,
        ...headers,
      },
      timeout,
      responseType,
    };

    if (body) {
      axiosConfig['data'] = body;
    }

    const response: AxiosResponse = await axios.request(axiosConfig);

    return response;
  }

  isFetchError<T = any, D = any>(error: any): error is AxiosError<T, D> {
    return axios.isAxiosError(error);
  }
}
