import React from "react";
import styled from "styled-components";

import { SelectesdDayType, TranslatedDays } from "@/store/slices/TaskModal/models";

type RepeatDayProps = {
  day: SelectesdDayType;
  onToggleDay: (day: SelectesdDayType) => void;
};

const RepeatDay: React.FC<RepeatDayProps> = ({ day, onToggleDay }) => {
  const translatedDay: string = TranslatedDays[day.day as keyof typeof TranslatedDays];
  
  return (
    <StyledDay
      $isSelected={day.isSelected}
      onClick={() => onToggleDay(day)} 
    >
      {translatedDay}
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
