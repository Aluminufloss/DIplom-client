export const STATIC_BASE_URL = ``;

export const API_URL = 'http://localhost:5000';
export const CLIENT_URL = 'http://localhost:3000';

export const STATIC_URLS = {
  IMAGES: `${STATIC_BASE_URL}/images`,
  SVG_ICONS: `${STATIC_BASE_URL}/images/svg`,
  BACKGROUND: `${STATIC_BASE_URL}/images/background`,
  LOGO: `${STATIC_BASE_URL}/images/logos`,
}

export enum DeviceTypes {
  mobile = 'mobile',
  desktop = 'desktop',
  tablet = 'tablet',
}

export enum AppRoutes {
  login = 'login',
  registration = 'registration',
  tasksToday = 'tasks/today',
  tasksAll = 'tasks/all',
  tasksPlanned = 'tasks/planned',
  tasksAnalytics = 'tasks/analytics',
  sendChangePasswordLink = 'changePassword',
}

export enum AppPaths {
  login = `${CLIENT_URL}/${AppRoutes.login}`,
  registration = `${CLIENT_URL}/${AppRoutes.registration}`,
  sendChangePasswordLink = `${CLIENT_URL}/${AppRoutes.sendChangePasswordLink}`,
  tasksToday = `${CLIENT_URL}/${AppRoutes.tasksToday}`,
  tasksPlanned = `${CLIENT_URL}/${AppRoutes.tasksPlanned}`,
  tasksAnalytics = `${CLIENT_URL}/${AppRoutes.tasksAnalytics}`,
  tasksAll = `${CLIENT_URL}/${AppRoutes.tasksAll}`,
}

export enum ApiPaths {
  me = `${API_URL}/me`,
}