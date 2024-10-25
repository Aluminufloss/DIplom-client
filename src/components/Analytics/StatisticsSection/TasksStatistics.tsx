import styled from "styled-components";

import ProgressBar from "./ProgressBar";
import { TasksAnalyticsType } from "@/models";
import { getAnalyticsPercent } from "@/utils/getAnalyticsPercent";

type PropsType = {
  tasksAnalytics?: TasksAnalyticsType;
};

const TasksStatistics: React.FC<PropsType> = (props) => {
  const completedTasksPercent = getAnalyticsPercent(
    props.tasksAnalytics?.completed,
    props.tasksAnalytics?.tasksLength
  );

  const activeTasksPercent = getAnalyticsPercent(
    props.tasksAnalytics?.active,
    props.tasksAnalytics?.tasksLength
  );

  const expiredTasksPercent = getAnalyticsPercent(
    props.tasksAnalytics?.expired,
    props.tasksAnalytics?.tasksLength
  );

  return (
    <StyledCategoriesStatistics>
      <h3 className="statistics__title">Прогресс по статусу задач</h3>
      <div className="statistics__tasks">
        <span className="statistics__tasks--text">Всего задач</span>
        <span className="statistics__tasks--number">
          {props.tasksAnalytics?.tasksLength}
        </span>
      </div>
      <ProgressBar label="Активные" value={activeTasksPercent} />
      <ProgressBar label="Просроченные" value={expiredTasksPercent} />
      <ProgressBar label="Завершённые" value={completedTasksPercent} />
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
      margin-bottom: 16px;

      ${(props) => props.theme.typography.fnTitle2}
      ${(props) => props.theme.typography.fnSemiBold};
      color: ${(props) => props.theme.colorValues.black};
    }

    &__tasks {
      display: flex;
      align-items: center;
      justify-content: space-between;

      margin-bottom: 12px;
      padding-right: 6px;
    }

    &__tasks--text {
      ${(props) => props.theme.typography.fnTitle2}
      ${(props) => props.theme.typography.fnMedium};
      color: ${(props) => props.theme.colorValues.black};
    }

    &__tasks--number {
      ${(props) => props.theme.typography.fnTitle2}
      ${(props) => props.theme.typography.fnMedium};
      color: ${(props) => props.theme.colorValues.black};

      margin-right: 10px;
    }
  }
`;

export default TasksStatistics;
