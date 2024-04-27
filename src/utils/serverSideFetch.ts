"use server"

import { API_URL } from "@/utils/constant";
import { cookies } from "next/headers";

type ParamsType = {
  url: string;
  method: string;
  body?: any;
};

export const serverSideFetch = async <T>(options: ParamsType): Promise<undefined | T> => {
  "use server"
  try {
    const accessToken = cookies().get('accessToken')?.value;
    const refreshToken = cookies().get('refreshToken')?.value;

    const response = await fetch(options.url, {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
        Accept: "application/json",
      },
      method: options.method,
      credentials: "include",
    });

    if (response.status === 401) {
      if (!refreshToken) {
        return;
      }

      const refreshResponse = await fetch(`${API_URL}/refresh`, {
        headers: {
          cookie: `refreshToken=${refreshToken}`,
          Accept: "application/json",
        },
        method: options.method,
        credentials: "include",
      });

      if (refreshResponse.ok) {
        const { accessToken, refreshToken } = await refreshResponse.json();

        cookies().set("accessToken", accessToken);
        cookies().set("refreshToken", refreshToken);

        const requestHeaders = {
          ...response.headers,
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        };

        const originalRequestResponse = await fetch(options.url, {
          headers: requestHeaders,
          credentials: "include",
          method: options.method,
        });

        const data = await originalRequestResponse.json();

        return { data, accessToken } as T;
      }
    }

    const data = await response.json();

    return { data, accessToken } as T;
  } catch (err) {
    console.warn(err);
  }
};