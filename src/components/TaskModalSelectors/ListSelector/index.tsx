import React from "react";
import styled from "styled-components";

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
  const [currentList, setCurrentList] = React.useState({} as ListOptionType);

  React.useEffect(() => {
    (async () => {
      const listsNames = listsInfo?.map((list) => {
        return {
          title: list.title,
          listId: list.listId,
        };
      });

      const currentList = listsNames.find(
        (list) => list.listId === props.value
      );

      setCurrentList({
        title: currentList?.title ?? "",
        listId: props.value ?? "",
      });
      setListsNames(listsNames);
    })();
  }, [listsInfo, props.value]);

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
        value={{
          title: currentList?.title ?? "",
          listId: props.value ?? "",
        }}
        defaultValue={{
          title: "",
          listId: "",
        }}
        onChange={(_, newValue) => {
          if (newValue) {
            props.setFieldValue("taskInfo.listId", [newValue.listId]);
          } else {
            props.setFieldValue("taskInfo.listId", []);
          }
        }}
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
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.title;
        }}
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
    top: -4px;

    &.Mui-focused {
      color: ${(props) => props.theme.colorValues.black};

      font-size: 16px;

      top: 0;
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
        padding: 12px 16px 0;
      }

      .MuiAutocomplete-input {
        padding: 0 0 12px;
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
