import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { UserResponseType } from "./models";
import { serverSideFetch } from "./utils/serverSideFetch";
import { CLIENT_URL } from "./utils/constant";

export async function middleware() {
  const accessToken = cookies().get("accessToken")?.value;
  const refreshToken = cookies().get("refreshToken")?.value;

  const userResponse = await serverSideFetch<UserResponseType>({
    url: "http://localhost:5000/me",
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
    },
  });

  if (userResponse?.status === 401) {
    return NextResponse.redirect(`${CLIENT_URL}/login`);
  }

  const response = NextResponse.next();

  const userData = await userResponse?.json();

  response.cookies.set("accessToken", userData.accessToken);
  response.cookies.set("refreshToken", userData.refreshToken);
  response.cookies.set("user", JSON.stringify(userData.data));

  return response;
}

export const config = {
  matcher: "/tasks/:path*",
};
