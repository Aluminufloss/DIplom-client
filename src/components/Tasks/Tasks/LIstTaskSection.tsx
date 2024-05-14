"use client";

import React from "react";
import styled from "styled-components";

import { SectionEnum } from "./models";
import { GroupType, TasksListType } from "@/models";
import { useAppSelector } from "@/utils/hooks/useAppSelector";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import getGrouppedTasks from "./utils/getGrouppedTasks";
import { setLists } from "@/store/slices/Lists";

import TaskItem from "./TaskItem";
import TaskSectionInfoBar from "./TaskSectionInfoBar";
import AddTaskButton from "./AddTaskButton";
import TaskSection from "@/components/UI/TaskSection";
import { setGroups } from "@/store/slices/Groups";

type PropsType = {
  listId: string;
  listName: string;
  groups: GroupType[];
  lists: TasksListType[];
};

export const ListTaskSection: React.FC<PropsType> = (props) => {
  const isTabbedViewVisible = useAppSelector(
    (state) => state.tabbedSidebar.isViewVisible
  );

  const listInfo = useAppSelector((state) => state.lists);
  const listTasks = listInfo.lists.find((list) => list.listId === props.listId);

  const grouppedTasks = getGrouppedTasks(listTasks?.tasks);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    (async () => {
      dispatch(setGroups(props.groups));
      dispatch(setLists(props.lists));
    })();
  }, [props.lists, props.groups]);

  return (
    <StyledTaskSection $isViewVisible={isTabbedViewVisible}>
      <TaskSectionInfoBar
        sectionType={SectionEnum.list}
        listName={props.listName}
      />
      <AddTaskButton />

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

export default ListTaskSection;
