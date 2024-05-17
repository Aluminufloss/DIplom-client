"use client";

import React from "react";
import styled from "styled-components";
import { useParams } from "next/navigation";

import { SectionEnum } from "./models";
import { useAppSelector } from "@/utils/hooks/useAppSelector";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import getGrouppedTasks from "./utils/getGrouppedTasks";

import { setLists, setListsLoading } from "@/store/slices/Lists";
import { setGroups } from "@/store/slices/Groups";
import { openSnackbar } from "@/store/slices/Snackbar";

import TaskItem from "./TaskItem";
import AddTaskButton from "./AddTaskButton";
import TaskSectionInfoBar from "./TaskSectionInfoBar";
import TaskSection from "@/components/UI/TaskSection";
import EmptySearchCard from "@/components/UI/EmptySearchCard";
import TaskSkeletonsSection from "@/components/UI/Skeletons/Task/TaskSkeletonsSection";

export const ListTaskSection: React.FC = () => {
  const urlParams = useParams() as { slug: string };
  const searchValue: string = useAppSelector(
    (state) => state.tasks.searchValue
  );
  const isTabbedViewVisible = useAppSelector(
    (state) => state.tabbedSidebar.isViewVisible
  );

  const listInfo = useAppSelector((state) => state.lists);
  const isTasksLoading = useAppSelector((state) => state.lists.isLoading);
  const currentList = listInfo.lists.find(
    (list) => list.listId === urlParams.slug
  );
  const grouppedTasks = getGrouppedTasks(
    currentList?.tasks.filter((task) => {
      return task.title.toLowerCase().startsWith(searchValue.toLowerCase());
    })
  );

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    (async () => {
      dispatch(setListsLoading(true));

      const listsPageResponse = await fetch(
        `http://localhost:3000/tasks/list/${urlParams.slug}/api`
      );

      if (listsPageResponse.status === 404) {
        dispatch(
          openSnackbar({
            title: "Список не найден",
            message: "Список не найден. Переход на главную страницу",
            type: "error",
          })
        );
      }

      const listsPageData = await listsPageResponse.json();

      dispatch(setGroups(listsPageData?.groups));
      dispatch(setLists(listsPageData?.lists));

      dispatch(setListsLoading(false));

      if (listsPageData?.accessToken) {
        localStorage.setItem("accessToken", listsPageData.accessToken);
      }
    })();
  }, [urlParams.slug]);

  return (
    <StyledTaskSection $isViewVisible={isTabbedViewVisible}>
      <TaskSectionInfoBar
        sectionType={SectionEnum.list}
        listName={currentList?.title}
      />
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

          {!!grouppedTasks?.planned.length && (
            <TaskSection
              sectionTitle="Запланированные задачи"
              tasks={grouppedTasks.planned}
            />
          )}

          {!!grouppedTasks?.expired.length && (
            <TaskSection
              sectionTitle="Просроченные задачи"
              tasks={grouppedTasks.expired}
            />
          )}

          {!!searchValue.length && !currentList?.tasks.length && (
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

export default ListTaskSection;
