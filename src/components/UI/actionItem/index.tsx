"use client";

import React from "react";
import styled from "styled-components";
import ReusableImage from "../image";

type PropsType = {
  onClick: () => void;
  imageSrc: string;
  imageAlt: string;
};

const ActionItem: React.FC<PropsType> = (props) => {
  return (
    <StyledActionItem onClick={props.onClick}>
      <ReusableImage src={props.imageSrc} alt={props.imageAlt} />
    </StyledActionItem>
  );
};

const StyledActionItem = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 16px;

  width: 24px;
  height: 24px;

  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export default ActionItem;
