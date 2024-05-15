import { NextResponse } from "next/server";

import getPlannedTasks from "@/utils/getPlannedTasks";
import getUserListsAndGroups from "@/utils/getUserLists";

export async function GET(request: Request) {
  const requestHeaders = request.headers.getSetCookie();
  const accessToken = requestHeaders[0].split("=")[1].split(";")[0];
  const refreshToken = requestHeaders[1].split("=")[1].split(";")[0];

  const [plannedTasks, userListsAndGroups] = await Promise.all([
    getPlannedTasks({
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
      tasks: plannedTasks,
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
