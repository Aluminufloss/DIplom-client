import $api from "@/axios";
import { AxiosError, AxiosResponse } from "axios";
import { AuthResponse } from "../models/Response/Auth";

export default class AuthService {
  static async login(
    email: string,
    password: string,
    shouldRememberMe?: boolean
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/login", {
      email,
      password,
      shouldRememberMe,
    });
  }

  static async registration(email: string, password: string, username: string) {
    try {
      const response = await $api.post<AuthResponse>("/registration", {
        email,
        password,
        username,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
    } catch (err) {
      throw err as AxiosError;
    }
  }

  static async sendChangePasswordLink(email: string) {
    return $api.post("/change", { email });
  }

  static async changePassword(password: string, urlString: string) {
    return $api.post("/changePassword", { password, urlString });
  }

  static async logout(): Promise<void> {
    return $api.post("/logout");
  }
}
