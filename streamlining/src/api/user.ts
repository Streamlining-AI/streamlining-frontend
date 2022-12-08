import api from "../utils/api";
import { IUserAPI } from "./types";

const UserApi: IUserAPI = {
  current: (accessToken) =>
    api({
      method: "get",
      url: "/users",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  register: (username, password) =>
    api({
      method: "post",
      url: "/users/register",
      data: {
        "email" : username,
        password,
      },
    }),
  login: (username, password) =>
    api({
      method: "post",
      url: "/users/login",
      data: {
        "email" : username,
        password,
      },
      withCredentials:true
    }),
  loginGithub: () =>
    api({
      method: "get",
      url: "/users/login/github",
    }),
  callbackGithub: (code) =>
    api({
      method: "post",
      url: "/users/login/github/callback",
      data: { "Code" : code },
      withCredentials:true
    }),
  logout: () =>
    api({
      method: "get",
      url: "/users/logout",
      withCredentials:true,
    }),
  refresh: (refreshToken) =>
    api({
      method: "post",
      url: "/auth/refresh-tokens",
      data: {
        refreshToken,
      },
    }),
  update: (accessToken, username, password) =>
    api({
      method: "patch",
      url: "/users",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        username,
        password,
      },
    }),
};

export default UserApi;
