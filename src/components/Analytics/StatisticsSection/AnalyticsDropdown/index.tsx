import React from "react";
import styled, { useTheme } from "styled-components";

import AnalyticsIcon from "./AnalyticsIcon";
import { useAppSelector } from "@/utils/hooks/useAppSelector";
import { useRouter } from "next/navigation";
import { AppPaths } from "@/utils/constant";
import classNames from "classnames";

const AnalyticsDropdown: React.FC = () => {
  const theme = useTheme();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);

  const listInfo = useAppSelector((state) => state.lists);

  const router = useRouter();

  return (
    <StyledDropdown
      onMouseEnter={() => setIsModalVisible(true)}
      onMouseLeave={() => setIsModalVisible(false)}
      $isModalVisible={isModalVisible}
    >
      <AnalyticsIcon
        strokeColor={
          !isModalVisible
            ? theme.colorValues.lightGrey
            : theme.colorValues.white
        }
        className="dropdown__icon"
      />
      <button className="dropdown__button">Тип аналитики</button>
      <ul className="dropdown__menu">
        <li
          className={classNames(
            "dropdown__menu-item",
            activeTab === 0 && "dropdown__menu-item--active"
          )}
          onClick={() => {
            router.push(`${AppPaths.analyticsAll}`);
            setActiveTab(0);
          }}
        >
          По всем задачам
        </li>
        <li
          className={classNames(
            "dropdown__menu-item",
            activeTab === 1 && "dropdown__menu-item--active"
          )}
          onClick={() => {
            router.push(`${AppPaths.analyticsWeek}`);
            setActiveTab(1);
          }}
        >
          По текущей неделе
        </li>
        <li
          className={classNames(
            "dropdown__menu-item",
            activeTab === 2 && "dropdown__menu-item--active"
          )}
          onClick={() => {
            router.push(`${AppPaths.analyticsMonth}`);
            setActiveTab(2);
          }}
        >
          По текущему месяцу
        </li>
        <li
          className={classNames(
            "dropdown__menu-item",
            activeTab === 3 && "dropdown__menu-item--active"
          )}
          onClick={() => {
            router.push(`${AppPaths.analyticsYear}`);
            setActiveTab(3);
          }}
        >
          По текущему году
        </li>
      </ul>
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div<{ $isModalVisible: boolean }>`
  display: flex;
  align-items: center;
  position: relative;

  padding: 8px 12px;

  border-radius: 5px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  transition: background-color 0.3s ease;

  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.$isModalVisible ? props.theme.colorValues.primary : "transparent"};
  }

  .dropdown {
    &__menu {
      max-height: 160px;

      -ms-overflow-style: none;
      overflow-x: hidden;
      scrollbar-width: none;
      overflow-y: scroll;
    }

    &__icon {
      margin-right: 8px;
    }

    &__button {
      ${(props) => props.theme.typography.fnTitle2}
      ${(props) => props.theme.typography.fnMedium};
      color: ${(props) =>
        props.$isModalVisible
          ? props.theme.colorValues.white
          : props.theme.colorValues.lightGrey};

      transition: color 0.3s ease;

      transform: translateY(1px);
    }

    &__menu {
      position: absolute;
      top: calc(100% + 1px);
      left: 0;
      z-index: ${(props) => (props.$isModalVisible ? "100" : "-1")};

      width: 100%;

      visibility: ${(props) => (props.$isModalVisible ? "visible" : "hidden")};
      opacity: ${(props) => (props.$isModalVisible ? "1" : "0")};

      border: 1px solid ${(props) => props.theme.colorValues.lightGrey};
      border-top: none;
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 5px;

      box-shadow: rgba(192, 194, 195, 0.1) 0px 8px 24px;

      background-color: ${(props) => props.theme.colorValues.white};

      transition: visibility 0.3s ease, opacity 0.3s ease;

      & li:not(:last-child) {
        border-bottom: 1px solid ${(props) => props.theme.colorValues.lightGrey};
      }

      &-item {
        display: flex;
        align-items: center;

        ${(props) => props.theme.typography.fnLabel2};
        ${(props) => props.theme.typography.fnMedium};
        color: ${(props) => props.theme.colorValues.black};

        width: 100%;

        padding: 8px 10px;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        transition: background-color 0.3s ease;

        &--active {
          background-color: ${(props) => props.theme.colorValues.lightGrey};
        }

        &:hover,
        &--active {
          background-color: ${(props) => props.theme.colorValues.strokeGrey};
        }
      }
    }
  }
`;

export default AnalyticsDropdown;
