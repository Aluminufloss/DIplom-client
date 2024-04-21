import React from "react";
import styled from "styled-components";

import { AppPaths } from "@/utils/constant";

import UserBlock from "../UserBlock";
import TaskSearchBar from "../TaskSearchBar";
import ActionButtonsGroup from "../ActionButtonsGroup";
import AdditionalActionButtonsGroup from "../AdditionalActionButtonsGroup";
import LogoLink from "@/components/UI/logoLink";

const Header = React.forwardRef<HTMLHeadElement, {}>((props, ref) => {
  return (
    <StyledHeader ref={ref}>
      <ActionButtonsGroup />
      <TaskSearchBar />
      <LogoLink href={AppPaths.tasksToday} alt="App logo" type="big" />
      <AdditionalActionButtonsGroup />
      <UserBlock />
    </StyledHeader>
  );
});

const StyledHeader = styled.header`
  width: 100%;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 100;

  display: flex;
  align-items: center;

  background-color: ${(props) => props.theme.colorValues.white};

  border-bottom: 1px solid ${(props) => props.theme.colorValues.lightGrey};

  padding: 16px 24px;
`;

export default Header;