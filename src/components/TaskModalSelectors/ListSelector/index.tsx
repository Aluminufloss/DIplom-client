"use client";

import React from "react";
import styled from "styled-components";

import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useAppSelector } from "@/utils/hooks/useAppSelector";

type ParamsType = {
  className?: string;
};

type ListOptionType = {
  title: string;
  inputValue?: string;
};

const filter = createFilterOptions<ListOptionType>();

const ListSelector: React.FC<ParamsType> = (props) => {
  const [value, setValue] = React.useState<FilmOptionType | null>(null);
  const listsInfo = useAppSelector((state) => state.lists.lists);
  const [listsNames, setListsNames] = React.useState<ListOptionType[]>([]);

  React.useEffect(() => {
    (async () => {
      const listsNames = listsInfo.map((list) => {
        return {
          title: list.title,
        };
      });

      setListsNames(listsNames);
    })();
  }, [listsInfo]);

  return (
    <StyledListSelector className={props.className}>
      <span className="selector__title">Выберите список</span>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setValue({
              title: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            setValue({
              title: newValue.inputValue,
            });
          } else {
            setValue(newValue);
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
              title: `Add "${inputValue}"`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={listsNames}
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
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Созданные списки" />
        )}
      />
    </StyledListSelector>
  );
};

interface FilmOptionType {
  inputValue?: string;
  title: string;
}

const StyledListSelector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .selector {
    &__title {
      color: ${(props) => props.theme.colorValues.darkGrey};
      ${(props) => props.theme.typography.fnTitle1};
      ${(props) => props.theme.typography.fnMedium};
    }
  }
`;

// const top100Films: readonly FilmOptionType[] = [
//   { title: "The Shawshank Redemption" },
//   { title: "The Godfather" },
//   { title: "The Godfather: Part II" },
// ];

export default ListSelector;
