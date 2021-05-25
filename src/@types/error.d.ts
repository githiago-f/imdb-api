declare module '@app/errors' {
  type InvalidError = {
    message: string;
    cause: string;
    field?: string;
  }
}
