export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseFailure;

export type ApiResponseSuccess<T> = {
  success: true;
  data: T;
};

export type ApiResponseFailure = {
  success: false;
  errorCode: string;
};
