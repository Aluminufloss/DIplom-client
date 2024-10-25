"use client";

import React from "react";
import styled from "styled-components";

import { SectionEnum } from "./models";
import { useAppSelector } from "@/utils/hooks/useAppSelector";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import getGrouppedTasks from "./utils/getGrouppedTasks";

import { ITask } from "@/api/models/Response/Tasks/ITask";

import { setTodayTasks } from "@/store/slices/Tasks";
import { setGroups } from "@/store/slices/Groups";
import { setLists, setListsLoading } from "@/store/slices/Lists";

import TaskItem from "./TaskItem";
import TaskSectionInfoBar from "./TaskSectionInfoBar";
import AddTaskButton from "./AddTaskButton";
import TaskSection from "@/components/UI/TaskSection";
import EmptySearchCard from "@/components/UI/EmptySearchCard";
import TaskSkeletonsSection from "@/components/UI/Skeletons/Task/TaskSkeletonsSection";

export const TodayTasksSection: React.FC = () => {
  const isTabbedViewVisible = useAppSelector(
    (state) => state.tabbedSidebar.isViewVisible
  );

  const searchValue: string = useAppSelector(
    (state) => state.tasks.searchValue
  );
  const isTasksLoading = useAppSelector((state) => state.lists.isLoading);
  const todayTasks: ITask[] = useAppSelector((state) => state.tasks.todayTasks);
  console.log("todayTasks", todayTasks);
  const filteredTodayTasks: ITask[] = todayTasks?.filter((task) => {
    return task.title.toLowerCase().startsWith(searchValue.toLowerCase());
  });
  const grouppedTasks = getGrouppedTasks(filteredTodayTasks);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    (async () => {
      dispatch(setListsLoading(true));

      const todayTasksPageResponse = await fetch(
        "http://localhost:3000/tasks/today/api"
      );

      const todayTasksPageResponseData = await todayTasksPageResponse.json();

      dispatch(setTodayTasks(todayTasksPageResponseData?.tasks.data ?? []));
      dispatch(setLists(todayTasksPageResponseData?.lists ?? []));
      dispatch(setGroups(todayTasksPageResponseData?.groups ?? []));

      dispatch(setListsLoading(false));

      if (todayTasksPageResponseData?.accessToken) {
        localStorage.setItem(
          "accessToken",
          todayTasksPageResponseData.accessToken
        );
      }
    })();
  }, []);

  return (
    <StyledTaskSection $isViewVisible={isTabbedViewVisible}>
      <TaskSectionInfoBar sectionType={SectionEnum.today} />
      <AddTaskButton />
      
      {isTasksLoading ? (
        <TaskSkeletonsSection />
      ) : (
        <>
          {!!grouppedTasks?.active.length &&
            grouppedTasks.active.map((task) => {
              return <TaskItem key={task.taskId} task={task} />;
            })}

          {!!grouppedTasks?.completed.length && (
            <TaskSection
              sectionTitle="Завершённые задачи"
              tasks={grouppedTasks.completed}
            />
          )}

          {!!searchValue.length && !filteredTodayTasks.length && (
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
`;

export default TodayTasksSection;
