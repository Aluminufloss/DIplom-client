import React from "react";
import styled from "styled-components";
import cn from "classnames";

import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { setTaskPriority } from "@/store/slices/TaskModal";

type ParamsType = {
  currentPriority: "low" | "medium" | "high";
  className?: string;
};

const PrioritySelector: React.FC<ParamsType> = (props) => {
  const dispatch = useAppDispatch();

  const modalPriorityTitle = React.useMemo(() => {
    return (
      props.currentPriority[0].toUpperCase() + props.currentPriority.slice(1)
    );
  }, [props.currentPriority]);

  return (
    <StyledPrioritySelector className={props.className}>
      <span className="title">Выберите приоритет задачи</span>
      <div className="priority__wrapper">
        <span className="priority__title">{modalPriorityTitle}</span>
        <div
          className={cn(
            "priority__item",
            props.currentPriority === "low" && "priority__low"
          )}
          onClick={() => dispatch(setTaskPriority("low"))}
        />
        <div
          className={cn(
            "priority__item",
            props.currentPriority === "medium" && "priority__medium"
          )}
          onClick={() => dispatch(setTaskPriority("medium"))}
        />
        <div
          className={cn(
            "priority__item",
            props.currentPriority === "high" && "priority__high"
          )}
          onClick={() => dispatch(setTaskPriority("high"))}
        />
      </div>
    </StyledPrioritySelector>
  );
};

const StyledPrioritySelector = styled.div`
  display: flex;
  justify-content: space-between;

  .title {
    color: ${(props) => props.theme.colorValues.darkGrey};
    ${(props) => props.theme.typography.fnTitle1};
    ${(props) => props.theme.typography.fnMedium};
  }

  .priority {
    &__wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;

      & div:not(:last-child) {
        margin-right: 16px;
      }
    }

    &__title {
      color: ${(props) => props.theme.colorValues.darkGrey};
      ${(props) => props.theme.typography.fnTitle2};
      ${(props) => props.theme.typography.fnMedium};

      margin-right: 16px;
    }

    &__item {
      width: 24px;
      height: 24px;

      border-radius: 100px;

      background-color: ${(props) => props.theme.colorValues.lightGrey};

      transition: scale 0.3s ease;

      cursor: pointer;

      &:hover {
        transform: scale(1.05);
      }
    }

    &__low {
      background-color: ${(props) => props.theme.colorValues.green};
    }

    &__medium {
      background-color: ${(props) => props.theme.colorValues.yellow};
    }

    &__high {
      background-color: ${(props) => props.theme.colorValues.redSecondary};
    }
  }
`;

export default PrioritySelector;
