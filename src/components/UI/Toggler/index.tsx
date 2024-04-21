import React from "react";
import styled from "styled-components";

type ParamsType = {
  isActive: boolean;
  onClick: () => void;
  className?: string;
};

const Toggler: React.FC<ParamsType> = (props) => {
  return (
    <StyledToggler
      className={props.className}
      $isActive={props.isActive}
      onClick={props.onClick}
    >
      <div className="toggler__circle" />
    </StyledToggler>
  );
};

const StyledToggler = styled.div<{ $isActive: boolean }>`
  position: relative;

  width: 120px;
  height: 36px;

  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.colorValues.grey};

  background-color: white;

  .toggler__circle {
    height: 24px;
    width: 36px;

    position: absolute;
    left: ${(props) => (props.$isActive ? "74px" : "8px")};
    top: 4px;

    border-radius: 30px;

    transition: left 0.3s ease, background-color 0.3s ease;

    background-color: ${(props) =>
      props.$isActive
        ? props.theme.colorValues.primary
        : props.theme.colorValues.lightGrey};
  }
`;

export default Toggler;