"use client";

import React from "react";
import styled from "styled-components";

import { SectionEnum } from "./models";
import { TasksListType } from "@/models";
import { useAppSelector } from "@/utils/hooks/useAppSelector";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { setLists } from "@/store/slices/Lists";

import TaskItem from "./TaskItem";
import TaskSectionInfoBar from "./TaskSectionInfoBar";
import AddTaskButton from "./AddTaskButton";
import getGrouppedTasks from "./utils/getGrouppedTasks";

type PropsType = {
  listId: string;
  listName: string;
  lists: TasksListType[];
};

export const ListTaskSection: React.FC<PropsType> = (props) => {
  const isTabbedViewVisible = useAppSelector(
    (state) => state.tabbedSidebar.isViewVisible
  );

  const listTasks = useAppSelector((state) =>
    state.lists.lists.find((item) => item.listId === props.listId)
  );
  const grouppedTasks = getGrouppedTasks(listTasks?.tasks);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    (async () => {
      dispatch(setLists(props.lists));
    })();
  }, [props.lists]);

  return (
    <StyledTaskSection $isViewVisible={isTabbedViewVisible}>
      <TaskSectionInfoBar
        sectionType={SectionEnum.list}
        listName={props.listName}
      />

      {!!grouppedTasks?.active.length &&
        grouppedTasks.active.map((task) => {
          return <TaskItem key={task.taskId} task={task} />;
        })}

      <AddTaskButton />

      {!!grouppedTasks?.completed.length && (
        <>
          <div className="group-separator">Завершённые задачи</div>
          {grouppedTasks.completed.map((task) => {
            return <TaskItem key={task.taskId} task={task} />;
          })}
        </>
      )}

      {!!grouppedTasks?.expired.length && (
        <>
          <div className="group-separator">Просроченные задачи</div>
          {grouppedTasks.expired.map((task) => {
            return <TaskItem key={task.taskId} task={task} />;
          })}
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
