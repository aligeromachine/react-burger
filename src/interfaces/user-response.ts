import { IResponseInit } from "./base";

export interface IUser {
  email: string;
  name: string;
}

export interface IResponseUserLogin {
  success: boolean;
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface IResponseUserCheck {
  success: boolean;
  user: IUser;
}

export interface IUserResetPassword {
  password: string;
  token: string;
}

export interface IResponseRefreshToken {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface IResponseUserRegister extends IResponseUserLogin {}

export interface ITokenErrors extends IResponseInit {}

export interface IResponseUserLogout extends IResponseInit {}
