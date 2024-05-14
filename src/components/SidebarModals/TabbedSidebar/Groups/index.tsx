import React from "react";
import styled from "styled-components";

import { GroupType } from "@/models";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { deleteGroup } from "@/store/slices/Groups/thunks";
import { openSnackbar } from "@/store/slices/Snackbar";

import DeleteListButton from "../DeleteListButton";
import GroupItem from "./GroupItem";

type PropsType = {
  groups?: GroupType[];
  onSetInputVisible: (savingMode: "list" | "group") => void;
};

const Groups: React.FC<PropsType> = (props) => {
  const [currentGroupId, setCurrentGroupId] = React.useState("");
  const [isDeleteListButtonVisible, setIsDeleteListButtonVisible] =
    React.useState(false);
  const [deleteButtonPosition, setDeleteButtonPosition] = React.useState(0);

  const dispatch = useAppDispatch();

  const handleShowModal = (buttonPosition: number, groupId: string) => {
    setIsDeleteListButtonVisible(true);
    setDeleteButtonPosition(buttonPosition || 0);
    setCurrentGroupId(groupId);
  };

  const handleDeleteGroup = React.useCallback(() => {
    dispatch(deleteGroup(currentGroupId))
      .unwrap()
      .catch((err) => {
        dispatch(
          openSnackbar({
            title: "Ошибка при удалении группы",
            message: err.message,
            type: "error",
          })
        );
      });
    setIsDeleteListButtonVisible(false);
  }, [currentGroupId]);

  return (
    <StyledGroups>
      {props.groups?.map((group) => (
        <GroupItem
          lists={group.lists}
          key={group.id}
          groupId={group.id}
          title={group.name}
          onAddListToGroup={props.onSetInputVisible}
          onClick={handleShowModal}
        />
      ))}
      <DeleteListButton
        title="Удалить эту  группу?"
        isVisible={isDeleteListButtonVisible}
        deleteButtonPosition={deleteButtonPosition}
        handleHideButton={() => setIsDeleteListButtonVisible(false)}
        handleDeleteList={handleDeleteGroup}
      />
    </StyledGroups>
  );
};

const StyledGroups = styled.ul`
  position: relative;
`;

export default Groups;
