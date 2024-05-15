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
          category[1],
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

  .statistics__title {
    margin-bottom: 16px;
    text-align: center;

    ${(props) => props.theme.typography.fnTitle2}
    ${(props) => props.theme.typography.fnSemiBold};
    color: ${(props) => props.theme.colorValues.black};
  }
`;

export default CategoriesStatistics;
