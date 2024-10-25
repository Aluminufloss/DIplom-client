"use server-only";

import { API_URL } from "@/utils/constant";
import { cookies } from "next/headers";

type ParamsType = {
  url: string;
  method: string;
  credentials?: RequestCredentials;
  headers?: HeadersInit;
  body?: {
    accessToken?: string;
    refreshToken?: string;
  };
};

type ResponseError = {
  error: string;
} & {
  status: number;
};

export async function serverSideFetch<T>(
  options: ParamsType
): Promise<(Response & T) | (Response & ResponseError) | undefined> {
  "use server";
  try {
    const accessToken =
      cookies().get("accessToken")?.value ?? options.body?.accessToken;
    const refreshToken =
      cookies().get("refreshToken")?.value ?? options.body?.refreshToken;

    const response = await fetch(options.url, {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
        Accept: "application/json",
      },
      method: options.method,
      credentials: "include",
    });

    if (response.status === 401) {
      if (!refreshToken) {
        return Response.json(
          { error: "Unauthorized" },
          { status: 401 }
        ) as Response & ResponseError;
      }

      const refreshResponse = await fetch(`${API_URL}/refresh`, {
        headers: {
          cookie: `refreshToken=${refreshToken}`,
          Accept: "application/json",
        },
        method: "POST",
        credentials: "include",
      });

      if (refreshResponse.ok) {
        const { accessToken, refreshToken } = await refreshResponse.json();

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

        return Response.json({ data, accessToken, refreshToken }) as Response &
          T;
      } else {
        return Response.json(
          { error: "Unauthorized" },
          { status: 401 }
        ) as Response & ResponseError;
      }
    }

    const data = await response.json();

    return Response.json({ data, accessToken, refreshToken }) as Response & T;
  } catch (err) {
    console.warn(err);
  }
}
