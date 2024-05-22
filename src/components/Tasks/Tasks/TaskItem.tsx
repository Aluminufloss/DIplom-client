"use client";

import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
import classNames from "classnames";

import { isDatesEqual } from "@/utils/dateUtils";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { ITask } from "@/api/models/Response/Tasks/ITask";
import { changeTaskStatus } from "@/store/slices/Tasks/thunks";
import { ModalParamsType } from "@/store/slices/TaskModal/models";
import { setModalParams } from "@/store/slices/TaskModal";
import { openSnackbar } from "@/store/slices/Snackbar";

type PropsType = {
  task: ITask;
};

const TASK_SOUND = new Audio("/sounds/task_complete_sound.mp3");

export const TaskItem: React.FC<PropsType> = (props) => {
  const dispatch = useAppDispatch();

  const handleChangeTaskStatus = React.useCallback(
    (ev: React.MouseEvent) => {
      TASK_SOUND.play();
      ev.stopPropagation();

      const changedTaskStatus =
        props.task.status === "active"
          ? "completed"
          : props.task.status === "expired"
          ? "completed"
          : "active";

      dispatch(
        changeTaskStatus({ task: props.task, status: changedTaskStatus })
      )
        .unwrap()
        .catch(() => {
          dispatch(
            openSnackbar({
              title: "Ошибка",
              message: "Что-то пошло не так при изменении статуса задачи",
              type: "error",
            })
          );
        });

      dispatch(
        openSnackbar({
          title: "Успешно",
          message: "Статус задачи успешно изменен",
          type: "success",
        })
      );
    },
    [props.task]
  );

  const handleOpenTaskModal = React.useCallback(() => {
    const modalParams: ModalParamsType = {
      modalType: "edit",
      taskInfo: props.task,
    };

    dispatch(setModalParams(modalParams));
  }, [props.task]);

  const isToday = isDatesEqual(new Date(props.task.plannedDate), new Date());

  return (
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
      <div
        className={classNames(
          "task__priority",
          `task__priority--${props.task.priority}`
        )}
      />
    </StyledTaskItem>
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

    &__priority {
      width: 18px;
      height: 18px;

      border-radius: 100px;

      margin-left: auto;
    }

    &:hover {
      &.task__priority {
        &--low {
          background-color: ${(props) => props.theme.colorValues.green};
        }

        &--medium {
          background-color: ${(props) => props.theme.colorValues.yellow};
        }

        &--high {
          background-color: ${(props) => props.theme.colorValues.redSecondary};
        }
      }
    }
  }
`;

export default TaskItem;
