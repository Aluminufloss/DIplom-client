import styled from "styled-components";

import { priorityAnalyticsType } from "@/models";
import { getAnalyticsPercent } from "@/utils/getAnalyticsPercent";

import ProgressBar from "./ProgressBar";

type PropsType = {
  priorityData?: priorityAnalyticsType;
  tasksLength?: number;
};

const PriorityStatistics: React.FC<PropsType> = (props) => {
  const highPriorityPercent = getAnalyticsPercent(
    props.priorityData?.high,
    props.tasksLength
  );
  const middlePriorityPercent = getAnalyticsPercent(
    props.priorityData?.medium,
    props.tasksLength
  );
  const lowPriorityPercent = getAnalyticsPercent(
    props.priorityData?.low,
    props.tasksLength
  );

  return (
    <StyledPriorityStatistics>
      <h3 className="statistics__title">Прогресс по приоритетам</h3>
      <ProgressBar label="Высокий" value={highPriorityPercent} color="error"/>
      <ProgressBar label="Средний" value={middlePriorityPercent} color="info"/>
      <ProgressBar label="Низкий" value={lowPriorityPercent} color="success"/>
    </StyledPriorityStatistics>
  );
};

const StyledPriorityStatistics = styled.div`
  background-color: ${(props) => props.theme.colorValues.white};
  border-radius: 5px;

  padding: 24px;

  .statistics__title {
    text-align: center;
    margin-bottom: 16px;

    ${(props) => props.theme.typography.fnTitle2}
    ${(props) => props.theme.typography.fnSemiBold};
    color: ${(props) => props.theme.colorValues.black};
  }
`;

export default PriorityStatistics;
