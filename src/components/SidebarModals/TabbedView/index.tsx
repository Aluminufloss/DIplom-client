import React from "react";
import styled from "styled-components";

import { useAppSelector } from "@/utils/hooks/useAppSelector";
import TabItem from "@/components/UI/tabItem";
import { STATIC_URLS } from "@/utils/constant";
import { getTodayDay } from "@/utils/getTodayDay";
import AddNewListButton from "./AddNewListButton";

type PropsType = {};

const TabbedView: React.FC<PropsType> = (props) => {
  const modalState = useAppSelector((state) => state.tabbedView);

  const today = getTodayDay();

  return (
    <StyledView isViewVisible={modalState.isViewVisible}>
      <div className="tab-item__today">
        <TabItem
          iconPath={`${STATIC_URLS.SVG_ICONS}/today.svg`}
          type="categories"
          itemText="Today"
        />
        {/* <span className="tab-item__today--day">{today}</span> */}
      </div>
      <TabItem
        iconPath={`${STATIC_URLS.SVG_ICONS}/calendar.svg`}
        type="categories"
        itemText="Planned"
      />
      <TabItem
        iconPath={`${STATIC_URLS.SVG_ICONS}/analytics.svg`}
        type="categories"
        itemText="Analytics"
      />
      <TabItem
        iconPath={`${STATIC_URLS.SVG_ICONS}/tasks.svg`}
        type="categories"
        itemText="Tasks"
      />
			<div className="separator"/>
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

	div:not(:first-child) {
		margin-top: 16px;
	}

	div:last-child {
		margin-bottom: 24px;
	}

	.separator {
		width: 100%;
		height: 1px;

		margin-bottom: 24px;
		
		background-color: ${(props) => props.theme.colorValues.lightGrey};
	}

  .tab-item__today {
    position: relative;

    &--day {
      position: absolute;
      top: 50%;
      left: 50%;

      ${(props) => props.theme.typography.fnTitle1};
      ${(props) => props.theme.typography.fnMedium};
      color: ${(props) => props.theme.colorValues.black};
    }
  }
`;

export default TabbedView;
