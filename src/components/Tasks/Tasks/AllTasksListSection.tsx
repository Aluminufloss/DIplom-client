"use client";

import React from "react";
import styled from "styled-components";

import { SectionEnum } from "./models";
import { TasksListType } from "@/models";
import getGrouppedTasks from "./utils/getGrouppedTasks";

import TaskItem from "./TaskItem";
import TaskSectionInfoBar from "./TaskSectionInfoBar";
import TaskSection from "@/components/UI/TaskSection";

type PropsType = {
  lists?: TasksListType[];
};

export const AllTasksListSection: React.FC<PropsType> = (props) => {
  return props.lists?.map((list) => {
    const grouppedTasks = getGrouppedTasks(list.tasks);

    return !!list.tasks.length ? (
      <StyledTaskSection>
        <TaskSectionInfoBar
          sectionType={SectionEnum.list}
          listName={list.title}
          isInsideAllTasks
        />

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
      </StyledTaskSection>
    ) : null;
  });
};

const StyledTaskSection = styled.div`
  width: 100%;

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

export default AllTasksListSection;
