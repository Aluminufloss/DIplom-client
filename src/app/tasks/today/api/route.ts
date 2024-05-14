import getAllTasks from "@/utils/getAllTasks";
import getTodayTasks from "@/utils/getTodayTasks";
import getUserLists from "@/utils/getUserLists";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestHeaders = request.headers.getSetCookie();
  const accessToken = requestHeaders[0].split("=")[1].split(";")[0];
  const refreshToken = requestHeaders[1].split("=")[1].split(";")[0];

  const [todayTasks, userLists] = await Promise.all([
    getTodayTasks({
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
      tasks: todayTasks,
      lists: userLists,
      refreshToken,
      accessToken,
    },
    {
      status: 200,
    }
  );
}
