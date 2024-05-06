"use client";

import React from "react";
import styled, { useTheme } from "styled-components";

import PrimaryButton from "../UI/buttons/PrimaryButton";

type PropsType = {
  isVisible: boolean;
  actionType: "deleting" | "editing";
  cancelAction: () => void;
  deleteAction?: () => void;
  exitAction?: () => void;
};

const TaskModalActionButtons: React.FC<PropsType> = (props) => {
  const theme = useTheme();

  const title = React.useMemo(() => {
    return props.actionType === "deleting"
      ? "Удаление задачи"
      : "Изменение задачи";
  }, [props.actionType]);

  const description = React.useMemo(() => {
    return props.actionType === "deleting"
      ? "Вы уверены, что хотите удалить данную задачу?"
      : "У вас остались несохраненные изменения. Вы уверены, что хотите выйти?";
  }, [props.actionType]);

  return (
    <StyledButtons $isVisible={props.isVisible}>
      <h4 className="title">{title}</h4>
      <p className="description">{description}</p>
      <div className="buttons__group">
        <PrimaryButton
          type="button"
          title={props.actionType === "deleting" ? "Отмена" : "Вернуться"}
          onClick={props.cancelAction}
          className="buttons__group--cancel"
        />
        <PrimaryButton
          title={props.actionType === "deleting" ? "Удалить" : "Не сохранять"}
          color={theme.colorValues.redSecondary}
          hoverColor={theme.colorValues.redHover}
          className="buttons__group--action"
          onClick={props.actionType === "deleting" ? props.deleteAction : props.exitAction}
          type="button"
        />
      </div>
    </StyledButtons>
  );
};

const StyledButtons = styled.div<{ $isVisible: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 300;

  width: 100%;

  padding: 16px 24px;

  border-top: 1px solid ${(props) => props.theme.colorValues.lightGrey};

  background-color: ${(props) => props.theme.colorValues.white};

  transition: transform 0.3s ease;

  transform: translate(${(props) => (props.$isVisible ? "0%" : "100%")});

  .title {
    ${(props) => props.theme.typography.fnTitle2};
    ${(props) => props.theme.typography.fnSemiBold};
    color: ${(props) => props.theme.colorValues.black};

    margin-bottom: 8px;
  }

  .description {
    ${(props) => props.theme.typography.fnTitle1};
    ${(props) => props.theme.typography.fnMedium};
    color: ${(props) => props.theme.colorValues.black};

    margin-bottom: 16px;
  }

  .buttons__group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;

    width: 100%;

    &--cancel {
      width: 100%;
    }

    &--action {
      width: 100%;
    }
  }
`;

export default TaskModalActionButtons;
