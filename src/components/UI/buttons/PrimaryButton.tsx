import React from "react";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";

type PropsType = {
  title: string;
  type?: "submit" | "reset" | undefined;
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
};

const PrimaryButton: React.FC<PropsType> = (props) => {
  return (
    <StyledButton
      onClick={props.onClick}
      type={props.type}
      className={props.className}
    >
      {!props.isLoading ? (
        props.title
      ) : (
        <ClipLoader 
          size={16} 
          color="#ffffff" 
          className="loader" 
        />
      )}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  ${(props) => props.theme.typography.fnMedium};
  ${(props) => props.theme.typography.fnLabel2};

  background-color: ${(props) => props.theme.colorValues.primary};
  color: ${(props) => props.theme.colorValues.white};

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  width: 100%;
  max-width: 340px;

  padding: 12px 16px;

  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colorValues.lightGrey};
  transition: all 0.1s linear;

  &:hover {
    background-color: ${(props) => props.theme.colorValues.orangeSecondary};
  }

  &:active {
    background-color: ${(props) => props.theme.colorValues.orangeSecondary};
    transform: translateY(1px) scale(0.98);
  }
`;

export default PrimaryButton;
