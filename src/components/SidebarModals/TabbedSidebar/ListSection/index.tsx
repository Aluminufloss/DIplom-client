import React from "react";
import styled from "styled-components";
import { useAppSelector } from "@/utils/hooks/useAppSelector";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { STATIC_URLS } from "@/utils/constant";

import { addList } from "@/store/slices/Lists/thunks";

import LoaderWithOverlay from "@/components/UI/LoaderWIthOverlay";
import ReusableImage from "@/components/UI/image";
import AddNewListButton from "../AddNewListButton";
import Lists from "../Lists";
import { openSnackbar } from "@/store/slices/Snackbar";

const ListSection: React.FC = () => {
  const listsInfo = useAppSelector((state) => state.lists);

  const [inputValue, setInputValue] = React.useState("");
  const [isInputVisible, setIsInputVisible] = React.useState(false);

  const dispatch = useAppDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSaveList = React.useCallback(() => {
    if (inputValue) {
      const listAlreadyExists = listsInfo.lists.some(
        (list) => list.title === inputValue
      );

      if (listAlreadyExists) {
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
  }, [inputValue, listsInfo.lists]);

  const handleClickOnEnter = React.useCallback(
    (ev: React.KeyboardEvent<HTMLInputElement>) => {
      if (ev.key === "Enter") {
        handleSaveList();
      }
    },
    [handleSaveList]
  );

  const onSetInputVisible = React.useCallback(() => {
    setIsInputVisible(true);
  }, []);

  return (
    <StyledListSection>
      <AddNewListButton setInputVisible={onSetInputVisible} />
      {isInputVisible && (
        <div className="input__wrapper">
          <ReusableImage
            src={`${STATIC_URLS.SVG_ICONS}/list.svg`}
            alt="List icon"
            className="input__icon"
          />
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleSaveList}
            onKeyDown={handleClickOnEnter}
            className="input"
            autoFocus
          />
        </div>
      )}
      <Lists lists={listsInfo.lists} />
      <LoaderWithOverlay isOpen={listsInfo.isLoading} />
    </StyledListSection>
  );
};

const StyledListSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  max-height: 60%;

  .input {
    margin-left: 5px;

    width: 100%;

    background-color: ${(props) => props.theme.colorValues.sidebarWhite};

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

export default ListSection;
