"use client";

import styled from "styled-components";

import { AnalyticsType } from "@/models";

import ProgressBlock from "./ProgressBlock";
import PriorityStatistics from "./PriorityStatistics";
import CategoriesStatistics from "./CategoriesStatistics";
import TasksStatistics from "./TasksStatistics";

type PropsType = {
  data?: AnalyticsType;
};

const StatisticsSection: React.FC<PropsType> = (props) => {
  return (
    <StyledStatisticsSection>
      <ProgressBlock
        completedTasksLength={props.data?.tasksAnalytics.completed}
        tasksLength={props.data?.tasksAnalytics.tasksLength}
      />
      <PriorityStatistics
        priorityData={props.data?.priorityAnalytics}
        tasksLength={props.data?.tasksAnalytics.tasksLength}
      />
      <TasksStatistics tasksAnalytics={props.data?.tasksAnalytics} />
      <CategoriesStatistics
        categoriesAnalytics={props.data?.categoriesAnalytics}
        tasksLength={props.data?.tasksAnalytics.tasksLength}
      />
    </StyledStatisticsSection>
  );
};

const StyledStatisticsSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  max-height: 500px;

  overflow-y: hidden;

  background-color: ${(props) => props.theme.colorValues.sidebarWhite};
  border-radius: 5px;

  padding: 24px;

  & {
    -ms-overflow-style: none;
    overflow-x: hidden;
    scrollbar-width: none;
    overflow-y: scroll;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default StatisticsSection;
