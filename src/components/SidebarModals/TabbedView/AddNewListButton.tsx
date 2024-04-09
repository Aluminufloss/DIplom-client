import React from "react";
import styled from "styled-components";

import { STATIC_URLS } from "@/utils/constant";

import ReusableImage from "@/components/UI/image";

type PropsType = {};

const AddNewListButton: React.FC<PropsType> = (props) => {
  return (
    <StyledButton>
      <div className="button__new-list">
        <ReusableImage
          src={`${STATIC_URLS.SVG_ICONS}/plus.svg`}
          alt="plus icon"
        />
        <span className="button__new-list--text">Add new list</span>
      </div>
      <div className="button__new-list--group">
        <ReusableImage
          src={`${STATIC_URLS.SVG_ICONS}/group.svg`}
          alt="group icon"
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

  padding: 5px 8px;

  .button__new-list {
    border-radius: 5px;

    display: flex;
    flex-direction: row;
    align-items: center;

    &--text {
      ${(props) => props.theme.typography.fnTitle1};
      ${(props) => props.theme.typography.fnMedium};
      color: ${(props) => props.theme.colorValues.black};
    }

    &--group {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    &:hover,
    &--group:hover {
      background-color: ${(props) => props.theme.colorValues.hoverGrey};
    }
  }
`;

export default AddNewListButton;
