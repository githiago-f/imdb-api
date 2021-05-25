declare module '@app/errors' {
  type InvalidError = {
    message: string;
    cause: string;
    fields?: Record<string, string>;
  }

  type ResponseError = {
    message: string;
    input?: Record<string, unknown>;
  }
}
