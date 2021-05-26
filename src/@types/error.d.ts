declare module '@app/errors' {
  interface InvalidError {
    message: string;
    cause: string;
    statusCode: number;
    fields?: Record<string, string>;
  }

  type ResponseError = {
    message: string;
    input?: Record<string, unknown>;
  }
}
