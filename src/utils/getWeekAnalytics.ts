import { AnalyticsByWeekResponseType, AnalyticsServerResponseType } from "@/models";

import { serverSideFetch } from "./serverSideFetch";

const getWeekAnalytics = async (options: {
  accessToken?: string;
  refreshToken?: string;
}): Promise<AnalyticsServerResponseType | undefined> => {
  "use server";

  const analyticsResponse = await serverSideFetch<AnalyticsByWeekResponseType>({
    url: "http://localhost:5000/getAnalyticsByWeek/analytics",
    method: "POST",
    body: options,
  });

  const analyticsData = await analyticsResponse?.json() as AnalyticsServerResponseType;

  return analyticsData;
};

export default getWeekAnalytics;
