import { Middleware } from "redux";
import { setListId } from ".";

const urlChangeMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (typeof window !== "undefined") {
    const url = new URL(window.location.href);
    const pathSegments = url.pathname.split("/");

    if (
      pathSegments.length >= 3 &&
      pathSegments[pathSegments.length - 2] === "list"
    ) {
      const listId = pathSegments[pathSegments.length - 1];
      if (
        store.getState().taskModal.modalParams.taskInfo.listId[0] !== listId
      ) {
        store.dispatch(setListId([listId]));
      }
    } else {
      if (store.getState().taskModal.modalParams.taskInfo.listId.length !== 0) {
        store.dispatch(setListId([]));
      }
    }
  }

  return result;
};

export default urlChangeMiddleware;
