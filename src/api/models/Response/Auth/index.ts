import { IUser } from "../Auth/IUser";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export type UserRegistrationType = {
  email: string;
  password: string;
  username?: string;
}

export type UserLoginType = {
  email: string;
  password: string;
  shouldRememberMe?: boolean;
}