import React from "react";
import styled from "styled-components";

import { SelectesdDayType } from "@/store/slices/TaskModal/models";
import RepeatDay from "./RepeatDay";

type RepeatDaysListProps = {
  selectedDays: SelectesdDayType[];
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  className?: string;
};

const RepeatDaysList: React.FC<RepeatDaysListProps> = ({
  selectedDays,
  setFieldValue,
  className,
}) => {
  const handleToggleDay = (day: SelectesdDayType) => {
    const updatedDays = selectedDays.map((d) =>
      d.day === day.day ? { ...d, isSelected: !d.isSelected } : d
    );

    setFieldValue("taskInfo.repeatDays", updatedDays);
  };

  return (
    <StyledDaysList className={className}>
      {selectedDays.map((day) => (
        <RepeatDay day={day} key={day.day} onToggleDay={handleToggleDay} />
      ))}
    </StyledDaysList>
  );
};

const StyledDaysList = styled.ul`
   display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 18px;
`;

export default RepeatDaysList;
