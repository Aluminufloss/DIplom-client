import React from "react";
import styled from "styled-components";

import { SelectesdDayType } from "@/store/slices/TaskModal/models";
import { STATIC_URLS } from "@/utils/constant";

import Toggler from "@/components/UI/Toggler";
import RepeatDaysList from "./RepeatDaysList";
import ReusableImage from "@/components/UI/image";

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
        <div className="toggler__main-title">
          <ReusableImage
            src={`${STATIC_URLS.SVG_ICONS}/repeat.svg`}
            alt="Repeat icon"
            className="toggler__icon"
          />
          <span className="toggler__title">Повторить задачу</span>
        </div>
        <Toggler isActive={isActive} onClick={onSelect} className="toggler" />
      </div>
      {isActive && (
        <div className="repeat__list--wrapper">
          <div className="repeat__list--title-wrapper">
            <ReusableImage
              src={`${STATIC_URLS.SVG_ICONS}/arrow__circle.svg`}
              alt="Repeat icon"
              width={24}
              height={24}
              className="repeat__list--icon"
            />
            <h4 className="repeat__list--title">Выберите день</h4>
          </div>
          <RepeatDaysList
            setFieldValue={props.setFieldValue}
            className="repeat__list"
            selectedDays={props.selectedDays}
          />
        </div>
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

    &__main-title {
      display: flex;
      align-items: center;
    }

    &__icon {
      margin-right: 12px;
    }

    &__title {
      color: ${(props) => props.theme.colorValues.black};
      ${(props) => props.theme.typography.fnTitle1};
      ${(props) => props.theme.typography.fnMedium};
    }
  }

  .repeat__list {
    &--wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;

      width: 100%;

      margin-top: 20px;
    }

    &--title {
      color: ${(props) => props.theme.colorValues.black};
      ${(props) => props.theme.typography.fnTitle1};
      ${(props) => props.theme.typography.fnMedium};

      &-wrapper {
        display: flex;
        align-items: center;
      }
    }

    &--icon {
      margin-right: 12px;
    }
  }
`;

export default RepeatSelector;
