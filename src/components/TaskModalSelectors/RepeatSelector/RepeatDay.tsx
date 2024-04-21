import React from "react";
import styled from "styled-components";

import { SelectesdDayType } from "@/store/slices/TaskModal/models";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { setRepeatDay } from "@/store/slices/TaskModal";

type ParamsType = {
  day: SelectesdDayType;
};

const RepeatDay: React.FC<ParamsType> = (props) => {
  const dispatch = useAppDispatch();

  return (
    <StyledDay
      $isSelected={props.day.isSelected}
      onClick={() => dispatch(setRepeatDay(props.day))}
    >
      {props.day.day}
    </StyledDay>
  );
};

const StyledDay = styled.li<{ $isSelected: boolean }>`
  background-color: ${(props) =>
    props.$isSelected
      ? props.theme.colorValues.primary
      : props.theme.colorValues.lightGrey};

  color: ${(props) =>
    props.$isSelected
      ? props.theme.colorValues.white
      : props.theme.colorValues.darkGrey};

  ${(props) => props.theme.typography.fnLabel2};
  ${(props) => props.theme.typography.fnMedium};

  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 2px;

  border-radius: 8px;

  transition: transform 0.3s ease;

  user-select: none;

  &:hover {
    transform: scale(1.05);
  }
`;

export default RepeatDay;
