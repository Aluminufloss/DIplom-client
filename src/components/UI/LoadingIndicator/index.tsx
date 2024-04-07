"use client";

import React from "react";
import styled from "styled-components";

type PropsType = {};

const LoadingIndicator: React.FC<PropsType> = (props) => {
  return (
    <StyledLoadingIndicator>
      <span className="loader__text">M</span>
      <div className="loader__circle"/>
    </StyledLoadingIndicator>
  );
};

const StyledLoadingIndicator = styled.div`
  position: relative;

  .loader {
    &__text {
      color: ${(props) => props.theme.colorValues.black};
      ${(props) => props.theme.typography.fnSemiBold};

      font-size: 124px;
      line-height: 0;
    }

    &__circle {
      background-color: ${(props) => props.theme.colorValues.primary};

      width: 36px;
      height: 36px;

      border-radius: 100px;

      position: absolute;
      bottom: 0;
      right: -20px;
    }
  }
`;

export default LoadingIndicator;
