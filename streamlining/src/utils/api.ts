import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Config } from "../config";

// eslint-disable-next-line import/no-anonymous-default-export
export default <T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return axios
    .create({
      baseURL: `${Config.REACT_APP_Backend_URL}`,
      responseType: 'json',
    })
    .request<T>(config);
};