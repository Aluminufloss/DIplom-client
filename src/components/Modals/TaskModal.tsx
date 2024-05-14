"use client";

import React from "react";
import styled, { useTheme } from "styled-components";
import { Form, Formik } from "formik";

import { useAppSelector } from "@/utils/hooks/useAppSelector";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { compareModalParamsWithInitial } from "@/utils/compareModalParamsWithInitial";

import { resetModalState } from "@/store/slices/TaskModal";
import { ModalParamsType } from "@/store/slices/TaskModal/models";
import { openSnackbar } from "@/store/slices/Snackbar";
import {
  createTask,
  deleteTask,
  updateTask,
} from "@/store/slices/Tasks/thunks";

import { ITask } from "@/api/models/Response/Tasks/ITask";

import Input from "../UI/input";
import ModalHeader from "../ModalHeader";
import PrioritySelector from "../TaskModalSelectors/PrioritySelector";
import RepeatSelector from "../TaskModalSelectors/RepeatSelector";
import PlannedDateSelector from "../TaskModalSelectors/PlannedDateSelector";
import ListSelector from "../TaskModalSelectors/ListSelector";
import CategorySelector from "../TaskModalSelectors/CategorySelector";
import PrimaryButton from "../UI/buttons/PrimaryButton";
import TaskModalActionButtons from "../TaskModalActionButtons";

const TaskModal: React.FC = () => {
  const modalInfo = useAppSelector((state) => state.taskModal);
  const [isActionsModalVisible, setIsActionsModalVisible] =
    React.useState(false);
  const [actionsModalType, setActionsModalType] = React.useState<
    "deleting" | "editing"
  >("editing");

  const initialParamsRef = React.useRef<ModalParamsType | null>(null);

  const dispatch = useAppDispatch();

  const theme = useTheme();

  React.useEffect(() => {
    if (modalInfo.isModalVisible) {
      document.body.style.position = "fixed";
    }

    initialParamsRef.current = modalInfo.modalParams;

    return () => {
      document.body.style.position = "relative";
    };
  }, [modalInfo.isModalVisible, modalInfo.modalParams.taskInfo]);

  const handleModalSubmit = React.useCallback(
    async (values: ModalParamsType) => {
      if (!initialParamsRef.current) {
        return;
      }

      if (compareModalParamsWithInitial(values.taskInfo, initialParamsRef.current.taskInfo)) {
        dispatch(resetModalState());
        return;
      }

      if (values.modalType === "create") {
        if (!values.taskInfo.title.length) {
          dispatch(
            openSnackbar({
              title: "Ошибка",
              message: "Название задачи не может быть пустым",
              type: "error",
            })
          );

          return;
        }

        dispatch(createTask(values.taskInfo))
          .unwrap()
          .catch((err) => {
            dispatch(
              openSnackbar({
                title: "Ошибка",
                message: err.message,
                type: "error",
              })
            );
          });
      } else {
        dispatch(updateTask(values.taskInfo))
          .unwrap()
          .catch((err) => {
            dispatch(
              openSnackbar({
                title: "Ошибка",
                message: err.message,
                type: "error",
              })
            );
          });
      }

      dispatch(
        openSnackbar({
          title: "Успешно",
          message:
            values.modalType === "create"
              ? "Задача успешо создана"
              : "Задача успешно обновлена",
          type: "success",
        })
      );

      setIsActionsModalVisible(false);

      dispatch(resetModalState());
    },
    []
  );

  const handleCloseModal = React.useCallback(
    (taskInfo: ITask) => {
      if (!initialParamsRef.current) {
        return;
      }

      const isEqual = compareModalParamsWithInitial(
        taskInfo,
        initialParamsRef.current.taskInfo
      );

      if (!isEqual) {
        setIsActionsModalVisible(true);
        setActionsModalType("editing");
        return;
      }

      dispatch(resetModalState());
    },
    [compareModalParamsWithInitial]
  );

  const onClickOnOverlay = React.useCallback(
    (taskInfo: ITask) => {
      handleCloseModal(taskInfo);
    },
    [handleCloseModal]
  );

  const onClickDeleteButton = React.useCallback(() => {
    setActionsModalType("deleting");
    setIsActionsModalVisible(true);
  }, []);

  const onExitAction = React.useCallback(() => {
    dispatch(resetModalState());
    setIsActionsModalVisible(false);
  }, []);

  const handleDeleteTask = React.useCallback(() => {
    dispatch(
      deleteTask({
        taskId: modalInfo.modalParams.taskInfo.taskId,
        listId: modalInfo.modalParams.taskInfo.listId?.[2],
      })
    )
      .unwrap()
      .catch((err) => {
        dispatch(
          openSnackbar({
            title: "Ошибка",
            message: err.message,
            type: "error",
          })
        );
      });

    dispatch(
      openSnackbar({
        title: "Успешно",
        message: "Задача успешно удалена",
        type: "success",
      })
    );
    setIsActionsModalVisible(false);
  }, [modalInfo.modalParams.taskInfo.taskId]);

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={modalInfo.modalParams}
        onSubmit={handleModalSubmit}
      >
        {({ values, handleChange, setFieldValue, handleReset }) => (
          <>
            <StyledModal
              $isModalVisible={modalInfo.isModalVisible}
              $isActionsModalVisible={isActionsModalVisible}
            >
              <ModalHeader
                modalType={values.modalType}
                modalParams={values}
                handleSaveChanges={handleModalSubmit}
                handleCloseModal={handleCloseModal}
              />
              <div className="modal__content">
                <Input
                  value={values.taskInfo.title}
                  onChange={handleChange}
                  name="taskInfo.title"
                  placeholder="Введите название задачи"
                  className="modal__input"
                />
                <textarea
                  name="taskInfo.description"
                  placeholder="Добавьте описание задачи"
                  value={values.taskInfo.description}
                  onChange={handleChange}
                  className="modal__textarea"
                />
                <PrioritySelector
                  name="taskInfo.priority"
                  setFieldValue={setFieldValue}
                  className="modal__priority"
                  currentPriority={values.taskInfo.priority}
                />
                <RepeatSelector
                  name="taskInfo.repeatDays"
                  setFieldValue={setFieldValue}
                  modalType={values.modalType}
                  className="modal__repeat"
                  selectedDays={values.taskInfo.repeatDays}
                />
                <PlannedDateSelector
                  name="taskInfo.plannedDate"
                  value={values.taskInfo.plannedDate}
                  setFieldValue={setFieldValue}
                  shouldDisablePast={values.modalType === "create"}
                  className="modal__planned"
                />
                <ListSelector
                  className="modal__list"
                  setFieldValue={setFieldValue}
                  value={values.taskInfo.listId?.[0]}
                />
                <CategorySelector
                  setFieldValue={setFieldValue}
                  value={values.taskInfo.category}
                  className="modal__category"
                />
                {modalInfo.modalParams.modalType === "edit" && (
                  <PrimaryButton
                    type="button"
                    className="modal__button"
                    onClick={onClickDeleteButton}
                    color={theme.colorValues.redSecondary}
                    hoverColor={theme.colorValues.redHover}
                    title="Удалить задачу"
                  />
                )}
              </div>
              <div className="modal__actions-overlay" />
              <TaskModalActionButtons
                actionType={actionsModalType}
                cancelAction={() => setIsActionsModalVisible(false)}
                deleteAction={handleDeleteTask}
                exitAction={() => {
                  onExitAction();
                  handleReset();
                }}
                isVisible={isActionsModalVisible}
              />
            </StyledModal>
            {modalInfo.isModalVisible && (
              <StyledOverlay
                onClick={() => onClickOnOverlay(values.taskInfo)}
              />
            )}
          </>
        )}
      </Formik>
    </>
  );
};

