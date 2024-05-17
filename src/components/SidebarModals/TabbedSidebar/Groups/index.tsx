import React from "react";
import styled from "styled-components";

import { GroupType } from "@/models";
import { STATIC_URLS } from "@/utils/constant";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { addListToGroup, deleteGroup } from "@/store/slices/Groups/thunks";
import { openSnackbar } from "@/store/slices/Snackbar";

import ReusableImage from "@/components/UI/image";
import DeleteListButton from "../DeleteListButton";
import GroupItem from "./GroupItem";
import CreateInput from "../CreateInput";

type PropsType = {
  groups?: GroupType[];
};

const Groups: React.FC<PropsType> = (props) => {
  const [currentGroupId, setCurrentGroupId] = React.useState("");
  const [isDeleteListButtonVisible, setIsDeleteListButtonVisible] =
    React.useState(false);
  const [deleteButtonPosition, setDeleteButtonPosition] = React.useState(0);
  const [inputValue, setInputValue] = React.useState("");
  const [isInputVisible, setIsInputVisible] = React.useState(false);

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

    dispatch(
      openSnackbar({
        title: "Успешно",
        message: "Группа была успешно удалена",
        type: "success",
      })
    );
  }, [currentGroupId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSave = React.useCallback(() => {
    if (inputValue) {
      dispatch(
        addListToGroup({ groupId: currentGroupId, listName: inputValue })
      );
    }

    setIsInputVisible(false);
    setInputValue("");
  }, [currentGroupId, inputValue]);

  const handleClickOnEnter = React.useCallback(
    (ev: React.KeyboardEvent<HTMLInputElement>) => {
      if (ev.key === "Enter") {
        handleSave();
      }
    },
    [handleSave]
  );

  return (
    <StyledGroups>
      {isInputVisible && (
        <div className="input__wrapper">
          <ReusableImage
            src={`${STATIC_URLS.SVG_ICONS}/list.svg`}
            alt="list icon"
            className="input__icon"
          />
          <CreateInput
            className="input"
            inputValue={inputValue}
            handleChange={handleInputChange}
            handleBlur={handleSave}
            handleKeyDown={handleClickOnEnter}
          />
        </div>
      )}
      {props.groups?.map((group) => (
        <GroupItem
          key={group.id}
          groupId={group.id}
          groupName={group.name}
          onAddListToGroup={() => {
            setIsInputVisible(true);
            setCurrentGroupId(group.id);
          }}
          onClick={handleShowModal}
        />
      ))}
      <DeleteListButton
        title="Удалить эту группу?"
        isVisible={isDeleteListButtonVisible}
        deleteButtonPosition={deleteButtonPosition}
        handleHideButton={() => setIsDeleteListButtonVisible(false)}
        handleDeleteList={handleDeleteGroup}
      />
    </StyledGroups>
  );
};

const StyledGroups = styled.ul`
  .input {
    margin-left: 5px;

    &__wrapper {
      width: 100%;

      display: flex;
      align-items: center;

      padding: 5px 8px 5px 20px;

      border-radius: 5px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;

      border-left: 4px solid ${(props) => props.theme.colorValues.lightGrey};

      &__icon {
        transform: translateY(1px);
      }
    }
  }
`;

export default Groups;
