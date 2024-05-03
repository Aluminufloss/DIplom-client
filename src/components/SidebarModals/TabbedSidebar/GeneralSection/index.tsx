import React from "react";
import styled from "styled-components";

import { useAppSelector } from "@/utils/hooks/useAppSelector";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { STATIC_URLS } from "@/utils/constant";

import { addList } from "@/store/slices/Lists/thunks";
import { addGroup } from "@/store/slices/Groups/thunks";
import { openSnackbar } from "@/store/slices/Snackbar";

import LoaderWithOverlay from "@/components/UI/LoaderWIthOverlay";
import ReusableImage from "@/components/UI/image";
import AddNewListButton from "../AddNewListButton";
import CreateInput from "../CreateInput";
import Lists from "../Lists";

const GeneralSection: React.FC = () => {
  const listsInfo = useAppSelector((state) => state.lists);
  const groupsInfo = useAppSelector((state) => state.groups);

  const [savingMode, setSavingMode] = React.useState<string>("");
  const [inputValue, setInputValue] = React.useState("");
  const [isInputVisible, setIsInputVisible] = React.useState(false);

  const dispatch = useAppDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSave = React.useCallback(() => {
    if (inputValue) {
      const hasItem =
        savingMode === "list"
          ? listsInfo.lists.some((list) => list.title === inputValue)
          : groupsInfo.groups.some((group) => group.name === inputValue);

      if (hasItem) {
        dispatch(
          openSnackbar({
            title: "Ошибка",
            message:
              savingMode === "list"
                ? "Список с таким названием уже существует"
                : "Группа с таким названием уже существует",
            type: "error",
          })
        );
      } else {
        if (savingMode === "list") {
          dispatch(addList(inputValue));
        } else {
          dispatch(addGroup(inputValue));
        }
      }
    }

    setIsInputVisible(false);
    setInputValue("");
  }, [inputValue, listsInfo.lists, groupsInfo.groups, savingMode]);

  const handleClickOnEnter = React.useCallback(
    (ev: React.KeyboardEvent<HTMLInputElement>) => {
      if (ev.key === "Enter") {
        handleSave();
      }
    },
    [handleSave]
  );

  const onSetInputVisible = React.useCallback((savingMode: "list" | "group") => {
    setIsInputVisible(true);
    setSavingMode(savingMode);
  }, []);

  return (
    <StyledGeneralSection>
      <AddNewListButton onSetInputVisible={onSetInputVisible} />
      {isInputVisible && (
        <div className="input__wrapper">
          <ReusableImage
            src={`${STATIC_URLS.SVG_ICONS}/list.svg`}
            alt="List icon"
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
      <Lists lists={listsInfo.lists} />
      <LoaderWithOverlay isOpen={listsInfo.isLoading} />
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
