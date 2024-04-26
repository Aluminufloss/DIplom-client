"use client"

import React from "react";
import styled from "styled-components";

type ParamsType = {
  className?: string;
};

const PlannedDateSelector: React.FC<ParamsType> = (props) => {
  return (
    <StyledPlannedDateSelector className={props.className}>
      <span className="selector__title">Запланировать</span>
      <input
        type="text"
        id="picker"
        placeholder="Выберите дату"
        readOnly
        className="selector__timepicker"
      />
    </StyledPlannedDateSelector>
  );
};

const StyledPlannedDateSelector = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .selector {
    &__title {
      color: ${(props) => props.theme.colorValues.darkGrey};
      ${(props) => props.theme.typography.fnTitle1};
      ${(props) => props.theme.typography.fnMedium};
    }

    &__timepicker {
      width: 100%;
      max-width: 240px;


      border: 1px solid ${(props) => props.theme.colorValues.lightGrey};
      border-radius: 5px;

      margin-left: 12px;
      padding: 0 12px;

      &::placeholder {
        color: ${(props) => props.theme.colorValues.darkGrey};
        ${(props) => props.theme.typography.fnLabel2};
        ${(props) => props.theme.typography.fnMedium};
      }
    }
  }
`;

export default PlannedDateSelector;
