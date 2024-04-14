import React from "react";
import styled from "styled-components";

import { TaskType } from "@/models";

type PropsType = {
  item?: TaskType;
};

export const TaskItem: React.FC<PropsType> = (props) => {
	const handleClick = () => {
		const audio = new Audio('/sounds/task_complete_sound.mp3');
		audio.play();
	}

  return (
    <StyledTaskItem>
      <input type="checkbox" className="task__checkbox" onClick={handleClick} />
      <p className="task__text">Tast input text test</p>
    </StyledTaskItem>
  );
};

const StyledTaskItem = styled.div`
  width: 100%;
  max-width: 1000px;

  margin-bottom: 30px;

  display: flex;
  align-items: center;

  padding: 16px 20px;

  background-color: ${(props) => props.theme.colorValues.white};

  border: 1px solid ${(props) => props.theme.colorValues.lightGrey};
  border-radius: 5px;

	transition: background-color .3s ease;

	&:hover {
		background-color: ${(props) => props.theme.colorValues.strokeGrey};
	}

  input[type="checkbox"] {
		position: relative;

    appearance: none;

    display: flex;
    align-content: center;
    justify-content: center;

    width: 24px;
    height: 24px;
  }

  input[type="checkbox"]::before {
    content: "";

		position: absolute;
		top: 0;
		left: 0;

    width: 100%;
    height: 100%;

		border-radius: 50px;
    background-color:${props => props.theme.colorValues.primary};
		
		transition: all .1s ease;
    transform: scale(0);
  }

  input[type="checkbox"]:checked::before {
    transform: scale(1);
  }

  .task {
    &__checkbox {
      width: 24px;
      height: 24px;

      border-radius: 50px;
      border: 1px solid ${(props) => props.theme.colorValues.darkGrey};
    }

    &__text {
      ${(props) => props.theme.typography.fnTitle1}
      ${(props) => props.theme.typography.fnSemiBold};
      color: ${(props) => props.theme.colorValues.black};

      margin-left: 16px;
    }
  }
`;

export default TaskItem;
