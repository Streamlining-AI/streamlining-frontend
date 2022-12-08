import { AxiosResponse } from "axios";
import { Token } from "../state/types";
export interface IUserAPI {
  current: (accessToken: string) => Promise<
    AxiosResponse<{
      id: string;
      username: string;
    }>
  >;
  register: (
    username: string,
    password: string
  ) => Promise<
    AxiosResponse<{
      InsertedID: string;
    }>
  >;
  login: (
    username: string,
    password: string
  ) => Promise<
    AxiosResponse<{
      ID: string;
      email: string;
      token: string;
    }>
  >;
  loginGithub: () => Promise<AxiosResponse>;
  callbackGithub: (
    Code: string
  ) => Promise<AxiosResponse<{ ID: string; username: string; token: string }>>;
  logout: () => Promise<AxiosResponse>;
  refresh: (
    refreshToken: string
  ) => Promise<AxiosResponse<{ access: Token; refresh: Token }>>;
  update: (
    accessToken: string,
    username?: string,
    password?: string
  ) => Promise<AxiosResponse<{ id: string; username: string }>>;
}
