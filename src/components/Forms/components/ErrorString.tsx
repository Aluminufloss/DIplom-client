import React from "react";
import styled from "styled-components";

type PropsType = {
  text: string;
  className?: string;
};

const ErrorString: React.FC<PropsType> = (props) => {
  return <StyledError className={props.className}>{props.text}</StyledError>;
};

const StyledError = styled.p`
  ${(props) => props.theme.typography.fnLabel2};
  ${(props) => props.theme.typography.fnRegular};
  color: ${(props) => props.theme.colorValues.redSecondary};
`;

export default ErrorString;
