import React from "react";
import styled from "styled-components";

import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

type ParamsType = {
  className?: string;
};

const PlannedDateSelector: React.FC<ParamsType> = (props) => {
  new AirDatepicker('timepicker', {
    selectedDates: [new Date()],
    timepicker: true,
  });


  return (
    <StyledPlannedDateSelector className={props.className}>
      <span className="selector__title">Запланировать</span>
      <div id="timepicker" className="selector__timepicker"/>
    </StyledPlannedDateSelector>
  );
};

const StyledPlannedDateSelector = styled.div`
  width: 100%;

  display: flex;
  align-items: center;

  .selector {
    &__title {
      ${(props) => props.theme.typography.fnMedium};
      ${(props) => props.theme.typography.fnTitle2};
      color: ${(props) => props.theme.colorValues.black};
    }

    &__timepicker {
      width: 100%;
      max-width: 180px;
      height: 36px;

      border: 1px solid ${(props) => props.theme.colorValues.lightGrey};
      border-radius: 5px;

      margin-left: 12px;
    }
  }
`;

export default PlannedDateSelector;
