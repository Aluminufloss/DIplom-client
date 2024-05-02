import { SnackbarStoreType } from "./models";

export const SnackbarInitialState: SnackbarStoreType = {
  isOpen: false,
  message: "",
  title: "",
  type: "success",
}