import React from "react";
import styled from "styled-components";
import ReusableImage from "../image";

type PropsType = {
  type: "categories" | "details";
  iconPath: string;
  itemText: string;
  onCLick?: () => void;
  className?: string;
};

const TabItem: React.FC<PropsType> = (props) => {
  return (
    <StyledTabItem type={props.type}>
      <ReusableImage
        src={props.iconPath}
        alt="Tab action"
        className="tab-item__icon"
      />
      <p className="tab-item__text">{props.itemText}</p>
    </StyledTabItem>
  );
};

type StyleType = {
  type: "categories" | "details";
};

const StyledTabItem = styled.div<StyleType>`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;

  border-radius: 5px;

  padding: 5px 8px;

  transition: all .5s ease;

  .tab-item {
    &__text {
      ${(props) => props.theme.typography.fnTitle1};
      ${(props) => props.theme.typography.fnMedium};
      color: ${(props) => props.theme.colorValues.black};

      margin-left: 5px;
    }
  }

  &:hover {
    background-color: ${(props) =>
      props.type === "categories"
        ? props.theme.colorValues.primary
        : props.theme.colorValues.black};

    .tab-item {
      &__text {
        color: ${(props) => props.theme.colorValues.white};
      }

      &__icon {
        color: ${(props) => props.theme.colorValues.white};
      }
    }
  }
`;

export default TabItem;
