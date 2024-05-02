import React from "react";
import styled from "styled-components";

import { STATIC_URLS } from "@/utils/constant";

import ReusableImage from "@/components/UI/image";

type PropsType = {
  type: "password" | "themeDark" | "themeLight" | "username" | "logout";
  title: string;
  onClick: () => void;
  className?: string;
};

const ImagePaths = {
  password: `${STATIC_URLS.SVG_ICONS}/lock.svg`,
  themeDark: `${STATIC_URLS.SVG_ICONS}/sun.svg`,
  themeLight: `${STATIC_URLS.SVG_ICONS}/sun.svg`,
  username: `${STATIC_URLS.SVG_ICONS}/edit.svg`,
  logout: `${STATIC_URLS.SVG_ICONS}/logout.svg`,
};

const MenuItem: React.FC<PropsType> = (props) => {
  const imagePath = ImagePaths[props.type];

  return (
    <StyledMenuItem className={props.className} onClick={props.onClick}>
      <ReusableImage
        src={imagePath}
        alt="Dropdown menu item"
        width={20}
        height={20}
      />
      <p className="title">{props.title}</p>
    </StyledMenuItem>
  );
};

const StyledMenuItem = styled.li`
  display: flex;
  align-items: center;

  width: 180px;
  max-width: 360px;

  padding: 10px 12px;

  transition: background-color 0.2s linear;

  cursor: pointer;

  user-select: none;

  &:hover {
    background-color: ${(props) => props.theme.colorValues.lightGrey};
  }

  &:active {
    .title {
      transform: translateY(1px);
    }
  }

  .title {
    ${(props) => props.theme.typography.fnMedium};
    ${(props) => props.theme.typography.fnLabel2};

    color: ${(props) => props.theme.colorValues.black};

    margin-left: 8px;

    transition: transform 0.1s linear;
  }
`;

export default MenuItem;
