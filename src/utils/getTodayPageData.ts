import "server-only";

import { PageDataType } from "@/models";

import getTodayTasks from "./getTodayTasks";
import getUserLists from "./getUserLists";

const getTodayPageData = async (): Promise<PageDataType | undefined> => {
  "use server"

  const [todayTasks, userLists] = await Promise.all(
    [
      getTodayTasks(),
      getUserLists(),
    ]
  )
  
  return {
    tasks: todayTasks?.data,
    lists: userLists?.data,
    accessToken: todayTasks?.accessToken
  }
}

export default getTodayPageData;