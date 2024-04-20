import React from "react";
import styled from "styled-components";
import Input from "../UI/input";

type ParamsType = {
  modalType: "create" | "update",
}

const TaskModal: React.FC<ParamsType> = (props) => {
  const modalTitle = React.useMemo(() => {
    return props.modalType === "create" ? "Создание задачи" : "Корректировка задачи";
  }, [props.modalType]);

  return (
    <StyledModal>
      <p className="modal__title">
        {modalTitle}
      </p>

      <Input />
      <textarea />
    </StyledModal>
  )
};

const StyledModal = styled.div`
  position: absolute;

  .modal {
    &__title {
      ${(props) => props.theme.typography.fnSemiBold};
      ${(props) => props.theme.typography.fnTitle5};
      color: ${(props) => props.theme.colorValues.black};

      margin-bottom: 20px;
    }


  }

`;

export default TaskModal;