import React from "react";
import styled from "styled-components";

import { SelectesdDayType } from "@/store/slices/TaskModal/models";

import Toggler from "@/components/UI/Toggler";
import RepeatDaysList from "./RepeatDaysList";

type ParamsType = {
  name: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  selectedDays: SelectesdDayType[];
  className?: string;
};

const RepeatSelector: React.FC<ParamsType> = (props) => {
  const [isActive, setIsActive] = React.useState(false);

  const onSelect = React.useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  return (
    <StyledRepeatSelector className={props.className} id={props.name}>
      <div className="toggler__wrapper">
        <span className="toggler__title">Повторить задачу</span>
        <Toggler isActive={isActive} onClick={onSelect} className="toggler" />
      </div>
      {isActive && (
        <RepeatDaysList
          setFieldValue={props.setFieldValue}
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

    &__title {
      color: ${(props) => props.theme.colorValues.darkGrey};
      ${(props) => props.theme.typography.fnTitle1};
      ${(props) => props.theme.typography.fnMedium};
    }
  }

  .repeat__list {
    margin-top: 24px;
  }
`;

export default RepeatSelector;
