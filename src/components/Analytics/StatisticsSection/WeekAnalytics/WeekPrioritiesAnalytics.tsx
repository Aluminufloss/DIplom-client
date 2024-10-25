import styled from "styled-components";

import { priorityAnalyticsType } from "@/models";
import React from "react";
import { getComparisonString } from "./utils/getComparisonString";

type PropsType = {
  thisWeekPriorities?: priorityAnalyticsType;
  lastWeekPriorities?: priorityAnalyticsType;
};

const WeekPrioritiesAnalytics: React.FC<PropsType> = (props) => {
  return (
    <StyledStatistics>
      <h4 className="statistics__priority-title">По приоритетам</h4>
      <div className="statistics__priority-section">
        <span className="statistics__priority-section-item">Низкий</span>
        <span className="statistics__priority-section-item--value">
          {getComparisonString(
            props.thisWeekPriorities?.low ?? 0,
            props.lastWeekPriorities?.low ?? 0
          )}
        </span>
      </div>
      <div className="statistics__priority-section">
        <span className="statistics__priority-section-item">Средний</span>
        <span className="statistics__priority-section-item--value">
          {getComparisonString(
            props.thisWeekPriorities?.medium ?? 0,
            props.lastWeekPriorities?.medium ?? 0
          )}
        </span>
      </div>
      <div className="statistics__priority-section">
        <span className="statistics__priority-section-item">Высокий</span>
        <span className="statistics__priority-section-item--value">
          {getComparisonString(
            props.thisWeekPriorities?.high ?? 0,
            props.lastWeekPriorities?.high ?? 0
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

export default WeekPrioritiesAnalytics;
