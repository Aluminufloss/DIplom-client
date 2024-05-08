import { PageDataType } from "@/models";

import getAllTasks from "./getAllTasks";
import getUserLists from "./getUserLists";

const getAllTasksPageData = async (): Promise<PageDataType | undefined> => {
  "use server";

  const [todayTasks, userLists] = await Promise.all([
    getAllTasks(),
    getUserLists(),
  ]);

  return {
    tasks: todayTasks?.data,
    lists: userLists?.data,
    accessToken: todayTasks?.accessToken,
  };
};

export default getAllTasksPageData;
