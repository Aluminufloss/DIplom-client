import { NextResponse } from "next/server";

import getAllTasksAnalytics from "@/utils/getAllTasksAnalytics";
import getUserLists from "@/utils/getUserLists";

export async function GET(request: Request) {
  const requestHeaders = request.headers.getSetCookie();
  const accessToken = requestHeaders[0].split("=")[1].split(";")[0];
  const refreshToken = requestHeaders[1].split("=")[1].split(";")[0];

  const [allTasksAnalytics, userLists] = await Promise.all([
    getAllTasksAnalytics({
      accessToken,
      refreshToken,
    }),
    getUserLists({
      accessToken,
      refreshToken,
    }),
  ]);

  return NextResponse.json(
    {
      data: allTasksAnalytics?.data,
      lists: userLists,
      refreshToken,
      accessToken,
    },
    {
      status: 200,
    }
  );
}
