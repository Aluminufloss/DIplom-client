"use client";

import React from "react";
import styled from "styled-components";

import { WeekAnalyticsType } from "@/models";

import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { setGroups } from "@/store/slices/Groups";
import { setLists } from "@/store/slices/Lists";

import EmptySection from "../Analytics/EmptySection";
import GraphSection from "../Analytics/GraphSection";
import AnalyticsSectionBar from "../Analytics/AnalyticsSectionBar";

const WeekAnalyticsSection: React.FC = () => {
  const [data, setData] = React.useState<WeekAnalyticsType>();

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    (async () => {
      const allTasksAnalyticsPageResponse = await fetch(
        "http://localhost:3000/tasks/analytics/week/api"
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
          <GraphSection tasksInfo={data.tasks.thisWeek} type="linear"/>
        ) : (
          <EmptySection />
        )}
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
