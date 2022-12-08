import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default <T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return axios
    .create({
      baseURL: `${process.env.REACT_APP_Backend_URL}`,
      responseType: 'json',
    })
    .request<T>(config);
};