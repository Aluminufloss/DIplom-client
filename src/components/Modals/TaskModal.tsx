import React from "react";
import styled from "styled-components";

import { useAppSelector } from "@/utils/hooks/useAppSelector";
import ModalHeader from "../ModalHeader";
import Input from "../UI/input";
import { Form, Formik } from "formik";
import PrioritySelector from "../TaskModalSelectors/PrioritySelector";
import RepeatSelector from "../TaskModalSelectors/RepeatSelector";
import PlannedDateSelector from "../TaskModalSelectors/PlannedDateSelector";

type ParamsType = {};

const TaskModal: React.FC<ParamsType> = (props) => {
  const modalInfo = useAppSelector((state) => state.taskModal);

  return (
    <>
      <Formik initialValues={modalInfo.modalParams} onSubmit={() => {}}>
        {({ values, handleChange }) => (
          <StyledModal $isModalVisible={modalInfo.isModalVisible}>
            <ModalHeader modalType={modalInfo.modalParams.modalType} />
            <div className="modal__content">
              <Input
                value={values.taskName}
                onChange={handleChange}
                name="taskName"
                placeholder="Введите название задачи"
                className="modal__input"
              />
              <textarea
                placeholder="Добавьте описание задачи"
                name="taskDescription"
                className="modal__textarea"
              />
              <PrioritySelector className="modal__priority" />
              <RepeatSelector
                className="modal__repeat"
                selectedDays={modalInfo.modalParams.repeatDays.days}
              />
              <PlannedDateSelector className="modal__date" />
            </div>
          </StyledModal>
        )}
      </Formik>
    </>
  );
};

const StyledModal = styled(Form)<{ $isModalVisible: boolean }>`
  position: absolute;
  bottom: ${(props) => (props.$isModalVisible ? "0" : "0")};
  right: 50%;
  transform: translateX(50%);

  z-index: 300;

  transition: all 0.5s ease;

  width: 100%;
  max-width: 720px;

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
    &__date {
      margin-bottom: 20px;
    }

    &__textarea {
      ${(props) => props.theme.typography.fnMedium};
      ${(props) => props.theme.typography.fnLabel2};

      width: 100%;
      height: 120px;

      resize: none;

      padding: 12px 16px;
      margin-bottom: 20px;

      border: 1px solid ${(props) => props.theme.colorValues.lightGrey};

      &::placeholder {
        color: ${(props) => props.theme.colorValues.darkGrey};
      }
    }
  }
`;

export default TaskModal;
