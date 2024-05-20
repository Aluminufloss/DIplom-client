import styled from "styled-components";

import { categoriesAnalyticsType } from "@/models";
import { getAnalyticsPercent } from "@/utils/getAnalyticsPercent";
import { Categories, TranslatedCategories } from "@/utils/constant";

import ProgressBar from "./ProgressBar";

type PropsType = {
  tasksLength?: number;
  categoriesAnalytics?: categoriesAnalyticsType;
};

const CategoriesStatistics: React.FC<PropsType> = (props) => {
  const categoriesEntries = Object.entries(props.categoriesAnalytics ?? {});

  return (
    <StyledCategoriesStatistics>
      <h3 className="statistics__title">Прогресс по категориям</h3>
      {categoriesEntries.map((category, index) => {
        const categoryPercent = getAnalyticsPercent(
          category[1].numberOfTasks,
          props.tasksLength
        );

        const translatedLabel =
          TranslatedCategories[
            Categories.findIndex((el) => el === category[0])
          ];

        return (
          <ProgressBar
            key={index}
            label={translatedLabel}
            value={categoryPercent}
          />
        );
      })}

      <div className="statistics__time-section">
        <h3 className="statistics__title statistics__title">
          Затраченное время на категории
        </h3>

        {categoriesEntries.map((category, index) => {
          return (
            <div key={index} className="statistics__time-item">
              <span className="statistics__time-item--label">
                {
                  TranslatedCategories[
                    Categories.findIndex((el) => el === category[0])
                  ]
                }
              </span>
              <span className="statistics__time-item--value" title={`${category[1].totalTime.hours} ч. ${category[1].totalTime.minutes} мин.`}>
                {category[1].totalTime.hours} ч. {category[1].totalTime.minutes} мин.
              </span>
            </div>
          );
        })}
      </div>
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
      margin-bottom: 16px;
      text-align: center;

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

export default CategoriesStatistics;
