import { NextResponse } from "next/server";

import getTodayTasks from "@/utils/getTodayTasks";
import getUserLists from "@/utils/getUserLists";
import getPlannedTasks from "@/utils/getPlannedTasks";

export async function GET(request: Request) {
  const requestHeaders = request.headers.getSetCookie();
  const accessToken = requestHeaders[0].split("=")[1].split(";")[0];
  const refreshToken = requestHeaders[1].split("=")[1].split(";")[0];

  const [plannedTasks, userLists] = await Promise.all([
    getPlannedTasks({
      accessToken,
      refreshToken
    }),
    getUserLists({
      accessToken,
      refreshToken
    }),
  ]);

  return NextResponse.json(
    {
      tasks: plannedTasks,
      lists: userLists,
      refreshToken,
      accessToken,
    },
    {
      status: 200,
    }
  );
}
