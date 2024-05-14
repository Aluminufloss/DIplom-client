"use client";

import React from "react";
import styled from "styled-components";
import classNames from "classnames";

import { STATIC_URLS } from "@/utils/constant";
import { ITask } from "@/api/models/Response/Tasks/ITask";

import ReusableImage from "../image";
import TaskItem from "@/components/Tasks/Tasks/TaskItem";

type ParamsType = {
  sectionTitle?: string;
  tasks?: ITask[];
};

const TaskSection: React.FC<ParamsType> = (props) => {
  const [isTasksVisible, setIsTasksVisible] = React.useState(true);

  return (
    <StyledTaskSection $isTasksVisible={isTasksVisible}>
      <div
        className="group-separator"
        onClick={() => setIsTasksVisible(!isTasksVisible)}
      >
        {props.sectionTitle}
        <ReusableImage
          width={24}
          height={24}
          src={`${STATIC_URLS.SVG_ICONS}/chevron.svg`}
          alt="Arrow icon"
          className={classNames("icon", !isTasksVisible && "icon--closed")}
        />
      </div>
      <div className={classNames("tasks", !isTasksVisible && "tasks--closed")}>
        {isTasksVisible &&
          props.tasks?.map((task) => {
            return <TaskItem key={task.taskId} task={task} />;
          })}
      </div>
    </StyledTaskSection>
  );
};

const StyledTaskSection = styled.div<{ $isTasksVisible: boolean }>`
  position: relative;
  user-select: none;

  overflow-y: hidden;

  .group-separator {
    ${(props) => props.theme.typography.fnTitle2}
    ${(props) => props.theme.typography.fnMedium};
    color: ${(props) => props.theme.colorValues.primary};

    position: relative;
    z-index: 10;

    width: 100%;

    margin-bottom: 20px;

    display: flex;
    align-items: flex-end;

    padding: 12px 16px;

    background-color: ${(props) => props.theme.colorValues.sidebarWhite};

    border: 1px solid ${(props) => props.theme.colorValues.lightGrey};
    border-radius: 5px;

    cursor: pointer;
  }

  .icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 16px;

    transform: rotate(90deg) translateX(-50%);

    transition: transform 0.3s ease;

    &--closed {
      transform: rotate(0deg) translateY(-50%);
    }
  }

  .tasks {
    position: ${props => props.$isTasksVisible ? 'relative' : 'absolute'};
    bottom: ${props => props.$isTasksVisible ? '0' : '78px'};
    left: 0;
    z-index: 10;

    width: 100%;

    visibility: visible;
    opacity: 1;

    transition: all 0.3s ease;

    &--closed {
      z-index: -1;
      opacity: 0;
      visibility: hidden;
    }
  }
`;

export default TaskSection;
