import { PageDataType } from "@/models";

import getUserLists from "./getUserLists";
import getPlannedTasks from "./getPlannedTasks";

const getPlannedPageData = async (): Promise<PageDataType | undefined> => {
  "use server"

  const [todayTasks, userLists] = await Promise.all(
    [
      getPlannedTasks(),
      getUserLists(),
    ]
  )
  
  return {
    tasks: todayTasks?.data,
    lists: userLists?.data,
    accessToken: todayTasks?.accessToken
  }
}

export default getPlannedPageData;