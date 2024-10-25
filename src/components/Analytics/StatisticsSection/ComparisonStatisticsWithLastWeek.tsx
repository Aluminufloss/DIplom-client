import styled from "styled-components";

import { WeekAnalyticsType } from "@/models";

import WeekPrioritiesAnalytics from "./WeekAnalytics/WeekPrioritiesAnalytics";
import WeekTasksAnalytics from "./WeekAnalytics/WeekTasksAnalytics";
import WeekCategoriesAnalytics from "./WeekAnalytics/WeekCategoriesAnalytics";

type PropsType = {
  data?: WeekAnalyticsType;
};

const ComparisonStatistics: React.FC<PropsType> = (props) => {
  return (
    <StyledCategoriesStatistics>
      <h3 className="statistics__title">
        Сравнительная статистика с прошлой неделей
      </h3>
      <WeekTasksAnalytics
        thisWeekTasks={props.data?.tasks.thisWeek}
        lastWeekTasks={props.data?.tasks.lastWeek}
      />
      <WeekPrioritiesAnalytics
        thisWeekPriorities={props.data?.priority.thisWeek}
        lastWeekPriorities={props.data?.priority.lastWeek}
      />
      <WeekCategoriesAnalytics
        thisWeekCategories={props.data?.categories.thisWeek}
        lastWeekCategories={props.data?.categories.lastWeek}
      />
    </StyledCategoriesStatistics>
  );
};

const StyledCategoriesStatistics = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;

  width: 100%;

  background-color: ${(props) => props.theme.colorValues.white};
  border-radius: 5px;

  padding: 24px;
  margin-top: 20px;

  .statistics {
    &__title {
      text-align: center;

      margin-bottom: 12px;

      ${(props) => props.theme.typography.fnTitle2}
      ${(props) => props.theme.typography.fnSemiBold};
      color: ${(props) => props.theme.colorValues.black};
    }

    &__time-section {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 12px;

      width: 100%;

      margin-top: 16px;
    }

    &__time-item {
      display: flex;
      align-items: center;
      justify-content: space-between;

      width: 100%;

      &--label {
        color: ${(props) => props.theme.colorValues.black};
        ${(props) => props.theme.typography.fnTitle1};
        ${(props) => props.theme.typography.fnMedium};

        margin-right: 6px;

        flex: 1 1 50%;
      }

      &--value {
        color: ${(props) => props.theme.colorValues.black};
        ${(props) => props.theme.typography.fnTitle1};
        ${(props) => props.theme.typography.fnMedium};

        flex: 1 1 50%;

        text-align: end;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
`;

export default ComparisonStatistics;
