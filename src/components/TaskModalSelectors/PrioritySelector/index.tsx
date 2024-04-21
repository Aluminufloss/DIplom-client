import React from "react";
import styled from "styled-components";

type ParamsType = {
  currentPriority: "low" | "medium" | "high";
  className?: string;
};

const PrioritySelector: React.FC<ParamsType> = (props) => {
  return (
    <StyledPrioritySelector className={props.className}>
      <span className="title">Выберите приоритет задачи</span>
      <div className="priority__wrapper">
        <div className="priority__low priority__item" />
        <div className="priority__medium priority__item" />
        <div className="priority__high priority__item" />
      </div>
    </StyledPrioritySelector>
  );
};

const StyledPrioritySelector = styled.div`
  display: flex;
  justify-content: space-between;

  .title {
  }

  .priority {
    &__wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;

      width: 120px;
    }

    &__item {
      width: 24px;
      height: 24px;

      border-radius: 100px;
    }

    &__low {
      margin-right: 16px;
      background-color: ${(props) => props.theme.colorValues.green};
    }

    &__medium {
      margin-right: 16px;
      background-color: ${(props) => props.theme.colorValues.yellow};
    }

    &__high {
      background-color: ${(props) => props.theme.colorValues.redSecondary};
    }
  }
`;

export default PrioritySelector;
