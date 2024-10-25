"use client";

import styled from "styled-components";

import { WeekAnalyticsType } from "@/models";

import ProgressBlock from "./ProgressBlock";
import PriorityStatistics from "./PriorityStatistics";
import CategoriesStatistics from "./CategoriesStatistics";
import TasksStatistics from "./TasksStatistics";
import ComparisonStatistics from "./ComparisonStatisticsWithLastWeek";

type PropsType = {
  data?: WeekAnalyticsType;
};

const WeekStatisticsSection: React.FC<PropsType> = (props) => {
  return (
    <StyledStatisticsSection>
      <ProgressBlock
        completedTasksLength={props.data?.tasks.thisWeek.completed}
        tasksLength={props.data?.tasks.thisWeek.tasksLength}
      />
      <PriorityStatistics
        priorityData={props.data?.priority.thisWeek}
        tasksLength={props.data?.tasks.thisWeek.tasksLength}
      />
      <TasksStatistics tasksAnalytics={props.data?.tasks.thisWeek} />
      <CategoriesStatistics
        categoriesAnalytics={props.data?.categories.thisWeek}
        tasksLength={props.data?.tasks.thisWeek.tasksLength}
      />
      <ComparisonStatistics data={props.data} />
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

export default WeekStatisticsSection;
