"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { AppPaths } from "@/utils/constant";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { serverSideFetch } from "@/utils/serverSideFetch";

const TasksTodayLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  React.useEffect(() => {
    (async () => {
      const data = await serverSideFetch({
        url: "http://localhost:5000/me",
        method: "POST",
      });

      if (!data) {
        router.push(AppPaths.login);
      }

      localStorage.setItem("accessToken", data?.accessToken);
    })();
  }, []);
  
  return <>{children}</>;
};

export default TasksTodayLayout;
