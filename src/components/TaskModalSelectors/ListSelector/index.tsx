import React from "react";
import styled from "styled-components";
import { useParams } from "next/navigation";

import { TextField } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

import { useAppSelector } from "@/utils/hooks/useAppSelector";
import { STATIC_URLS } from "@/utils/constant";

import ReusableImage from "@/components/UI/image";

type ParamsType = {
  className?: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  value: string | undefined;
};

type ListOptionType = {
  listId: string;
  title: string;
  inputValue?: string;
};

const filter = createFilterOptions<ListOptionType>();

const ListSelector: React.FC<ParamsType> = (props) => {
  const listsInfo = useAppSelector((state) => state.lists.lists);
  const [listsNames, setListsNames] = React.useState<ListOptionType[]>([]);
  const [currentList, setCurrentList] = React.useState<ListOptionType>({
    listId: "",
    title: "",
  });

  const urlParams = useParams() as { slug: string };

  React.useEffect(() => {
    const updateListsNames = () => {
      const listsNames = listsInfo?.map((list) => ({
        title: list.title,
        listId: list.listId,
      })) || [];

      let selectedList;

      if (props.value) {
        selectedList = listsNames.find((list) => list.listId === props.value);
      } else if (urlParams.slug) {
        selectedList = listsNames.find(
          (list) => list.listId === urlParams.slug
        );
      }

      setCurrentList({
        title: selectedList?.title ?? "",
        listId: selectedList?.listId ?? "",
      });

      setListsNames(listsNames);
    };

    updateListsNames();
  }, [listsInfo, props.value, urlParams.slug]);

  const handleListChange = (
    _: any,
    newValue: ListOptionType | string | null
  ) => {
    if (newValue && typeof newValue === "object") {
      props.setFieldValue("taskInfo.listId", [newValue.listId]);
      setCurrentList(newValue);
    } else {
      props.setFieldValue("taskInfo.listId", []);
      setCurrentList({ listId: "", title: "" });
    }
  };

  return (
    <StyledListSelector className={props.className}>
      <div className="selector__main-title">
        <ReusableImage
          src={`${STATIC_URLS.SVG_ICONS}/list.svg`}
          alt="List icon"
          className="selector__icon"
          width={36}
          height={36}
        />
        <span className="selector__title">Выберите список</span>
      </div>
      <Autocomplete
        options={listsNames}
        value={currentList}
        onChange={handleListChange}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          const isExisting = options.some(
            (option) => inputValue === option.title
          );
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              inputValue,
              title: `Списка "${inputValue}" не существует`,
              listId: "",
            });
          }

          return filtered;
        }}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.title
        }
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Созданные списки"
            className="selector__input"
          />
        )}
        freeSolo
        selectOnFocus
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        className="selector__autocomplete"
      />
    </StyledListSelector>
  );
};

const StyledListSelector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & label {
    top: -5px;

    &.Mui-focused {
      top: 0;

      color: ${(props) => props.theme.colorValues.black};
      
      font-size: 16px;
    }
  }

  .selector {
    &__autocomplete {
      width: 100%;
      max-width: 300px;

      & .Mui-focused {
        & fieldset {
          border-color: ${(props) => props.theme.colorValues.primary};
        }
      }

      .MuiOutlinedInput-root {
        padding: 7.5px 16px;
      }

      .MuiAutocomplete-input {
        padding: 6px 0;
      }
    }

    &__main-title {
      display: flex;
      align-items: center;
    }

    &__icon {
      width: auto;
      height: auto;
      padding-right: 10px;
      margin-right: 2px;
      transform: translateY(1px);
    }

    &__title {
      color: ${(props) => props.theme.colorValues.black};
      ${(props) => props.theme.typography.fnTitle1};
      ${(props) => props.theme.typography.fnMedium};
    }
  }
`;

export default ListSelector;