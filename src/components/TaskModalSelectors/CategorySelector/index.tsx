"use client"

import React from "react";
import styled from "styled-components";

import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

type ParamsType = {
  className?: string;
};

const filter = createFilterOptions<FilmOptionType>();

const CategorySelector: React.FC<ParamsType> = (props) => {
  const [value, setValue] = React.useState<FilmOptionType | null>(null);

  return (
    <StyledListSelector className={props.className}>
      <span className="selector__title">Выбери категорию</span>
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
        options={top100Films}
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
          <TextField {...params} label="Созданные категории" />
        )}
      />
    </StyledListSelector>
  );
};

interface FilmOptionType {
  inputValue?: string;
  title: string;
  year?: number;
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

const top100Films: readonly FilmOptionType[] = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
];

export default CategorySelector;
