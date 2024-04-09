import React from 'react';
import styled from 'styled-components';

import { useAppSelector } from '@/utils/hooks/useAppSelector';

type PropsType = {
	
}

const TaskTabbedView: React.FC<PropsType> = (props) => {
	const modalState = useAppSelector(state => state.tabbedView);

	return (
		<StyledView isViewVisible={modalState.isViewVisible}>
			<div>

			</div>
		</StyledView>
	)
}

type StyleProps = {
	isViewVisible: boolean;
}

const StyledView = styled.div<StyleProps>`
	max-width: 230px;
	width: 100%;
	height: 100vh;

	position: fixed;
	top: 75px;
	right: ${props => props.isViewVisible ? "0" : "-230px"};

	z-index: 50;

	background-color: ${props => props.theme.colorValues.sidebarWhite};

	transition: all .7s ease;
`;

export default TaskTabbedView;