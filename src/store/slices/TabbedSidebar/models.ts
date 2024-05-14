export type TabbedSidebarStoreType = {
	isViewVisible: boolean;
	currentTab: TabEnum;
}

export enum TabEnum {
	today = "today",
	planned = "planned",
	analytics = "analytics",
	tasks = "tasks",
	list = "list",
}