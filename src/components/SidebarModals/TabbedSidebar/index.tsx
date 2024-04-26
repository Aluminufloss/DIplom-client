import React from "react";
import styled, { css } from "styled-components";

import { AppPaths, STATIC_URLS } from "@/utils/constant";
import { getTodayDay } from "@/utils/getTodayDay";
import { useAppSelector } from "@/utils/hooks/useAppSelector";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { setSelectedTab } from "@/store/slices/TabbedSidebar";
import { TabEnum } from "@/store/slices/TabbedSidebar/models";

import TabItem from "@/components/UI/tabItem";
import AddNewListButton from "./AddNewListButton";
import AnalyticsIcon from "./AnalyticsIcon";
import TasksIcon from "./TasksIcon";
import PlannedIcon from "./PlannedIcon";
import CalendarIcon from "./CalendarIcon";
import { useRouter } from "next/navigation";

type PropsType = {
  className?: string;
};

const TabbedSidebar: React.FC<PropsType> = (props) => {
  const modalState = useAppSelector((state) => state.tabbedSidebar);

  const dispatch = useAppDispatch();

  const today = getTodayDay();

  const router = useRouter();

  const handleNavigation = (currentTab: TabEnum) => {
    dispatch(setSelectedTab(currentTab));

    switch (currentTab) {
      case TabEnum.today:
        router.push(AppPaths.tasksToday);
        break;
      case TabEnum.planned:
        router.push(AppPaths.tasksPlanned);
        break;
      case TabEnum.analytics:
        router.push(AppPaths.tasksAnalytics);
        break;
      case TabEnum.tasks:
        router.push(AppPaths.tasksAll);
        break;
    }
  };

  return (
    <StyledView
      $isViewVisible={modalState.isViewVisible}
      className={props.className}
    >
      <div className="tab-item__today">
        <TabItem
          iconPath={`./public${STATIC_URLS.SVG_ICONS}/today.svg`}
          type="categories"
          itemText="Сегодня"
          isActiveTab={modalState.currentTab === TabEnum.today}
          onCLick={() => handleNavigation(TabEnum.today)}
        >
          <CalendarIcon fill="red" />
        </TabItem>
        <div className="date-wrapper">
          <span className="tab-item__today--day">{today}</span>
        </div>
      </div>
      <TabItem
        iconPath={`${STATIC_URLS.SVG_ICONS}/calendar.svg`}
        type="categories"
        itemText="Запланированные"
        className="tab-item"
        isActiveTab={modalState.currentTab === TabEnum.planned}
        onCLick={() => handleNavigation(TabEnum.planned)}
      >
        <PlannedIcon />
      </TabItem>
      <TabItem
        iconPath={`${STATIC_URLS.SVG_ICONS}/analytics.svg`}
        type="categories"
        itemText="Аналитика"
        className="tab-item"
        isActiveTab={modalState.currentTab === TabEnum.analytics}
        onCLick={() => handleNavigation(TabEnum.analytics)}
      >
        <AnalyticsIcon />
      </TabItem>
      <TabItem
        iconPath={`${STATIC_URLS.SVG_ICONS}/tasks.svg`}
        type="categories"
        itemText="Все задачи"
        className="tab-item"
        isActiveTab={modalState.currentTab === TabEnum.tasks}
        onCLick={() => handleNavigation(TabEnum.tasks)}
      >
        <TasksIcon />
      </TabItem>
      <div className="separator" />
      <AddNewListButton />
    </StyledView>
  );
};

type StyleProps = {
  $isViewVisible: boolean;
};

const StyledView = styled.div<StyleProps>`
  max-width: 260px;
  width: 100%;
  height: 100vh;

  padding: 24px 16px;

  margin-top: 77px;

  position: fixed;
  left: -30%;

  z-index: 50;

  background-color: ${(props) => props.theme.colorValues.sidebarWhite};

  transition: left 0.5s ease;

  ${(props) =>
    props.$isViewVisible &&
    css`
      left: 0;
    `}

  .tab-item {
    margin-bottom: 12px;
  }

  .separator {
    width: 100%;
    height: 1px;

    margin-bottom: 16px;

    background-color: ${(props) => props.theme.colorValues.lightGrey};
  }

  .date-wrapper {
    width: 14px;
    height: 11px;
    background-color: transparent;

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 39%;
    left: 13px;
  }

  .tab-item__today {
    position: relative;
    margin-bottom: 12px;

    &--day {
      font-size: 10px;

      ${(props) => props.theme.typography.fnSemiBold};
      color: ${(props) => props.theme.colorValues.black};
    }
  }
`;

export default TabbedSidebar;
