import React from "react";
import styled from "styled-components";

import { STATIC_URLS } from "@/utils/constant";

import ReusableImage from "@/components/UI/image";

type PropsType = {
  onSetInputVisible: (savingMode: "list" | "group") => void;
  className?: string;
};

const AddNewListButton: React.FC<PropsType> = (props) => {
  const handleAddGroup = React.useCallback((ev: React.MouseEvent) => {
    ev.stopPropagation();
    props.onSetInputVisible("group");
  }, [props.onSetInputVisible]);

  return (
    <StyledButton className={props.className} onClick={() => props.onSetInputVisible("list")}>
      <div className="button__new-list" title="Создать новый список">
        <ReusableImage
          src={`${STATIC_URLS.SVG_ICONS}/plus.svg`}
          alt="plus icon"
        />
        <span className="button__new-list--text">Новый список</span>
      </div>
      <div
        className="button__new-list--group"
        title="Создать новую группу"
        onClick={handleAddGroup}
      >
        <ReusableImage
          src={`${STATIC_URLS.SVG_ICONS}/group.svg`}
          alt="Создать новую группу"
        />
      </div>
    </StyledButton>
  );
};

const StyledButton = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 5px;

  .button__new-list {
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 5px 8px;

    border-radius: 5px;

    cursor: pointer;

    transition: background-color 0.3s ease;

    &--text {
      ${(props) => props.theme.typography.fnTitle1};
      ${(props) => props.theme.typography.fnMedium};
      color: ${(props) => props.theme.colorValues.black};

      margin-left: 5px;

      transform: translateY(1px);
    }

    &--group {
      display: flex;
      flex-direction: row;
      align-items: center;

      padding: 5px 6px;

      border-radius: 5px;

      cursor: pointer;
    }

    &:hover,
    &--group:hover {
      background-color: ${(props) => props.theme.colorValues.lightGrey};
    }
  }
`;

export default AddNewListButton;
