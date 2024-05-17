import React from "react";
import styled from "styled-components";

import { useAppSelector } from "@/utils/hooks/useAppSelector";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { STATIC_URLS } from "@/utils/constant";

import { addList } from "@/store/slices/Lists/thunks";
import { addGroup } from "@/store/slices/Groups/thunks";
import { openSnackbar } from "@/store/slices/Snackbar";

import ReusableImage from "@/components/UI/image";
import AddNewListButton from "../AddNewListButton";
import CreateInput from "../CreateInput";
import Lists from "../Lists";
import Groups from "../Groups";
import ListkeletonsSection from "@/components/UI/Skeletons/List/ListSkeletonsSection";

const GeneralSection: React.FC = () => {
  const listsInfo = useAppSelector((state) => state.lists);
  const groupsInfo = useAppSelector((state) => state.groups);
  const isDataLoading = listsInfo.isLoading;

  const listsWithoutGroup = listsInfo.lists.filter((list) => !list.groupId);

  const [savingMode, setSavingMode] = React.useState<string>("");
  const [inputValue, setInputValue] = React.useState("");
  const [isInputVisible, setIsInputVisible] = React.useState(false);

  const dispatch = useAppDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSaveGroup = React.useCallback(() => {
    if (inputValue) {
      const hasItem = groupsInfo.groups.some(
        (group) => group.name === inputValue
      );

      if (hasItem) {
        dispatch(
          openSnackbar({
            title: "Ошибка",
            message: "Группа с таким названием уже существует",
            type: "error",
          })
        );
      } else {
        dispatch(addGroup(inputValue));
      }
    }

    setIsInputVisible(false);
    setInputValue("");
  }, [groupsInfo.groups, inputValue]);

  const handleSaveList = React.useCallback(() => {
    if (inputValue) {
      const hasItem = listsInfo.lists.some((list) => list.title === inputValue);

      if (hasItem) {
        dispatch(
          openSnackbar({
            title: "Ошибка",
            message: "Список с таким названием уже существует",
            type: "error",
          })
        );
      } else {
        dispatch(addList(inputValue));
      }
    }

    setIsInputVisible(false);
    setInputValue("");
  }, [listsInfo.lists, inputValue]);

  const handleSave = React.useCallback(() => {
    if (savingMode === "list") {
      handleSaveList();
    } else if (savingMode === "group") {
      handleSaveGroup();
    }
  }, [handleSaveList, handleSaveGroup, savingMode]);

  const handleClickOnEnter = React.useCallback(
    (ev: React.KeyboardEvent<HTMLInputElement>) => {
      if (ev.key === "Enter") {
        handleSave();
      }
    },
    [handleSave]
  );

  const onSetInputVisible = React.useCallback(
    (savingMode: "list" | "group") => {
      setIsInputVisible(true);
      setSavingMode(savingMode);
    },
    []
  );

  return (
    <StyledGeneralSection>
      <AddNewListButton onSetInputVisible={onSetInputVisible} />
      {isInputVisible && (
        <div className="input__wrapper">
          <ReusableImage
            src={
              savingMode === "list"
                ? `${STATIC_URLS.SVG_ICONS}/list.svg`
                : `${STATIC_URLS.SVG_ICONS}/group.svg`
            }
            alt={savingMode === "list" ? "list icon" : "group icon"}
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
      {isDataLoading ? (
        <ListkeletonsSection />
      ) : (
        <>
          <Groups groups={groupsInfo.groups} />
          <Lists lists={listsWithoutGroup} />
        </>
      )}
    </StyledGeneralSection>
  );
};

const StyledGeneralSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  max-height: 60%;

  overflow-y: scroll;

  & {
    -ms-overflow-style: none;
    scrollbar-width: none;
    overflow-y: scroll;
  }
  &::-webkit-scrollbar {
    display: none;
  }

  .input {
    margin-left: 5px;

    &__wrapper {
      width: 100%;

      display: flex;
      align-items: center;

      padding: 5px 8px;

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

export default GeneralSection;
