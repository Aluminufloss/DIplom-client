export type SnackbarStoreType = {
  isOpen: boolean;
  message?: string;
  title?: string;
  type?: "error" | "success"
}

export type SnackbarOpenActionDataType = {
  title: string;
  message: string;
  type?: "error" | "success"
}