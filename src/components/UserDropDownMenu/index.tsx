"use client"

import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

import { AppPaths } from "@/utils/constant";
import AuthService from "@/api/services/AuthService";

import MenuItem from "./MenuItem";

type PropsType = {
  onChangeUsername: () => void;
  onCloseMenu: () => void;
}

const UserDropDownMenu: React.FC<PropsType> = (props) => {
  const router = useRouter();
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        props.onCloseMenu?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onLogout = React.useCallback(async () => {
    await AuthService.logout();

    localStorage.removeItem("accessToken");

    router.push(AppPaths.login);
  }, [AuthService.logout]);

  return (
    <StyledMenu ref={menuRef}>
      <div className="menu__title-wrapper">
        <p className="menu__title">Настройки</p>
      </div>
      <ul className="menu__list">
        <MenuItem
          type="username"
          title="Поменять логин"
          onClick={props.onChangeUsername}
          className="menu__item"
        />
        <MenuItem
          type="themeLight"
          title="Смена темы"
          onClick={() => {}}
          className="menu__item"
        />
        <MenuItem
          type="logout"
          title="Выход"
          onClick={onLogout}
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
