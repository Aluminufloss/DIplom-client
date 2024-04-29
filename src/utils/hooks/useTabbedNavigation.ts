import React from "react";
import { usePathname, useRouter } from "next/navigation";

import { AppPaths, AppRoutes } from "../constant";
import { useAppDispatch } from "./useAppDispatch";

import { setSelectedTab } from "@/store/slices/TabbedSidebar";
import { TabEnum } from "@/store/slices/TabbedSidebar/models";

const useTabbedNavigation = () => {
  const pathname = usePathname().slice(1);
  const dispatch = useAppDispatch();
  const router = useRouter();

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

  const handleNavigation = React.useCallback((currentTab: TabEnum) => {
    dispatch(setSelectedTab(currentTab));

    switch (currentTab) {
      case TabEnum.today:
        router.push(AppPaths.tasksToday);
        break;
      case TabEnum.planned:
        router.push(AppPaths.tasksPlanned);
        break;
      case TabEnum.analytics:
        router.push(AppPaths.tasksAnalytics);
        break;
      case TabEnum.tasks:
        router.push(AppPaths.tasksAll);
        break;
    }
  }, []);

  return { handleNavigation, handleSelectTab };
};

export default useTabbedNavigation;
