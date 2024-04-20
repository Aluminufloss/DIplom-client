import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { serverSideFetch } from "@/utils/serverSideFetch";
import { ApiPaths, AppPaths } from '@/utils/constant';

export async function GET() {
  const accessToken = cookies().get('accessToken')?.value;
  const refreshToken = cookies().get('refreshToken')?.value;

  const data = await serverSideFetch({
    url: ApiPaths.getMe,
    method: "POST",
    accessToken,
    refreshToken
  });

  if (!data) {
    return NextResponse.redirect(AppPaths.login);
  }

  return Response.json(data);
}