import React from "react";
import { usePathname } from "next/navigation";

import { AppRoutes } from "../constant";
import { useAppDispatch } from "./useAppDispatch";

import { setSelectedTab } from "@/store/slices/TabbedSidebar";
import { TabEnum } from "@/store/slices/TabbedSidebar/models";

const useTabbedNavigation = () => {
  const dispatch = useAppDispatch();

  const handleSelectTab = React.useCallback((pathname: string) => {
    const path = pathname.slice(1);

    if (path.includes("analytics")) {
      dispatch(setSelectedTab(TabEnum.analytics));
      return;
    }

    switch (path) {
      case AppRoutes.tasksToday:
        dispatch(setSelectedTab(TabEnum.today));
        break;
      case AppRoutes.tasksPlanned:
        dispatch(setSelectedTab(TabEnum.planned));
        break;
      case AppRoutes.tasksAll:
        dispatch(setSelectedTab(TabEnum.tasks));
        break;
      default:
        dispatch(setSelectedTab(TabEnum.list));
        break;
    }
  }, []);

  return { handleSelectTab };
};

export default useTabbedNavigation;
