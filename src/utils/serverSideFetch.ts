"use server"
import { API_URL } from "@/utils/constant";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type ParamsType = {
  url: string;
  method: string;
};

type ResponseDataType = {
  data: any;
  accessToken?: string;
};

export const serverSideFetch = async (options: ParamsType): Promise<ResponseDataType | undefined> => {
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

        return { data, accessToken };
      }
    }

    const data = await response.json();

    return { data, accessToken };
  } catch (err) {
    console.warn(err);
  }
};