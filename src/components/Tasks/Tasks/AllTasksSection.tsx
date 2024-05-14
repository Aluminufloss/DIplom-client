"use client";

import React from "react";
import styled from "styled-components";

import { SectionEnum } from "./models";
import { useAppSelector } from "@/utils/hooks/useAppSelector";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import getGrouppedTasks from "./utils/getGrouppedTasks";

import { setAllTasks } from "@/store/slices/Tasks";
import { setLists } from "@/store/slices/Lists";

import TaskItem from "./TaskItem";
import TaskSectionInfoBar from "./TaskSectionInfoBar";
import AddTaskButton from "./AddTaskButton";
import TaskSection from "@/components/UI/TaskSection";

export const AllTasksSection: React.FC = async () => {
  const isTabbedViewVisible = useAppSelector(
    (state) => state.tabbedSidebar.isViewVisible
  );

  const allTasks = useAppSelector((state) => state.tasks.allTasks);
  const grouppedTasks = getGrouppedTasks(allTasks);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    (async () => {
      const allTasksPageResponse = await fetch(
        "http://localhost:3000/tasks/all/api"
      );

      const allTasksPageData = await allTasksPageResponse.json();

      dispatch(setAllTasks(allTasksPageData?.tasks.data));
      dispatch(setLists(allTasksPageData?.lists.data));

      if (allTasksPageData?.accessToken) {
        localStorage.setItem("accessToken", allTasksPageData.accessToken);
      }
    })();
  }, []);

  return (
    <StyledTaskSection $isViewVisible={isTabbedViewVisible}>
      <TaskSectionInfoBar sectionType={SectionEnum.tasks} />
      <AddTaskButton />

      {!!grouppedTasks?.active.length &&
        grouppedTasks.active.map((task) => {
          return <TaskItem key={task.taskId} task={task} />;
        })}

      {!!grouppedTasks?.planned.length && (
        <TaskSection
          sectionTitle="Запланированные задачи"
          tasks={grouppedTasks.planned}
        />
      )}

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

export default AllTasksSection;
