export interface HttpResponse<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  statusCode: number;
  title?: string;
  message?: string;
  data?: T;
}
