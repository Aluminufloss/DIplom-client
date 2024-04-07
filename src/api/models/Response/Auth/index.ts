import { IUser } from "../Auth/IUser";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface UploadImageRespone {
  imagePath: string;
}