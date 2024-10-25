import { SelectesdDayType } from "@/store/slices/TaskModal/models";

export const STATIC_BASE_URL = ``;

export const API_URL = "http://localhost:5000";
export const CLIENT_URL = "http://localhost:3000";

export const STATIC_URLS = {
  IMAGES: `${STATIC_BASE_URL}/images`,
  SVG_ICONS: `${STATIC_BASE_URL}/images/svg`,
  BACKGROUND: `${STATIC_BASE_URL}/images/background`,
  LOGO: `${STATIC_BASE_URL}/images/logos`,
};

export enum DeviceTypes {
  mobile = "mobile",
  desktop = "desktop",
  tablet = "tablet",
}

export enum AppRoutes {
  login = "login",
  registration = "registration",
  tasksToday = "tasks/today",
  tasksAll = "tasks/all",
  tasksPlanned = "tasks/planned",
  sendChangePasswordLink = "changePassword",
  list = "tasks/list",
  analytics = "tasks/analytics",
  analyticsAll = "tasks/analytics/all",
  analyticsMonth = "tasks/analytics/month",
  analyticsWeek = "tasks/analytics/week",
  analyticsYear = "tasks/analytics/year",
}

export enum AppPaths {
  login = `${CLIENT_URL}/${AppRoutes.login}`,
  registration = `${CLIENT_URL}/${AppRoutes.registration}`,
  sendChangePasswordLink = `${CLIENT_URL}/${AppRoutes.sendChangePasswordLink}`,
  tasksToday = `${CLIENT_URL}/${AppRoutes.tasksToday}`,
  tasksPlanned = `${CLIENT_URL}/${AppRoutes.tasksPlanned}`,
  tasksAll = `${CLIENT_URL}/${AppRoutes.tasksAll}`,
  list = `${CLIENT_URL}/${AppRoutes.list}`,
  analytics = `${CLIENT_URL}/${AppRoutes.analytics}`,
  analyticsAll = `${CLIENT_URL}/${AppRoutes.analyticsAll}`,
  analyticsMonth = `${CLIENT_URL}/${AppRoutes.analyticsMonth}`,
  analyticsWeek = `${CLIENT_URL}/${AppRoutes.analyticsWeek}`,
  analyticsYear = `${CLIENT_URL}/${AppRoutes.analyticsYear}`,
}

export enum ApiPaths {
  me = `${API_URL}/me`,
}

export const initialRepeatDays: SelectesdDayType[] = [
  { day: "Mon", isSelected: false },
  { day: "Tue", isSelected: false },
  { day: "Wed", isSelected: false },
  { day: "Thu", isSelected: false },
  { day: "Fri", isSelected: false },
  { day: "Sat", isSelected: false },
  { day: "Sun", isSelected: false },
];

export const Categories = [
  "Personal",
  "Work",
  "Study",
  "Home",
  "Travelling",
  "Without",
];

export const TranslatedCategories = [
  "Личное",
  "Работа",
  "Учеба",
  "Дом",
  "Путешествия",
  "Без категории",
];
