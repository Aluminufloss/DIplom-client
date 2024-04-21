import React from "react";
import styled from "styled-components";

import { ModalType } from "@/store/slices/TaskModal/models";

import SaveChangesButton from "./SaveChangesButton";
import CancelChangesButton from "./CancelChangesButton";

type PropsType = {
  modalType: ModalType;
};

const ModalHeader: React.FC<PropsType> = (props) => {
  const modalTitle = React.useMemo(() => {
    return props.modalType === "create"
      ? "Создание новой задачи"
      : "Редактирование задачи";
  }, [props.modalType]);

  return (
    <StyledHeader>
      <CancelChangesButton onCancelChanges={() => {}}/>
      <p className="title">{modalTitle}</p>
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
