import React from "react";
import styled from "styled-components";

import Link from "next/link";

type PropsType = {
  title: string;
  href: string;
  className?: string;
};

const LinkButton: React.FC<PropsType> = (props) => {
  return (
    <StyledButton href={props.href} className={props.className}>
      {props.title}
    </StyledButton>
  );
};

const StyledButton = styled(Link)`
  ${(props) => props.theme.typography.fnSemiBold};
  ${(props) => props.theme.typography.fnTitle1};

  color: ${(props) => props.theme.colorValues.primary};

	text-decoration: none;

  transition: all 0.1s linear;

  &:hover {
    color: ${(props) => props.theme.colorValues.orangeSecondary};
  }

  &:active {
    color: ${(props) => props.theme.colorValues.orangeSecondary};
    transform: translateY(1px);
  }
`;

export default LinkButton;
