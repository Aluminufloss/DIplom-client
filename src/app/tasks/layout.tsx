"use client";

import styled from "styled-components";
import Header from "./components/header";

const TasksLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
		<StyledLayout>
			<Header />
			{children}
		</StyledLayout>
	);
};

const StyledLayout = styled.div``;

export default TasksLayout;
