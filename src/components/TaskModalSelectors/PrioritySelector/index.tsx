import React from "react";
import styled from "styled-components";
import cn from "classnames";

import { STATIC_URLS } from "@/utils/constant";

import ReusableImage from "@/components/UI/image";

type ParamsType = {
  name: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  currentPriority: "low" | "medium" | "high";
  className?: string;
};

const PrioritySelector: React.FC<ParamsType> = (props) => {
  const modalPriorityTitle = React.useMemo(() => {
    switch (props.currentPriority) {
      case "low":
        return "Низкий";
      case "medium":
        return "Средний";
      case "high":
        return "Высокий";
    }
  }, [props.currentPriority]);

  const handlePriorityChange = (priority: "low" | "medium" | "high") => {
    props.setFieldValue(props.name, priority);
  };

  return (
    <StyledPrioritySelector className={props.className} id={props.name}>
      <div className="priority__main-title">
        <ReusableImage
          src={`${STATIC_URLS.SVG_ICONS}/priority.svg`}
          alt="Priority icon"
          className="priority__icon"
        />
        <span className="title">Выберите приоритет задачи</span>
      </div>
      <div className="priority__wrapper">
        <span className="priority__title">{modalPriorityTitle}</span>
        <div
          className={cn(
            "priority__item",
            props.currentPriority === "low" && "priority__low"
          )}
          onClick={() => handlePriorityChange("low")}
        />
        <div
          className={cn(
            "priority__item",
            props.currentPriority === "medium" && "priority__medium"
          )}
          onClick={() => handlePriorityChange("medium")}
        />
        <div
          className={cn(
            "priority__item",
            props.currentPriority === "high" && "priority__high"
          )}
          onClick={() => handlePriorityChange("high")}
        />
      </div>
    </StyledPrioritySelector>
  );
};

const StyledPrioritySelector = styled.div`
  display: flex;
  justify-content: space-between;

  .title {
    color: ${(props) => props.theme.colorValues.black};
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

    &__main-title {
      display: flex;
      align-items: center;
    }

    &__icon {
      margin-right: 12px;
    }

    &__title {
      color: ${(props) => props.theme.colorValues.darkGrey};
      ${(props) => props.theme.typography.fnTitle1};
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
