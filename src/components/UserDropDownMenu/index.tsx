import React from "react";
import styled from "styled-components";

import MenuItem from "./MenuItem";

type PropsType = {};

const UserDropDownMenu: React.FC<PropsType> = (props) => {
  return (
    <StyledMenu>
      <div className="menu__title-wrapper">
        <p className="menu__title">User settings</p>
      </div>
      <ul className="menu__list">
        <MenuItem
          type="username"
          title="Change username"
          onClick={() => {}}
          className="menu__item"
        />
        <MenuItem
          type="password"
          title="Change password"
          onClick={() => {}}
          className="menu__item"
        />
        <MenuItem
          type="themeLight"
          title="Light theme"
          onClick={() => {}}
          className="menu__item"
        />
      </ul>
    </StyledMenu>
  );
};

const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  top: 150%;
  right: 0;

  border: 1px solid ${(props) => props.theme.colorValues.lightGrey};
	box-shadow: rgba(192, 194, 195, 0.3) 0px 8px 24px;

  border-radius: 8px;
	overflow: hidden;

  background-color: ${(props) => props.theme.colorValues.white};

  .menu {
    &__title-wrapper {
      width: 100%;

      padding: 8px 12px;

      border-bottom: 1px solid ${(props) => props.theme.colorValues.lightGrey};

			background-color: ${(props) => props.theme.colorValues.primary};
    }

    &__title {
      text-align: center;

      ${(props) => props.theme.typography.fnSemiBold};
      ${(props) => props.theme.typography.fnTitle1};

      color: ${(props) => props.theme.colorValues.white};
    }

		&__list li:not(:last-child) {
      border-bottom: 1px solid ${(props) => props.theme.colorValues.lightGrey};
		}
  }
`;

export default UserDropDownMenu;
