"use client";

import React from "react";
import styled from "styled-components";

import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { STATIC_URLS } from "@/utils/constant";

import ReusableImage from "@/components/UI/image";

type ParamsType = {
  className?: string;
};

const filter = createFilterOptions<FilmOptionType>();

const CategorySelector: React.FC<ParamsType> = (props) => {
  const [value, setValue] = React.useState<FilmOptionType | null>(null);

  return (
    <StyledListSelector className={props.className}>
      <div className="selector__main-title">
        <ReusableImage
          src={`${STATIC_URLS.SVG_ICONS}/category.svg`}
          alt="Category icon"
          className="selector__icon"
        />
        <span className="selector__title">Выберите категорию</span>
      </div>
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
        className="selector__autocomplete"
        renderInput={(params) => (
          <TextField
            {...params}
            label="Созданные категории"
            className="selector__input"
          />
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

  & label {
    top: -6px;

    &.Mui-focused {
      color: ${(props) => props.theme.colorValues.primary};
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
      margin-right: 12px;
    }

    &__title {
      color: ${(props) => props.theme.colorValues.black};
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
