import React from "react";
import styled from "styled-components";

type PropsType = {
  title: string;
  onClick: () => void;
  className?: string;
};

const PrimaryButton: React.FC<PropsType> = (props) => {
  return (
    <StyledButton onClick={props.onClick} className={props.className}>
      {props.title}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  ${(props) => props.theme.typography.fnMedium};
  ${(props) => props.theme.typography.fnTitle1};

  background-color: ${(props) => props.theme.colorValues.primary};
	color: ${(props) => props.theme.colorValues.white}; 

	width: 100%;
	max-width: 440px;

	padding: 12px 16px;

	border-radius: 5px;
	border: 1px solid ${props => props.theme.colorValues.lightGrey};
	transition: all .1s linear;

	&:hover {
		background-color: ${(props) => props.theme.colorValues.orangeSecondary};
	}

	&:active {
		background-color: ${(props) => props.theme.colorValues.orangeSecondary};
		transform: translateY(1px);
	}
`;

export default PrimaryButton;
