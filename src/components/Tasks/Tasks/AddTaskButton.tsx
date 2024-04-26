import React from "react";
import styled from "styled-components";

import { STATIC_URLS } from "@/utils/constant";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";

import { setModalVisibility } from "@/store/slices/TaskModal";

import ReusableImage from "@/components/UI/image";

type PropsType = {
};

export const AddTaskButton: React.FC<PropsType> = (props) => {
  const dispatch = useAppDispatch();
  
  return (
    <StyledTaskItem onClick={() => dispatch(setModalVisibility(true))}>
      <ReusableImage
        width={24}
        height={24}
        src={`${STATIC_URLS.SVG_ICONS}/plus.svg`}
        alt="Plus icon"
      />
      <p className="title">Добавьте новую задачу</p>
    </StyledTaskItem>
  );
};

const StyledTaskItem = styled.div`
  width: 100%;

  margin-bottom: 20px;

  display: flex;
  align-items: center;

  padding: 16px 20px;

  background-color: ${(props) => props.theme.colorValues.white};

  border-radius: 5px;

  transition: background-color 0.3s ease, transform 0.1s ease-in;

  user-select: none;

  &:hover {
    background-color: ${(props) => props.theme.colorValues.strokeGrey};
  }

  &:active {
    transform: translateY(3px);
  }

  .title {
    ${(props) => props.theme.typography.fnTitle1}
    ${(props) => props.theme.typography.fnSemiBold};
    color: ${(props) => props.theme.colorValues.black};

    margin-left: 16px;
  }
`;

export default AddTaskButton;
