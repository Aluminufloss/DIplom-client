import React from "react";
import styled, { css } from "styled-components";

import { getTodayDay } from "@/utils/getTodayDay";
import { AppPaths, STATIC_URLS } from "@/utils/constant";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { useAppSelector } from "@/utils/hooks/useAppSelector";
import useTabbedNavigation from "@/utils/hooks/useTabbedNavigation";
import { TabEnum } from "@/store/slices/TabbedSidebar/models";
import { setSelectedTab } from "@/store/slices/TabbedSidebar";

import TabItem from "@/components/UI/tabItem";
import AnalyticsIcon from "../../UI/icons/AnalyticsIcon";
import TasksIcon from "../../UI/icons/TasksIcon";
import PlannedIcon from "../../UI/icons/PlannedIcon";
import CalendarIcon from "../../UI/icons/CalendarIcon";
import GeneralSection from "./GeneralSection";

type PropsType = {
  className?: string;
};

const TabbedSidebar: React.FC<PropsType> = (props) => {
  const modalState = useAppSelector((state) => state.tabbedSidebar);
  const { handleSelectTab } = useTabbedNavigation();

  const dispatch = useAppDispatch();

  const today = getTodayDay();

  React.useEffect(() => {
    handleSelectTab();
  }, []);

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
          onCLick={() => dispatch(setSelectedTab(TabEnum.today))}
          href={AppPaths.tasksToday}
        >
          <CalendarIcon fill="#fff" />
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
        onCLick={() => dispatch(setSelectedTab(TabEnum.planned))}
        href={AppPaths.tasksPlanned}
      >
        <PlannedIcon
          color={modalState.currentTab === TabEnum.planned ? "#fff" : "#000"}
        />
      </TabItem>
      <TabItem
        iconPath={`${STATIC_URLS.SVG_ICONS}/analytics.svg`}
        type="categories"
        itemText="Аналитика"
        className="tab-item"
        isActiveTab={modalState.currentTab === TabEnum.analytics}
        onCLick={() => dispatch(setSelectedTab(TabEnum.analytics))}
        href={AppPaths.tasksAnalytics}
      >
        <AnalyticsIcon />
      </TabItem>
      <TabItem
        iconPath={`${STATIC_URLS.SVG_ICONS}/tasks.svg`}
        type="categories"
        itemText="Все задачи"
        className="tab-item"
        isActiveTab={modalState.currentTab === TabEnum.tasks}
        onCLick={() => dispatch(setSelectedTab(TabEnum.tasks))}
        href={AppPaths.tasksAll}
      >
        <TasksIcon />
      </TabItem>
      <div className="separator" />
      <GeneralSection />
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

  position: fixed;
  left: -30%;
  top: 77px;

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
