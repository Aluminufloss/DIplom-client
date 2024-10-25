import { AnalyticsByWeekResponseType } from "@/models";

import { serverSideFetch } from "./serverSideFetch";

const getWeekAnalytics = async (options: {
  accessToken?: string;
  refreshToken?: string;
}): Promise<AnalyticsByWeekResponseType | undefined> => {
  "use server";

  const analyticsResponse = await serverSideFetch<AnalyticsByWeekResponseType>({
    url: "http://localhost:5000/analytics/week",
    method: "GET",
    body: options,
  });

  const analyticsData = await analyticsResponse?.json() as AnalyticsByWeekResponseType;

  return analyticsData;
};

export default getWeekAnalytics;