const StyledModal = styled(Form)<{
  $isModalVisible: boolean;
  $isActionsModalVisible?: boolean;
}>`
  position: absolute;
  top: ${(props) => (props.$isModalVisible ? "3%" : "-100vh")};
  right: 50%;
  transform: translateX(50%);

  width: 100%;
  max-width: 840px;
  max-height: 90vh;

  z-index: 300;

  transition: all 0.5s ease;

  & {
    -ms-overflow-style: none;
    overflow-x: hidden;
    scrollbar-width: none;
    overflow-y: scroll;
  }
  &::-webkit-scrollbar {
    display: none;
  }

  background-color: white;

  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colorValues.lightGrey};

  .modal {
    &__content {
      padding: 20px 24px;
    }

    &__input,
    &__priority,
    &__repeat,
    &__date,
    &__list,
    &__planned,
    &__category {
      margin-bottom: 20px;
    }

    &__input {
      ${(props) => props.theme.typography.fnLabel2};
    }

    &__textarea {
      ${(props) => props.theme.typography.fnMedium};
      ${(props) => props.theme.typography.fnLabel2};

      width: 100%;
      height: 120px;

      resize: none;
      overflow: scroll;

      &::-webkit-scrollbar {
        width: 0;
      }

      padding: 12px 16px;
      margin-bottom: 20px;

      border: 1px solid ${(props) => props.theme.colorValues.lightGrey};
      border-radius: 5px;

      &::placeholder {
        color: ${(props) => props.theme.colorValues.darkGrey};
      }
    }

    &__button {
      margin: 40px auto 0;
    }

    &__actions-overlay {
      display: ${(props) => (props.$isActionsModalVisible ? "block" : "none")};

      width: 100%;
      height: 100%;

      position: absolute;
      top: 0;
      left: 0;

      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

const StyledOverlay = styled.div`
  position: absolute;

  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  z-index: 200;

  background-color: rgba(0, 0, 0, 0.5);

  transition: opacity 1s ease;
`;

export default TaskModal;
