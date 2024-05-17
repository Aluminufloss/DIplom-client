"use client";

import React from "react";
import styled from "styled-components";

import { SectionEnum } from "./models";
import { useAppSelector } from "@/utils/hooks/useAppSelector";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import getGrouppedTasks from "./utils/getGrouppedTasks";

import { ITask } from "@/api/models/Response/Tasks/ITask";

import { setLists, setListsLoading } from "@/store/slices/Lists";
import { setPlannedTasks } from "@/store/slices/Tasks";
import { setGroups } from "@/store/slices/Groups";

import TaskItem from "./TaskItem";
import TaskSectionInfoBar from "./TaskSectionInfoBar";
import AddTaskButton from "./AddTaskButton";
import TaskSection from "@/components/UI/TaskSection";
import EmptySearchCard from "@/components/UI/EmptySearchCard";
import TaskSkeletonsSection from "@/components/UI/Skeletons/Task/TaskSkeletonsSection";

export const PlannedTasksSection: React.FC = () => {
  const isTabbedViewVisible = useAppSelector(
    (state) => state.tabbedSidebar.isViewVisible
  );

  const searchValue: string = useAppSelector(
    (state) => state.tasks.searchValue
  );
  const plannedTasks: ITask[] = useAppSelector(
    (state) => state.tasks.plannedTasks
  );
  const isTasksLoading = useAppSelector((state) => state.lists.isLoading);

  const filteredPlannedTasks = plannedTasks.filter((task) => {
    return task.title.toLowerCase().startsWith(searchValue.toLowerCase());
  });

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    (async () => {
      dispatch(setListsLoading(true));

      const plannedTasksPageResponse = await fetch(
        "http://localhost:3000/tasks/planned/api"
      );

      const plannedTasksPageResponseData =
        await plannedTasksPageResponse.json();

      dispatch(setPlannedTasks(plannedTasksPageResponseData?.tasks.data));
      dispatch(setLists(plannedTasksPageResponseData?.lists));
      dispatch(setGroups(plannedTasksPageResponseData?.groups));

      dispatch(setListsLoading(false));

      if (plannedTasksPageResponseData?.accessToken) {
        localStorage.setItem(
          "accessToken",
          plannedTasksPageResponseData.accessToken
        );
      }
    })();
  }, []);

  const grouppedTasks = getGrouppedTasks(filteredPlannedTasks);

  return (
    <StyledTaskSection $isViewVisible={isTabbedViewVisible}>
      <TaskSectionInfoBar sectionType={SectionEnum.planned} />
      <AddTaskButton />

      {isTasksLoading ? (
        <TaskSkeletonsSection />
      ) : (
        <>
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

          {!!searchValue.length && !filteredPlannedTasks.length && (
            <EmptySearchCard />
          )}
        </>
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
