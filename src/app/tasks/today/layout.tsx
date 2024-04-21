"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { AppPaths } from "@/utils/constant";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { serverSideFetch } from "@/utils/serverSideFetch";
import { setUserData } from "@/store/slices/User";
import { UserResponseType } from "@/models";

const TasksTodayLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
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
  
  return <>{children}</>;
};

export default TasksTodayLayout;
