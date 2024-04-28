"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import { UserResponseType } from "@/models";

import { AppPaths } from "@/utils/constant";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { serverSideFetch } from "@/utils/serverSideFetch";

import { setUserData } from "@/store/slices/User";
import { useAppSelector } from "@/utils/hooks/useAppSelector";

const TasksTemplate = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const tabbedSidebarVisibility = useAppSelector((state) => state.tabbedSidebar.isViewVisible);
  
  React.useEffect(() => {
    (async () => {
      const response = await serverSideFetch<UserResponseType>({
        url: "http://localhost:5000/me",
        method: "POST",
      });

      if (!response) {
        router.push(AppPaths.login);
        return;
      }

      if (response.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
      }

      dispatch(setUserData(response.data))
    })();
  }, []);
  
  return (
    <StyledLayout $isSidebarOpen={tabbedSidebarVisibility} className="content">
      {children}
    </StyledLayout>
  );
};

const StyledLayout = styled.div<{ $isSidebarOpen: boolean }>`
  width: 100%;
  height: 100%;

  padding: 24px 128px 48px ${props => props.$isSidebarOpen ? "290px" : "128px"};

  transition: padding-left 0.5s ease;
`;

export default TasksTemplate;
