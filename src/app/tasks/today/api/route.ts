import { NextResponse } from "next/server";

import getTodayTasks from "@/utils/getTodayTasks";
import getUserListsAndGroups from "@/utils/getUserLists";

export async function GET(request: Request) {
  const requestHeaders = request.headers.getSetCookie();
  const accessToken = requestHeaders[0].split("=")[1].split(";")[0];
  const refreshToken = requestHeaders[1].split("=")[1].split(";")[0];

  const [todayTasks, userListsAndGroups] = await Promise.all([
    getTodayTasks({
      accessToken,
      refreshToken
    }),
    getUserListsAndGroups({
      accessToken,
      refreshToken
    }),
  ]);

  return NextResponse.json(
    {
      tasks: todayTasks,
      groups: userListsAndGroups?.data.groups,
      lists: userListsAndGroups?.data.lists,
      refreshToken,
      accessToken,
    },
    {
      status: 200,
    }
  );
}
