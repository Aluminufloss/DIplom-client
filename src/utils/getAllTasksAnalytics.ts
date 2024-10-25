import { AnalyticsServerResponseType, AnalyticsType } from "@/models";

import { serverSideFetch } from "./serverSideFetch";

const getAllTasksAnalytics = async (options: {
  accessToken?: string;
  refreshToken?: string;
}): Promise<AnalyticsServerResponseType | undefined> => {
  "use server";

  const analyticsResponse = await serverSideFetch<AnalyticsServerResponseType>({
    url: "http://localhost:5000/analytics",
    method: "GET",
    body: options,
  });

  const analyticsData = await analyticsResponse?.json();

  return analyticsData;
};

export default getAllTasksAnalytics;
