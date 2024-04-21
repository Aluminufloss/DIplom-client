import React from "react";
import styled from "styled-components";

import { SelectesdDayType } from "@/store/slices/TaskModal/models";

import RepeatDay from "./RepeatDay";

type ParamsType = {
  selectedDays: SelectesdDayType[];
  className?: string;
};

const RepeatDaysList: React.FC<ParamsType> = (props) => {
  return (
    <StyledDaysList className={props.className}>
      {props.selectedDays.map((day) => (
        <RepeatDay day={day} key={day.day} />
      ))}
    </StyledDaysList>
  );
};

const StyledDaysList = styled.ul`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-top: 16px;

  border-top: 1px solid ${(props) => props.theme.colorValues.grey};
`;

export default RepeatDaysList;
