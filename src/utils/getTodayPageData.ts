import { PageDataType } from "@/models";

import getTodayTasks from "./getTodayTasks";
import getUserLists from "./getUserLists";
import { getUserGroups } from "./getUserGroups";

const getTodayPageData = async (): Promise<PageDataType | undefined> => {
  "use server"

  const [todayTasks, userLists] = await Promise.all(
    [
      getTodayTasks(),
      getUserLists(),
    ]
  );

  const { groups, lists } = await getUserGroups(userLists?.data);

    return {
      tasks: todayTasks?.data,
      accessToken: todayTasks?.accessToken,
      lists,
      groups,
    }
}

export default getTodayPageData;