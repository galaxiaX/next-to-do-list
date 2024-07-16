import axios, { AxiosResponse } from 'axios';
// import { createURLSearchParams } from './create-url-search-params';

type ErrorResponseType = {
  response?: {
    status?: number;
    data?: any;
  };
};

const getHeaders = () => {
  return {
    'Content-Type': 'application/json'
    // Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  };
};

const handleResponse = <T>(response: AxiosResponse): T => {
  return response?.data;
};

const handleError = (error: ErrorResponseType): never => {
  throw error;
};

export const axiosReq = {
  get: async <T = any>(url: string): Promise<T> => {
    try {
      // const response = await axios.get(url, { headers: getHeaders() });
      const response = await axios.get(url);
      return handleResponse(response);
    } catch (error) {
      return handleError(error as ErrorResponseType);
    }
  },
  post: async <T = any>(url: string, data?: any): Promise<T> => {
    try {
      // const response = await axios.post(url, data, { headers: getHeaders() });
      const response = await axios.post(url, data);
      return handleResponse(response);
    } catch (error) {
      return handleError(error as ErrorResponseType);
    }
  },
  put: async <T = any>(url: string, data?: any): Promise<T> => {
    try {
      // const response = await axios.put(url, data, { headers: getHeaders() });
      const response = await axios.put(url, data);
      return handleResponse(response);
    } catch (error) {
      return handleError(error as ErrorResponseType);
    }
  },
  delete: async <T = any>(url: string): Promise<T> => {
    try {
      // const response = await axios.delete(url, { headers: getHeaders() });
      const response = await axios.delete(url);
      return handleResponse(response);
    } catch (error) {
      return handleError(error as ErrorResponseType);
    }
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  root: '/',
  todo: {
    root: '/todos',
    action: (id: string) => `/todos/${id}`
  }
};
