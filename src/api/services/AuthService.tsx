import $api from "@/axios";
import { AxiosError, AxiosResponse } from "axios";
import { AuthResponse, UserLoginType, UserRegistrationType } from "../models/Response/Auth";

export default class AuthService {
  static async login(options: UserLoginType): Promise<AxiosResponse<AuthResponse>> {
    const { email, password, shouldRememberMe } = options;
    
    return $api.post<AuthResponse>("/login", {
      email,
      password,
      shouldRememberMe,
    });
  }

  static async registration(options: UserRegistrationType) {
    try {
      const { email, password, username } = options;
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
