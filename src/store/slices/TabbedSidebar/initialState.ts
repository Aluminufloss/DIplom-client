import { TabEnum, TabbedSidebarStoreType } from "./models";

export const tabbedViewInitialState: TabbedSidebarStoreType = {
	isViewVisible: true,
	currentTab: TabEnum.today
}