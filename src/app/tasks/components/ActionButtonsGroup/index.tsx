import ActionItem from "@/components/UI/actionItem";
import { setModalVisibility } from "@/store/slices/TabbedView";
import { STATIC_URLS } from "@/utils/constant";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import React from "react";
import styled from "styled-components";

type PropsType = {
  className?: string;
};

const ActionButtonsGroup: React.FC<PropsType> = (props) => {
  const [isTabbedViewVisible, setIsTabbedViewVisible] = React.useState(true);
  const dispatch = useAppDispatch();

  const handleOpenTabbedView = React.useCallback(() => {
    setIsTabbedViewVisible(prev => !prev);
    dispatch(setModalVisibility(isTabbedViewVisible));
  }, [isTabbedViewVisible]);

  return (
    <StyledContainer className={props.className}>
      <ActionItem
        onClick={handleOpenTabbedView}
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
