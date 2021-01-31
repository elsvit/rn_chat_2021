export enum ErrorCodeType {
  UNKNOWN = 'UNKNOWN',
}

export interface IError extends IErrorResponse {
  code?: ErrorCodeType;
}

export interface IErrorResponse {
  message: string;
  errors?: IFieldError;
}

export type IFieldError = Record<string, string[]>;

export interface IErrors {
  [key: string]: IError | null | undefined;
}
