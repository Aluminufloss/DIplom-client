import React from "react";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import classNames from "classnames";

import { STATIC_URLS } from "@/utils/constant";
import { getPageType } from "@/utils/getPageType";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";

import {
  sortTasksByCategory,
  sortTasksByDate,
  sortTasksByPriority,
  sortTasksByTitle,
} from "@/store/slices/Tasks";

import ReusableImage from "../UI/image";

type PropsType = {
  isModalVisible: boolean;
};

const FiltersModal: React.FC<PropsType> = (props) => {
  const [activeFilterNumber, setActiveFilterNumber] = React.useState(0);
  const path = usePathname();
  const pageType = getPageType(path);

  const dispatch = useAppDispatch();

  return (
    <StyledFiltersModal $isModalVisible={props.isModalVisible}>
      <li
        className={classNames(
          "filters__item",
          activeFilterNumber === 0 && "filters__item--active"
        )}
        onClick={() => {
          dispatch(sortTasksByDate({ pageType }));
          setActiveFilterNumber(0);
        }}
      >
        <ReusableImage
          src={`${STATIC_URLS.SVG_ICONS}/today.svg`}
          alt="calendar icon"
          width={16}
          height={16}
          className="icon"
        />
        По дате
      </li>
      <li
        className={classNames(
          "filters__item",
          activeFilterNumber === 1 && "filters__item--active"
        )}
        onClick={() => {
          dispatch(sortTasksByTitle({ pageType }));
          setActiveFilterNumber(1);
        }}
      >
        <ReusableImage
          src={`${STATIC_URLS.SVG_ICONS}/alphabet.svg`}
          alt="calendar icon"
          width={16}
          height={16}
          className="icon"
        />
        По алфавиту
      </li>
      <li
        className={classNames(
          "filters__item",
          activeFilterNumber === 2 && "filters__item--active"
        )}
        onClick={() => {
          dispatch(sortTasksByPriority({ pageType }));
          setActiveFilterNumber(2);
        }}
      >
        <ReusableImage
          src={`${STATIC_URLS.SVG_ICONS}/exclamation_mark.svg`}
          alt="calendar icon"
          width={16}
          height={16}
          className="icon"
        />
        По приоритету
      </li>
      <li
        className={classNames(
          "filters__item",
          activeFilterNumber === 3 && "filters__item--active"
        )}
        onClick={() => {
          dispatch(sortTasksByCategory({ pageType }));
          setActiveFilterNumber(3);
        }}
      >
        <ReusableImage
          src={`${STATIC_URLS.SVG_ICONS}/category.svg`}
          alt="calendar icon"
          width={16}
          height={16}
          className="icon"
        />
        По категории
      </li>
    </StyledFiltersModal>
  );
};

const StyledFiltersModal = styled.ul<{ $isModalVisible: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  top: calc(100% + 1px);
  left: 0;
  z-index: ${(props) => (props.$isModalVisible ? "100" : "-1")};

  width: 100%;

  visibility: ${(props) => (props.$isModalVisible ? "visible" : "hidden")};
  opacity: ${(props) => (props.$isModalVisible ? "1" : "0")};

  background-color: ${(props) => props.theme.colorValues.white};

  border: 1px solid ${(props) => props.theme.colorValues.lightGrey};
  border-top: none;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;

  box-shadow: rgba(192, 194, 195, 0.1) 0px 8px 24px;

  transition: visibility 0.3s ease, opacity 0.3s ease;

  & li:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.colorValues.lightGrey};
  }

  .filters__item {
    display: flex;
    align-items: center;

    ${(props) => props.theme.typography.fnLabel2};
    ${(props) => props.theme.typography.fnMedium};
    color: ${(props) => props.theme.colorValues.black};

    width: 100%;

    padding: 8px 10px;

    transition: background-color 0.3s ease;

    &:hover,
    &--active {
      background-color: ${(props) => props.theme.colorValues.strokeGrey};
    }
  }

  .icon {
    margin-right: 8px;
  }
`;

export default FiltersModal;
