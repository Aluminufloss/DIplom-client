import React from "react";
import { useParams, useRouter } from "next/navigation";

import { TasksListType } from "@/models";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { AppPaths } from "@/utils/constant";

import { deleteList } from "@/store/slices/Lists/thunks";
import { openSnackbar } from "@/store/slices/Snackbar";

import ListItem from "../Lists/ListItem";
import DeleteListButton from "../DeleteListButton";

type PropsType = {
  isInsideGroup?: boolean;
  lists?: TasksListType[];
  className?: string;
};

const Lists: React.FC<PropsType> = (props) => {
  const [currentListId, setCurrentListId] = React.useState("");
  const [isDeleteListButtonVisible, setIsDeleteListButtonVisible] =
    React.useState(false);
  const [deleteButtonPosition, setDeleteButtonPosition] = React.useState(0);

  const url = useParams() as { slug: string };
  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleShowModal = (buttonPosition: number, listId: string) => {
    setIsDeleteListButtonVisible(true);
    setDeleteButtonPosition(buttonPosition || 0);
    setCurrentListId(listId);
  };

  const handleDeleteList = React.useCallback(() => {
    dispatch(deleteList(currentListId))
      .unwrap()
      .catch((err) => {
        dispatch(
          openSnackbar({
            title: "Ошибка при удалении списка",
            message: err.message,
            type: "error",
          })
        );
      });
    setIsDeleteListButtonVisible(false);

    dispatch(
      openSnackbar({
        title: "Успешно",
        message: "Список был успешно удалён.",
        type: "success",
      })
    );

    if (currentListId === url.slug) {
      router.push(AppPaths.tasksToday);
    }
  }, [currentListId, url.slug]);

  return (
    <ul
      className={props.className}
    >
      {!!props.lists?.length &&
        props.lists.map((list) => {
          return (
            <ListItem
              key={list.listId}
              title={list.title}
              isActiveTab={url.slug === list.listId}
              isInsideGroup={props.isInsideGroup}
              listId={list.listId}
              onClick={handleShowModal}
            />
          );
        })}
      <DeleteListButton
        isVisible={isDeleteListButtonVisible}
        deleteButtonPosition={deleteButtonPosition}
        handleHideButton={() => setIsDeleteListButtonVisible(false)}
        handleDeleteList={handleDeleteList}
      />
    </ul>
  );
};

export default Lists;
