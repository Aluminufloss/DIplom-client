"use client";

import React from "react";
import styled from "styled-components";

import { SectionEnum } from "./models";
import { useAppSelector } from "@/utils/hooks/useAppSelector";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import getGrouppedTasks from "./utils/getGrouppedTasks";

import { ITask } from "@/api/models/Response/Tasks/ITask";

import { setAllTasks } from "@/store/slices/Tasks";
import { setGroups } from "@/store/slices/Groups";
import { setLists, setListsLoading } from "@/store/slices/Lists";

import TaskItem from "./TaskItem";
import AddTaskButton from "./AddTaskButton";
import TaskSectionInfoBar from "./TaskSectionInfoBar";
import AllTasksListSection from "./AllTasksListSection";
import TaskSection from "@/components/UI/TaskSection";
import EmptySearchCard from "@/components/UI/EmptySearchCard";
import TaskSkeletonsSection from "@/components/UI/Skeletons/Task/TaskSkeletonsSection";

export const AllTasksSection: React.FC = () => {
  const isTabbedViewVisible = useAppSelector(
    (state) => state.tabbedSidebar.isViewVisible
  );

  const searchValue: string = useAppSelector(
    (state) => state.tasks.searchValue
  );
  const allTasks: ITask[] = useAppSelector((state) => state.tasks.allTasks);

  const filteredAllTasks: ITask[] = allTasks.filter((task) => {
    return task.title.toLowerCase().startsWith(searchValue.toLowerCase());
  });

  const listInfo = useAppSelector((state) => state.lists);
  const isTasksLoading = useAppSelector((state) => state.lists.isLoading);

  const grouppedTasks = getGrouppedTasks(filteredAllTasks);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    (async () => {
      dispatch(setListsLoading(true));

      const allTasksPageResponse = await fetch(
        "http://localhost:3000/tasks/all/api"
      );

      const allTasksPageData = await allTasksPageResponse.json();

      dispatch(setGroups(allTasksPageData?.groups));
      dispatch(setAllTasks(allTasksPageData?.tasks.data));
      dispatch(setLists(allTasksPageData?.lists));

      dispatch(setListsLoading(false));

      if (allTasksPageData?.accessToken) {
        localStorage.setItem("accessToken", allTasksPageData.accessToken);
      }
    })();
  }, []);

  return (
    <StyledTaskSection $isViewVisible={isTabbedViewVisible}>
      <TaskSectionInfoBar sectionType={SectionEnum.tasks} />
      <AddTaskButton />

      {isTasksLoading ? (
        <TaskSkeletonsSection />
      ) : (
        <>
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

          {!!listInfo.lists.length && (
            <AllTasksListSection lists={listInfo.lists} />
          )}

          {!!searchValue.length && !filteredAllTasks.length && (
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

export default AllTasksSection;
