"use client";

import React from "react";
import styled from "styled-components";

import { MonthAnalyticsType } from "@/models";

import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { setGroups } from "@/store/slices/Groups";
import { setLists } from "@/store/slices/Lists";

import EmptySection from "../Analytics/EmptySection";
import GraphSection from "../Analytics/GraphSection";
import AnalyticsSectionBar from "../Analytics/AnalyticsSectionBar";
import WeekStatisticsSection from "../Analytics/StatisticsSection/WeekStatisticsSection";

const WeekAnalyticsSection: React.FC = () => {
  const [data, setData] = React.useState<MonthAnalyticsType>();

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    (async () => {
      const allTasksAnalyticsPageResponse = await fetch(
        "http://localhost:3000/tasks/analytics/month/api"
      );

      const allTasksAnalyticsPageData =
        await allTasksAnalyticsPageResponse.json();

      setData(allTasksAnalyticsPageData.data);
      dispatch(setGroups(allTasksAnalyticsPageData?.groups));
      dispatch(setLists(allTasksAnalyticsPageData?.lists));

      if (allTasksAnalyticsPageData?.accessToken) {
        localStorage.setItem(
          "accessToken",
          allTasksAnalyticsPageData.accessToken
        );
      }
    })();
  }, []);

  return (
    <StyledAnalyticsSection>
      <AnalyticsSectionBar />
      <div className="content--analytics">
        {!!data?.tasks.thisWeek.tasksLength ? (
          <GraphSection tasksInfo={data.tasks.thisMonth} type="pie"/>
        ) : (
          <EmptySection />
        )}
        <WeekStatisticsSection data={data} />
      </div>
    </StyledAnalyticsSection>
  );
};

const StyledAnalyticsSection = styled.section`
  width: 100%;

  display: flex;
  flex-direction: column;

  .content--analytics {
    display: flex;
    justify-content: space-between;
    gap: 24px;
  }
`;

export default WeekAnalyticsSection;
