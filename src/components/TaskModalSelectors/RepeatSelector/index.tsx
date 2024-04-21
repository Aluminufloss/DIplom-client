import React from "react";
import styled from "styled-components";

import { SelectesdDayType } from "@/store/slices/TaskModal/models";

import Toggler from "@/components/UI/Toggler";
import RepeatDaysList from "./RepeatDaysList";

type ParamsType = {
  selectedDays: SelectesdDayType[];
  className?: string;
};

const RepeatSelector: React.FC<ParamsType> = (props) => {
  const [isActive, setIsActive] = React.useState(false);

  const onSelect = React.useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  return (
    <StyledRepeatSelector className={props.className}>
      <div className="toggler__wrapper">
        <span>Повторить задачу</span>
        <Toggler isActive={isActive} onClick={onSelect} className="toggler" />
      </div>
      {isActive && (
        <RepeatDaysList
          className="repeat__list"
          selectedDays={props.selectedDays}
        />
      )}
    </StyledRepeatSelector>
  );
};

const StyledRepeatSelector = styled.div`
  width: 100%;

  .toggler {
    margin-left: auto;

    &__wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .repeat__list {
    margin-top: 24px;
  }
`;

export default RepeatSelector;
