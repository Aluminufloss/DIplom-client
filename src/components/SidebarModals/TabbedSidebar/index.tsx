import React from "react";
import styled from "styled-components";

import { STATIC_URLS } from "@/utils/constant";
import { getTodayDay } from "@/utils/getTodayDay";
import { useAppSelector } from "@/utils/hooks/useAppSelector";

import TabItem from "@/components/UI/tabItem";
import AddNewListButton from "./AddNewListButton";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { setSelectedTab } from "@/store/slices/TabbedSidebar";
import { TabEnum } from "@/store/slices/TabbedSidebar/models";

type PropsType = {};

const TabbedSidebar: React.FC<PropsType> = (props) => {
  const modalState = useAppSelector((state) => state.tabbedSidebar);

  const dispatch = useAppDispatch();

  const today = getTodayDay();

  return (
    <StyledView isViewVisible={modalState.isViewVisible}>
      <div className="tab-item__today">
        <TabItem
          iconPath={`${STATIC_URLS.SVG_ICONS}/today.svg`}
          type="categories"
          itemText="Today"
          isActiveTab={modalState.currentTab === TabEnum.today}
          onCLick={() => dispatch(setSelectedTab(TabEnum.today))}
        />
        <div className="date-wrapper">
          <span className="tab-item__today--day">{today}</span>
        </div>
      </div>
      <TabItem
        iconPath={`${STATIC_URLS.SVG_ICONS}/calendar.svg`}
        type="categories"
        itemText="Planned"
        className="tab-item"
        isActiveTab={modalState.currentTab === TabEnum.planned}
        onCLick={() => dispatch(setSelectedTab(TabEnum.planned))}
      />
      <TabItem
        iconPath={`${STATIC_URLS.SVG_ICONS}/analytics.svg`}
        type="categories"
        itemText="Analytics"
        className="tab-item"
        isActiveTab={modalState.currentTab === TabEnum.analytics}
        onCLick={() => dispatch(setSelectedTab(TabEnum.analytics))}
      />
      <TabItem
        iconPath={`${STATIC_URLS.SVG_ICONS}/tasks.svg`}
        type="categories"
        itemText="Tasks"
        className="tab-item"
        isActiveTab={modalState.currentTab === TabEnum.tasks}
        onCLick={() => dispatch(setSelectedTab(TabEnum.tasks))}
      />
      <div className="separator" />
      <AddNewListButton />
    </StyledView>
  );
};

type StyleProps = {
  isViewVisible: boolean;
};

const StyledView = styled.div<StyleProps>`
  max-width: 230px;
  width: 100%;
  height: 100vh;

  padding: 24px 16px;

  position: fixed;
  top: 75px;
  left: ${(props) => (props.isViewVisible ? "0" : "-230px")};

  z-index: 50;

  background-color: ${(props) => props.theme.colorValues.sidebarWhite};

  transition: all 0.5s ease;

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
