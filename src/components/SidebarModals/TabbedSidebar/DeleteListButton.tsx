import React from "react";
import styled from "styled-components";

type PropsType = {
  deleteButtonPosition: number;
  isVisible?: boolean;
  className?: string;
  handleHideButton: (value: React.SetStateAction<boolean>) => void;
  handleDeleteList: () => void;
};

const DeleteListButton: React.FC<PropsType> = (props) => {
  return (
    <StyledButton
      className={props.className}
      $isVisible={props.isVisible}
      $deleteButtonPosition={props.deleteButtonPosition}
    >
      <p className="description">Удалить этот список?</p>
      <div className="button__group">
        <button
          className="button__group-item button__group-item--delete"
          onClick={props.handleDeleteList}
        >
          Да
        </button>
        <button
          className="button__group-item button__group-item--cancel"
          onClick={() => props.handleHideButton(false)}
        >
          Нет
        </button>
      </div>
    </StyledButton>
  );
};

const StyledButton = styled.div<{
  $isVisible?: boolean;
  $deleteButtonPosition?: number;
}>`
  position: absolute;
  top: ${(props) =>
    props.$isVisible ? `${props.$deleteButtonPosition}px` : "0"};
  left: 0;
  z-index: 100;

  display: flex;
  flex-direction: column;

  width: 100%;

  visibility: ${(props) => (props.$isVisible ? "visible" : "hidden")};
  opacity: ${(props) => (props.$isVisible ? "1" : "0")};

  padding: 5px 8px;
  margin-bottom: 12px;

  background-color: ${(props) => props.theme.colorValues.white};

  border: 1px solid ${(props) => props.theme.colorValues.lightGrey};
  border-left-width: 4px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  transition: top 0.3s ease, opacity 0.3s ease, visibility 0.6s ease;

  .description {
    color: ${(props) => props.theme.colorValues.black};
    ${(props) => props.theme.typography.fnTitle1};
    ${(props) => props.theme.typography.fnMedium};

    text-align: center;

    border-bottom: 1px solid ${(props) => props.theme.colorValues.lightGrey};

    padding-bottom: 5px;
  }

  .button__group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;

    padding: 5px;

    width: 100%;
  }

  .button__group-item {
    color: ${(props) => props.theme.colorValues.black};
    ${(props) => props.theme.typography.fnTitle1};
    ${(props) => props.theme.typography.fnMedium};

    text-align: left;

    width: 100%;

    border-radius: 5px;

    cursor: pointer;

    padding: 5px 8px;

    transition: background-color 0.3s ease;

    &--delete {
      &:hover {
        background-color: ${(props) => props.theme.colorValues.redSecondary};
        color: ${(props) => props.theme.colorValues.white};
      }
    }

    &--cancel {
      &:hover {
        background-color: ${(props) => props.theme.colorValues.green};
        color: ${(props) => props.theme.colorValues.white};
      }
    }

    &:active {
      transform: translateY(1px);
    }
  }
`;

export default DeleteListButton;
