import React from "react";
import { usePathname } from "next/navigation";

import { AppRoutes } from "../constant";
import { useAppDispatch } from "./useAppDispatch";

import { setSelectedTab } from "@/store/slices/TabbedSidebar";
import { TabEnum } from "@/store/slices/TabbedSidebar/models";

const useTabbedNavigation = () => {
  const pathname = usePathname().slice(1);
  const dispatch = useAppDispatch();

  const handleSelectTab = React.useCallback(() => {
    switch (pathname) {
      case AppRoutes.tasksToday:
        dispatch(setSelectedTab(TabEnum.today));
        break;
      case AppRoutes.tasksPlanned:
        dispatch(setSelectedTab(TabEnum.planned));
        break;
      case AppRoutes.tasksAnalytics:
        dispatch(setSelectedTab(TabEnum.analytics));
        break;
      case AppRoutes.tasksAll:
        dispatch(setSelectedTab(TabEnum.tasks));
        break;
    }
  }, [pathname]);


  return { handleSelectTab };
};

export default useTabbedNavigation;
