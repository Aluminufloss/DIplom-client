import ActionItem from "@/components/UI/actionItem";
import { STATIC_URLS } from "@/utils/constant";
import React from "react";
import styled from "styled-components";

type PropsType = {
  className?: string;
};

const ActionButtonsGroup: React.FC<PropsType> = (props) => {
  return (
    <StyledContainer className={props.className}>
      <ActionItem
        onClick={() => {}}
        imageSrc={`${STATIC_URLS.SVG_ICONS}/menu.svg`}
        imageAlt="menu icon"
				clasName="action__item"
      />
      <ActionItem
        onClick={() => {}}
        imageSrc={`${STATIC_URLS.SVG_ICONS}/home.svg`}
        imageAlt="home icon"
				clasName="action__item"
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  align-items: center;

	.action__item {
		margin-right: 16px;
	}
`;

export default ActionButtonsGroup;
