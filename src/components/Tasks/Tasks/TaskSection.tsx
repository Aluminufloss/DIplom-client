"use client";

import React from "react";
import styled from "styled-components";

import { SectionEnum } from "./models";

import TaskItem from "./TaskItem";
import TaskSectionInfoBar from "./TaskSectionInfoBar";
import { useAppSelector } from "@/utils/hooks/useAppSelector";

export const TaskSection: React.FC = () => {
  const isTabbedViewVisible = useAppSelector(
    (state) => state.tabbedSidebar.isViewVisible
  );

  return (
    <StyledTaskSection $isViewVisible={isTabbedViewVisible}>
      <TaskSectionInfoBar sectionType={SectionEnum.today} />
      <TaskItem />
      <TaskItem />
      <TaskItem />
    </StyledTaskSection>
  );
};

const StyledTaskSection = styled.div<{ $isViewVisible: boolean }>`
  width: 100%;
	transition: margin-left .5s ease;

	margin: 0 auto;

  /* margin-left: ${props => props.$isViewVisible ? '266px' : "36px"}; */
`;

export default TaskSection;
