"use client";

import styled, { useTheme } from "styled-components";

import { getAnalyticsPercent } from "@/utils/getAnalyticsPercent";

import { PieChart } from "@mui/x-charts/PieChart";

type PropsType = {
  tasksLength?: number;
  completedTasksLength?: number;
};

const ProgressBlock: React.FC<PropsType> = (props) => {
  const getCompletedPercent: number = getAnalyticsPercent(
    props.completedTasksLength,
    props.tasksLength
  );
  const theme = useTheme();

  return (
    <StyledProgressBlock>
      <h3 className="progress__title">Прогресс по задачам</h3>
      <div className="progress__wrapper">
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: props.tasksLength ?? 0 },
                { id: 1, value: props.completedTasksLength ?? 0 },
              ],
              innerRadius: 88,
              startAngle: 90,
              endAngle: 450,
            },
          ]}
          colors={[theme.colorValues.lightGrey, theme.colorValues.green]}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          width={200}
          height={200}
          className="graph"
        />
        <div className="progress__description">
          <span className="progress__description--percent">
            {getCompletedPercent}%
          </span>
          <span className="progress__description--text">Выполнено</span>
        </div>
      </div>
    </StyledProgressBlock>
  );
};

const StyledProgressBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;

  max-height: 300px;

  padding: 20px 24px;
  margin-bottom: 20px;

  background-color: ${(props) => props.theme.colorValues.white};
  border-radius: 5px;

  .progress {
    &__wrapper {
      position: relative;

      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      flex-grow: 1;
    }

    &__description {
      position: absolute;
      top: 50%;
      left: 50%;

      transform: translate(-50%, -50%);

      display: flex;
      flex-direction: column;
      align-items: center;

      &--percent {
        color: ${(props) => props.theme.colorValues.green};
        ${(props) => props.theme.typography.fnTitle4};
        ${(props) => props.theme.typography.fnSemiBold};

        margin-bottom: 5px;
      }

      &--text {
        color: ${(props) => props.theme.colorValues.darkGrey};
        ${(props) => props.theme.typography.fnTitle1};
        ${(props) => props.theme.typography.fnMedium};
      }
    }

    &__title {
      ${(props) => props.theme.typography.fnTitle2}
      ${(props) => props.theme.typography.fnSemiBold};
      color: ${(props) => props.theme.colorValues.black};

      align-self: center;

      margin-bottom: 16px;
    }
  }
`;

export default ProgressBlock;
