export interface User {
    id : string;
    username : string;
}

export interface Token {
    token : string;
}

export interface Code {
    code : string;
}

export interface UserState {
    user?: User;
    token?: string;
    isDark: boolean;
    error?: string;
    redirectURL ?: string;
  }

export interface ResponseUser{
    ID: string,
    email: string,
    token: string,
}