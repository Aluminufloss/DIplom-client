"use client";

import React from "react";
import styled from "styled-components";

import { SectionEnum } from "./models";
import { TasksServerResponseType } from "@/models";
import { useAppSelector } from "@/utils/hooks/useAppSelector";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";

import { setTodayTasks } from "@/store/slices/Tasks";

import TaskItem from "./TaskItem";
import TaskSectionInfoBar from "./TaskSectionInfoBar";
import AddTaskButton from "./AddTaskButton";
import getGrouppedTasks, {
} from "./utils/getGrouppedTasks";

type PropsType = {
  getTasks: () => Promise<TasksServerResponseType | undefined>;
};

export const TodayTasksSection: React.FC<PropsType> = (props) => {
  const isTabbedViewVisible = useAppSelector(
    (state) => state.tabbedSidebar.isViewVisible
  );
  const todayTasks = useAppSelector((state) => state.tasks.todayTasks);
  const grouppedTasks = getGrouppedTasks(todayTasks);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    (async () => {
      const response = await props.getTasks();
      dispatch(setTodayTasks(response?.data));
    })();
  }, []);

  return (
    <StyledTaskSection $isViewVisible={isTabbedViewVisible}>
      <TaskSectionInfoBar sectionType={SectionEnum.today} />

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
  height: 100%;

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

export default TodayTasksSection;
