"use client";

import React from "react";
import styled from "styled-components";

import { SectionEnum } from "./models";
import { useAppSelector } from "@/utils/hooks/useAppSelector";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import getGrouppedTasks from "./utils/getGrouppedTasks";

import { setLists } from "@/store/slices/Lists";
import { setPlannedTasks } from "@/store/slices/Tasks";
import { setGroups } from "@/store/slices/Groups";

import TaskItem from "./TaskItem";
import TaskSectionInfoBar from "./TaskSectionInfoBar";
import AddTaskButton from "./AddTaskButton";
import TaskSection from "@/components/UI/TaskSection";

export const PlannedTasksSection: React.FC = () => {
  const isTabbedViewVisible = useAppSelector(
    (state) => state.tabbedSidebar.isViewVisible
  );
  const filteredTasks = useAppSelector((state) => state.tasks.filteredTasks);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    (async () => {
      const plannedTasksPageResponse = await fetch(
        "http://localhost:3000/tasks/planned/api"
      );

      const plannedTasksPageResponseData =
        await plannedTasksPageResponse.json();

      dispatch(setPlannedTasks(plannedTasksPageResponseData?.tasks.data));
      dispatch(setLists(plannedTasksPageResponseData?.lists));
      dispatch(setGroups(plannedTasksPageResponseData?.groups));

      if (plannedTasksPageResponseData?.accessToken) {
        localStorage.setItem(
          "accessToken",
          plannedTasksPageResponseData.accessToken
        );
      }
    })();
  }, []);

  const grouppedTasks = getGrouppedTasks(filteredTasks);

  return (
    <StyledTaskSection $isViewVisible={isTabbedViewVisible}>
      <TaskSectionInfoBar sectionType={SectionEnum.planned} />
      <AddTaskButton />

      {!!grouppedTasks?.planned.length &&
        grouppedTasks.planned.map((task) => {
          return <TaskItem key={task.taskId} task={task} />;
        })}

      {!!grouppedTasks?.completed.length && (
        <TaskSection
          sectionTitle="Завершённые задачи"
          tasks={grouppedTasks.completed}
        />
      )}

      {!!grouppedTasks?.expired.length && (
        <TaskSection
          sectionTitle="Просроченные задачи"
          tasks={grouppedTasks.expired}
        />
      )}
    </StyledTaskSection>
  );
};

const StyledTaskSection = styled.div<{ $isViewVisible: boolean }>`
  width: 100%;
  height: 100vh;

  .date {
    width: 300px;
    height: 300px;
  }

  .group-separator {
    ${(props) => props.theme.typography.fnTitle2}
    ${(props) => props.theme.typography.fnMedium};
    color: ${(props) => props.theme.colorValues.primary};

    width: 100%;

    margin-bottom: 20px;

    display: flex;
    align-items: flex-end;

    padding: 12px 16px;

    background-color: ${(props) => props.theme.colorValues.sidebarWhite};

    border: 1px solid ${(props) => props.theme.colorValues.lightGrey};
    border-radius: 5px;
  }
`;

export default PlannedTasksSection;
