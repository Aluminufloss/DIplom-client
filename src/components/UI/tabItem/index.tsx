import Link from "next/link";
import React from "react";
import styled, { css } from "styled-components";

type PropsType = {
  type: "categories" | "details";
  iconPath: string;
  itemText: string;
  isActiveTab: boolean;
  children?: React.ReactNode;
  href: string;
  onCLick?: () => void;
  className?: string;
};

const TabItem: React.FC<PropsType> = (props) => {
  return (
    <StyledTabItem
      type={props.type}
      className={props.className}
      $isActiveTab={props.isActiveTab}
      href={props.href}
      onClick={props.onCLick}
    >
      <div className="tab-item__icon">
        {props.children}
      </div>
      <p className="tab-item__text">{props.itemText}</p>
    </StyledTabItem>
  );
};

type StyleType = {
  type: "categories" | "details";
  $isActiveTab: boolean;
};

const StyledTabItem = styled(Link)<StyleType>`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;

  border-radius: 5px;

  background-color: ${(props) =>
    props.$isActiveTab && props.theme.colorValues.primary};

  padding: 5px 8px;

  transition: all 0.5s ease;

  cursor: pointer;

  .tab-item {
    &__text {
      ${(props) => props.theme.typography.fnTitle1};
      ${(props) => props.theme.typography.fnMedium};
      color: ${(props) =>
        props.$isActiveTab
          ? props.theme.colorValues.white
          : props.theme.colorValues.black};

      margin-left: 5px;
    }

    &__icon {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  ${(props) =>
    !props.$isActiveTab &&
    css`
      &:hover {
        background-color: ${props.type === "categories"
          ? props.theme.colorValues.lightGrey
          : props.theme.colorValues.black};

        .tab-item__icon {
          color: ${props.theme.colorValues.white};
        }
      }
    `}
`;

export default TabItem;
