export type SnackbarStoreType = {
  isOpen: boolean;
  message?: string;
  title?: string;
}

export type SnackbarOpenActionDataType = {
  title: string;
  message: string;
}