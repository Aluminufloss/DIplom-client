"use client";

import React from "react";
import styled from "styled-components";

import { SectionEnum } from "./models";

import TaskItem from "./TaskItem";
import TaskSectionInfoBar from "./TaskSectionInfoBar";
import { useAppSelector } from "@/utils/hooks/useAppSelector";
import AddTaskButton from "./AddTaskButton";

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
      <AddTaskButton />
    </StyledTaskSection>
  );
};

const StyledTaskSection = styled.div<{ $isViewVisible: boolean }>`
  width: 100%;

  .date {
    width: 300px;
    height: 300px;
  }
`;

export default TaskSection;
