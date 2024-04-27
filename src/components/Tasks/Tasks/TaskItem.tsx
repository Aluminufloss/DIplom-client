"use client";

import React from "react";
import styled from "styled-components";
import { format } from "date-fns/format";


import { isDatesEqual } from "@/utils/dateUtils";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { ITask } from "@/api/models/Response/Tasks/ITask";
import { changeTaskStatus } from "@/store/slices/Tasks/thunks";

type PropsType = {
  task: ITask;
};

export const TaskItem: React.FC<PropsType> = (props) => {
  const dispatch = useAppDispatch();

  const handleChangeTaskStatus = React.useCallback(() => {
    const changedTaskStatus =
      props.task.status === "active" ? "completed" : "active";
    dispatch(
      changeTaskStatus({ taskId: props.task.taskId, status: changedTaskStatus })
    );
  }, [props.task.taskId, props.task.status]);

  const handleOpenTaskModal = React.useCallback(() => {
    // const modalParams: ModalParamsType = {
    //   modalType: "edit",
    //   taskName: props.task.title,
    //   taskDescription: props.task.description,
    //   priority: props.task.priority,
    //   plannedDate: props.task.plannedDate,
    //   repeatDays: props.task.repeatDays,
    //   selectedList: SelectedListType;
    //   selectedCategory?: SelectedCategoryType;
    // }
    // dispatch(setModalParams());
  }, []);

  const isToday = isDatesEqual(props.task.plannedDate, new Date());

  return (
    <>
      <StyledTaskItem onClick={handleOpenTaskModal} id="datepicker">
        <input
          onClick={handleChangeTaskStatus}
          type="checkbox"
          className="task__checkbox"
          checked={props.task.status === "completed"}
          readOnly
        />
        <p className="task__text">{props.task.title}</p>
        {!isToday && (
          <>
            <span className="task__separator">|</span>
            <p className="task__date">
              {format(props.task.plannedDate, "dd.MM.yyyy")}
            </p>
          </>
        )}
      </StyledTaskItem>
    </>
  );
};

const StyledTaskItem = styled.div`
  width: 100%;

  margin-bottom: 20px;

  display: flex;
  align-items: center;

  padding: 16px 20px;

  background-color: ${(props) => props.theme.colorValues.white};

  border: 1px solid ${(props) => props.theme.colorValues.lightGrey};
  border-radius: 5px;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colorValues.strokeGrey};
  }

  input[type="checkbox"] {
    position: relative;

    appearance: none;

    display: flex;
    align-content: center;
    justify-content: center;

    width: 24px;
    height: 24px;
  }

  input[type="checkbox"]::before {
    content: "";

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: ${(props) => props.theme.colorValues.primary};

    transition: all 0.1s ease;
    transform: scale(0);
  }

  input[type="checkbox"]:checked::before {
    transform: scale(1);
  }

  .task {
    &__checkbox {
      width: 24px;
      height: 24px;

      overflow: hidden;

      border-radius: 5px;
      border: 2px solid ${(props) => props.theme.colorValues.darkGrey};
    }

    &__text {
      ${(props) => props.theme.typography.fnTitle1}
      ${(props) => props.theme.typography.fnSemiBold};
      color: ${(props) => props.theme.colorValues.black};

      margin-left: 16px;
    }

    &__separator {
      color: ${(props) => props.theme.colorValues.darkGrey};

      margin: 0 5px;
    }

    &__date {
      ${(props) => props.theme.typography.fnTitle2}
      ${(props) => props.theme.typography.fnMedium};
      color: ${(props) => props.theme.colorValues.grey};
    }
  }
`;

export default TaskItem;
