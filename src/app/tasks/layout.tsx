"use client";

import { Provider } from "react-redux";
import styled from "styled-components";

import { store } from "@/store";

import Header from "./components/header";
import TabbedView from "@/components/SidebarModals/TabbedView";
import TaskTabbedView from "@/components/SidebarModals/TaskTabbedView";

const TasksLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Provider store={store}>
      <StyledLayout>
        <Header />
        <TabbedView />
				<TaskTabbedView />
        {children}
      </StyledLayout>
    </Provider>
  );
};

const StyledLayout = styled.div`
  position: relative;
`;

export default TasksLayout;
