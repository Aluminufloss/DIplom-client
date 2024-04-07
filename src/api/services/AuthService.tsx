import $api from "@/axios";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/Response/Auth";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/login", { email, password });
  }

  static async registration(
    email: string,
    password: string,
    username: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/registration", { email, password, username });
  }

  static async sendChangePasswordLink(email: string) {
    return $api.post("/change", { email });
  }

  static async changePassword(password: string, email: string) {
    return $api.post("/changePassword", { password, email });
  }

  static async logout(): Promise<void> {
    return $api.post("/logout");
  }
}
