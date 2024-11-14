import React from "react";

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};
type TMeta = {
  limit: number;
  page: number;
  toatal: number;
  totalpage: number;
};

export type TResponse = {
  data?: any;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TQueryParams = {
  name: string;
  value: boolean | React.Key;
};
