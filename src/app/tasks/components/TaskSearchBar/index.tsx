import React from "react";
import styled from "styled-components";
import ReusableImage from "@/components/UI/image";
import { STATIC_URLS } from "@/utils/constant";
import cn from "classnames";

type PropsType = {};

const TaskSearchBar: React.FC<PropsType> = (props) => {
  const [isInputFocused, setIsInputFocused] = React.useState(false);

  return (
    <StyledSearch
      onFocus={() => {
        setIsInputFocused((prev) => !prev);
      }}
      className={cn(isInputFocused && "focused")}
    >
      <ReusableImage
        src={`${STATIC_URLS.SVG_ICONS}/search.svg`}
        alt="Search icon"
      />
      <input
        type="search"
        placeholder="Search your tasks..."
        className="input"
      />
    </StyledSearch>
  );
};

const StyledSearch = styled.div`
  width: 100%;
  max-width: 300px;

  display: flex;
  align-items: center;

  border-radius: 5px;

  background-color: ${(props) => props.theme.colorValues.strokeGrey};

  border: 1px solid ${(props) => props.theme.colorValues.lightGrey};

  padding: 12px 16px;

  .input {
    width: 100%;

    background-color: ${(props) => props.theme.colorValues.strokeGrey};
  }
`;

export default TaskSearchBar;
