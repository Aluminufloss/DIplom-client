import { NextResponse } from "next/server";

import getUserListsAndGroups from "@/utils/getUserLists";
import getWeekAnalytics from "@/utils/getWeekAnalytics";

export async function GET(request: Request) {
  const requestHeaders = request.headers.getSetCookie();
  const accessToken = requestHeaders[0].split("=")[1].split(";")[0];
  const refreshToken = requestHeaders[1].split("=")[1].split(";")[0];

  const [allTasksAnalytics, userListsAndGroups] = await Promise.all([
    getWeekAnalytics({
      accessToken,
      refreshToken,
    }),
    getUserListsAndGroups({
      accessToken,
      refreshToken,
    }),
  ]);

  return NextResponse.json(
    {
      data: allTasksAnalytics?.data,
      lists: userListsAndGroups?.data.lists,
      groups: userListsAndGroups?.data.groups,
      refreshToken,
      accessToken,
    },
    {
      status: 200,
    }
  );
}
