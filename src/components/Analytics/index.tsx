"use client";

import React from "react";
import styled from "styled-components";

import { AnalyticsType } from "@/models";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { setLists } from "@/store/slices/Lists";

import GraphSection from "./GraphSection";
import AnalyticsSectionBar from "./AnalyticsSectionBar";
import StatisticsSection from "./StatisticsSection";
import { setGroups } from "@/store/slices/Groups";
import EmptySection from "./EmptySection";

const AnalyticsSection: React.FC = () => {
  const [data, setData] = React.useState<AnalyticsType>();

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    (async () => {
      const allTasksAnalyticsPageResponse = await fetch(
        "http://localhost:3000/tasks/analytics/all/api"
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
        {!!data?.tasksAnalytics.tasksLength ? (
          <GraphSection tasksInfo={data.tasksAnalytics} type={"pie"} />
        ) : (
          <EmptySection />
        )}
        <StatisticsSection data={data} />
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

export default AnalyticsSection;
