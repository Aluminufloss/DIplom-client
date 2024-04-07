import React from 'react';
import styled from 'styled-components';
import ActionButtonsGroup from '../ActionButtonsGroup';
import TaskSearchBar from '../TaskSearchBar';

type PropsType = {
	
}

const Header: React.FC<PropsType> = (props) => {
	return (
		<StyledHeader>
			<ActionButtonsGroup />
			<TaskSearchBar />
		</StyledHeader>
	)
}

const StyledHeader = styled.header`
	width: 100%;

	display: flex;
	align-items: center;

	background-color: ${props => props.theme.colorValues.white};

	border-bottom: 1px solid ${props => props.theme.colorValues.lightGrey};

	padding: 20px 24px;
`;

export default Header;