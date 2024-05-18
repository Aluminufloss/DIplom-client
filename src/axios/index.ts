import axios from 'axios';

import { AuthResponse } from '@/api/models/Response/Auth';
import { API_URL } from '@/utils/constant';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

let redirectCallback: () => void;

export const setRedirectCallback = (cb: () => void) => {
  redirectCallback = cb;
};

$api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }

    return config;
  } catch (err) {
    console.warn(err, "Ошибка при формировании заголовка запроса");
  }

  return config;
});


$api.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/refresh`, {}, {
        withCredentials: true,
      });
      const token = response.data.accessToken;

      localStorage.setItem("accessToken", token);

      originalRequest.headers.Authorization = `Bearer ${token}`;
      originalRequest.headers.token = response.data.refreshToken;

      return $api.request(originalRequest);
    } catch (err) {
      console.warn("Ошибка перехватчика на 401 статус-код");

      if (redirectCallback) {
        redirectCallback();
      }
    }
  }
  throw error;
});

export default $api;