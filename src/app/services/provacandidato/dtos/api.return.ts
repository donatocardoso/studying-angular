export interface IApiReturn<T = null> {
  readonly IsSuccess: boolean;
  readonly Message: string;
  readonly Content?: T;
}

abstract class ApiReturnAbstract {
  abstract Success(message: string): IApiReturn;
  abstract Success<T>(message: string, content: T): IApiReturn<T>;

  abstract Fail(message: string): IApiReturn;
  abstract Fail<T>(message: string, content: T): IApiReturn<T>;

  abstract FromObject(data: any): IApiReturn;
  abstract FromObject<T>(data: any): IApiReturn<T>;
}

class ApiReturn implements ApiReturnAbstract {
  Success<T>(message: string, content?: T): IApiReturn<T> {
    return {
      IsSuccess: true,
      Message: message,
      Content: content,
    };
  }

  Fail<T>(message: string, content?: T): IApiReturn<T> {
    return {
      IsSuccess: false,
      Message: message,
      Content: content,
    };
  }

  FromObject<T>(data: any): IApiReturn<T> {
    return data as IApiReturn<T>;
  }
}

export default new ApiReturn();
