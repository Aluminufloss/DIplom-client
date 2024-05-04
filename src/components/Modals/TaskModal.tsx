"use client";

import React from "react";
import styled from "styled-components";
import { Form, Formik } from "formik";
import axios from "axios";

import { useAppSelector } from "@/utils/hooks/useAppSelector";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";

import { setModalVisibility } from "@/store/slices/TaskModal";
import { ModalParamsType } from "@/store/slices/TaskModal/models";

import Input from "../UI/input";
import ModalHeader from "../ModalHeader";
import PrioritySelector from "../TaskModalSelectors/PrioritySelector";
import RepeatSelector from "../TaskModalSelectors/RepeatSelector";
import PlannedDateSelector from "../TaskModalSelectors/PlannedDateSelector";
import ListSelector from "../TaskModalSelectors/ListSelector";
import CategorySelector from "../TaskModalSelectors/CategorySelector";
import { createTask, deleteTask, updateTask } from "@/store/slices/Tasks/thunks";
import PrimaryButton from "../UI/buttons/PrimaryButton";

const TaskModal: React.FC = () => {
  const [error, setError] = React.useState("");
  const modalInfo = useAppSelector((state) => state.taskModal);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (modalInfo.isModalVisible) {
      document.body.style.position = "fixed";
      return;
    }

    document.body.style.position = "relative";
  }, [modalInfo.isModalVisible]);

  const handleModalSubmit = React.useCallback(
    async (values: ModalParamsType) => {
      try {
        setError("");

        if (values.modalType === "create") {
          dispatch(createTask(values.taskInfo));
          return;
        }

        dispatch(updateTask(values.taskInfo));
      } catch (err) {
        if (axios.isAxiosError(err) && err.response && err.response.data) {
          setError(err.response.data.message);
        } else {
          console.warn("Возникал ошибкка:", err);
        }
      }
    },
    []
  );

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={modalInfo.modalParams}
        onSubmit={handleModalSubmit}
      >
        {({ values, handleChange, setFieldValue }) => (
          <StyledModal $isModalVisible={modalInfo.isModalVisible}>
            <ModalHeader modalType={modalInfo.modalParams.modalType} />
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
                className="modal__repeat"
                selectedDays={values.taskInfo.repeatDays}
              />
              <PlannedDateSelector
                name="taskInfo.plannedDate"
                value={values.taskInfo.plannedDate}
                setFieldValue={setFieldValue}
                className="modal__planned"
              />
              <ListSelector className="modal__list" />
              <CategorySelector className="modal__category" />
              {modalInfo.modalParams.modalType === "edit" && (
                <PrimaryButton
                  type="submit"
                  className="modal__button"
                  onClick={() => {
                    dispatch(deleteTask(values.taskInfo.taskId))
                    dispatch(setModalVisibility(false))
                  }}
                  title="Удалить задачу"
                />
              )}
            </div>
          </StyledModal>
        )}
      </Formik>
      {modalInfo.isModalVisible && (
        <StyledOverlay onClick={() => dispatch(setModalVisibility(false))} />
      )}
    </>
  );
};

const StyledModal = styled(Form)<{ $isModalVisible: boolean }>`
  position: absolute;
  top: ${(props) => (props.$isModalVisible ? "5%" : "-100vh")};
  right: 50%;
  transform: translateX(50%);

  width: 100%;
  max-width: 840px;
  max-height: 90vh;

  z-index: 300;

  transition: all 0.5s ease;

  & {
    -ms-overflow-style: none;
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
