import { NextResponse } from "next/server";

import getAllTasks from "@/utils/getAllTasks";;
import getUserListsAndGroups from "@/utils/getUserLists";

export async function GET(request: Request) {
  const requestHeaders = request.headers.getSetCookie();
  const accessToken = requestHeaders[0].split("=")[1].split(";")[0];
  const refreshToken = requestHeaders[1].split("=")[1].split(";")[0];

  const [allTasks, userListsAndGroups] = await Promise.all([
    getAllTasks({
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
      tasks: allTasks,
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
