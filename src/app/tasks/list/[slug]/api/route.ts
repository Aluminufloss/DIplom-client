import { NextResponse } from "next/server";

import getUserListsAndGroups from "@/utils/getUserLists";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const requestHeaders = request.headers.getSetCookie();
  const accessToken = requestHeaders[0].split("=")[1].split(";")[0];
  const refreshToken = requestHeaders[1].split("=")[1].split(";")[0];

  const userListsAndGroups = await getUserListsAndGroups({
    accessToken,
    refreshToken,
  });

  const currentList = userListsAndGroups?.data.lists.find((list) => {
    return list.listId === params.slug;
  });

  if (!currentList) {
    return NextResponse.json(
      {
        error: "List not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
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
