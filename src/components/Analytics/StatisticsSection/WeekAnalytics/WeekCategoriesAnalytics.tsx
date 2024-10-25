import React from "react";
import styled from "styled-components";

import { categoriesAnalyticsType } from "@/models";
import {
  getTimeComparisonString,
} from "./utils/getComparisonString";

type PropsType = {
  thisWeekCategories?: categoriesAnalyticsType;
  lastWeekCategories?: categoriesAnalyticsType;
};

const WeekCategoriesAnalytics: React.FC<PropsType> = (props) => {
  return (
    <StyledStatistics>
      <h4 className="statistics__priority-title">Сравнительное время на категории</h4>
      <div className="statistics__priority-section">
        <span className="statistics__priority-section-item">Личное</span>
        <span className="statistics__priority-section-item--value">
          {getTimeComparisonString(
            props.thisWeekCategories?.Personal ?? {
              totalTime: {
                hours: 0,
                minutes: 0,
              },
              numberOfTasks: 0,
            },
            props.lastWeekCategories?.Personal ?? {
              totalTime: {
                hours: 0,
                minutes: 0,
              },
              numberOfTasks: 0,
            }
          )}
        </span>
      </div>
      <div className="statistics__priority-section">
        <span className="statistics__priority-section-item">Работа</span>
        <span className="statistics__priority-section-item--value">
          {getTimeComparisonString(
            props.thisWeekCategories?.Work ?? {
              totalTime: {
                hours: 0,
                minutes: 0,
              },
              numberOfTasks: 0,
            },
            props.lastWeekCategories?.Work ?? {
              totalTime: {
                hours: 0,
                minutes: 0,
              },
              numberOfTasks: 0,
            }
          )}
        </span>
      </div>
      <div className="statistics__priority-section">
      <span className="statistics__priority-section-item">Учеба</span>
        <span className="statistics__priority-section-item--value">
          {getTimeComparisonString(
            props.thisWeekCategories?.Study ?? {
              totalTime: {
                hours: 0,
                minutes: 0,
              },
              numberOfTasks: 0,
            },
            props.lastWeekCategories?.Study ?? {
              totalTime: {
                hours: 0,
                minutes: 0,
              },
              numberOfTasks: 0,
            }
          )}
        </span>
      </div>
      <div className="statistics__priority-section">
        <span className="statistics__priority-section-item">Дом</span>
        <span className="statistics__priority-section-item--value">
          {getTimeComparisonString(
            props.thisWeekCategories?.Home ?? {
              totalTime: {
                hours: 0,
                minutes: 0,
              },
              numberOfTasks: 0,
            },
            props.lastWeekCategories?.Home ?? {
              totalTime: {
                hours: 0,
                minutes: 0,
              },
              numberOfTasks: 0,
            }
          )}
        </span>
      </div>
      <div className="statistics__priority-section">
        <span className="statistics__priority-section-item">Путешествия</span>
        <span className="statistics__priority-section-item--value">
          {getTimeComparisonString(
            props.thisWeekCategories?.Travelling ?? {
              totalTime: {
                hours: 0,
                minutes: 0,
              },
              numberOfTasks: 0,
            },
            props.lastWeekCategories?.Travelling ?? {
              totalTime: {
                hours: 0,
                minutes: 0,
              },
              numberOfTasks: 0,
            }
          )}
        </span>
      </div>
      <div className="statistics__priority-section">
        <span className="statistics__priority-section-item">Без категории</span>
        <span className="statistics__priority-section-item--value">
          {getTimeComparisonString(
            props.thisWeekCategories?.Without ?? {
              totalTime: {
                hours: 0,
                minutes: 0,
              },
              numberOfTasks: 0,
            },
            props.lastWeekCategories?.Without ?? {
              totalTime: {
                hours: 0,
                minutes: 0,
              },
              numberOfTasks: 0,
            }
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

export default WeekCategoriesAnalytics;
