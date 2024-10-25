import React from "react";
import styled from "styled-components";

import { ModalParamsType, ModalType } from "@/store/slices/TaskModal/models";

import SaveChangesButton from "./SaveChangesButton";
import CancelChangesButton from "./CancelChangesButton";
import { ITask } from "@/api/models/Response/Tasks/ITask";

type PropsType = {
  modalParams: ModalParamsType;
  modalType: ModalType;
  isDisabled: boolean;
  handleSaveChanges: (values: ModalParamsType) => void;
  handleCloseModal: (taskInfo: ITask) => void;
};

const ModalHeader: React.FC<PropsType> = (props) => {
  const modalTitle = React.useMemo(() => {
    return props.modalType === "create"
      ? "Создание новой задачи"
      : "Редактирование задачи";
  }, [props.modalType]);

  return (
    <StyledHeader>
      <CancelChangesButton
        isDisabled={props.isDisabled}
        onCancelChanges={() =>
          props.handleCloseModal(props.modalParams.taskInfo)
        }
      />
      <p className="title">{modalTitle}</p>
      <SaveChangesButton
        isDisabled={props.isDisabled}
        onSaveChanges={() => props.handleSaveChanges(props.modalParams)}
      />
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  width: 100%;

  position: relative;

  padding: 12px 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 1px solid ${(props) => props.theme.colorValues.grey};

  .title {
    ${(props) => props.theme.typography.fnSemiBold};
    ${(props) => props.theme.typography.fnTitle3};
    color: ${(props) => props.theme.colorValues.black};
  }
`;

export default ModalHeader;
