import React from "react";
import styled from "styled-components";

import { TasksAnalyticsType, } from "@/models";
import { getComparisonString } from "./utils/getComparisonString";

type PropsType = {
  thisWeekTasks?: TasksAnalyticsType;
  lastWeekTasks?: TasksAnalyticsType;
};

const WeekTasksAnalytics: React.FC<PropsType> = (props) => {
  return (
    <StyledStatistics>
      <h4 className="statistics__priority-title">По задачам</h4>
      <div className="statistics__priority-section">
        <span className="statistics__priority-section-item">Всего</span>
        <span className="statistics__priority-section-item--value">
          {getComparisonString(
            props.thisWeekTasks?.tasksLength ?? 0,
            props.lastWeekTasks?.tasksLength ?? 0
          )}
        </span>
      </div>
      <div className="statistics__priority-section">
        <span className="statistics__priority-section-item">Выполненные</span>
        <span className="statistics__priority-section-item--value">
          {getComparisonString(
            props.thisWeekTasks?.completed ?? 0,
            props.lastWeekTasks?.completed ?? 0
          )}
        </span>
      </div>
      <div className="statistics__priority-section">
        <span className="statistics__priority-section-item">Просроченные</span>
        <span className="statistics__priority-section-item--value">
        {getComparisonString(
            props.thisWeekTasks?.expired ?? 0,
            props.lastWeekTasks?.expired ?? 0
          )}
        </span>
      </div>
    </StyledStatistics>
  );
};

const StyledStatistics = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;

  width: 100%;

  & div:not(:last-child) {
    margin-bottom: 16px;
  }

  .statistics__priority {
    &-title {
      margin: 16px 0;

      text-align: center;

      ${(props) => props.theme.typography.fnTitle2}
      ${(props) => props.theme.typography.fnSemiBold};
      color: ${(props) => props.theme.colorValues.black};
    }

    &-section {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-item {
        ${(props) => props.theme.typography.fnTitle1}
        ${(props) => props.theme.typography.fnMedium};
        color: ${(props) => props.theme.colorValues.black};
      }
    }
  }
`;

export default WeekTasksAnalytics;
