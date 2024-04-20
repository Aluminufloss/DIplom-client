import { API_URL } from "@/utils/constant";
import { cookies } from "next/headers";

type ParamsType = {
  url: string;
  method: string;
  accessToken?: string;
  refreshToken?: string;
};

type ResponseDataType = {
  data: any;
  accessToken?: string;
};

export const fetchWrapper = async (options: ParamsType): Promise<ResponseDataType | void> => {
  try {
    const response = await fetch(options.url, {
      headers: {
        Authorization: options.accessToken ? `Bearer ${options.accessToken}` : '',
        Accept: "application/json",
      },
      method: options.method,
      credentials: "include",
    });

    const data = await response.json();

    if (response.status === 401) {
      if (!options.refreshToken) {
        return;
      }

      const refreshResponse = await fetch(`${API_URL}/refresh`, {
        headers: {
          cookie: `refreshToken=${options.refreshToken}`,
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

        const responseData = await originalRequestResponse.json();

        return responseData;
      }
    }

    return { data, accessToken: options.accessToken };
  } catch (err) {
    console.log(err);
  }
};