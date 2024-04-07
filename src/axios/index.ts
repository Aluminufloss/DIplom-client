import axios from 'axios';

import { AuthResponse } from '@/api/models/Response/Auth';
import { API_URL } from '@/utils/constant';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  try {
    const token = config.data.accessToken;

    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }

    return config;
  } catch (err) {
    console.log(err, "Ошибка при формировании заголовка запроса");
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
      const { refreshToken } = JSON.parse(originalRequest.data);

      const response = await axios.post<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true, refreshToken });
      const token = response.data.accessToken;

      originalRequest.headers.Authorization = `Bearer ${token}`;
      originalRequest.headers.token = response.data.refreshToken;

      return $api.request(originalRequest);
    } catch (err) {
      console.log("Ошибка перехватчика на 401 статус-код");
    }
  }
  throw error;
});

export default $api;