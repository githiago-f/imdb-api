declare module '@app/gurds' {
  type IE = import('@app/errors').InvalidError;
  interface IGuard  {
    validate(request: import('express').Request): IE | null;
  }
}
