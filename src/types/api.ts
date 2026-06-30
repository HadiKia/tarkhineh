export type ID = string;
export type ISODateString = string;


export type ApiError = {
  response?: {
    status: number;
    data?: {
      message?: string;
      statusCode?: number;
    };
  };
};
