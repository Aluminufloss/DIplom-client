import React from "react";
import styled from "styled-components";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import {
  Categories,
  STATIC_URLS,
  TranslatedCategories,
} from "@/utils/constant";

import ReusableImage from "@/components/UI/image";

type ParamsType = {
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => void;
  value?: string;
  className?: string;
};

type CategoryOptionType = {
  title: string;
  value: string;
  inputValue?: string;
};

const CategorySelector: React.FC<ParamsType> = (props) => {
  const [value, setValue] = React.useState<CategoryOptionType | null>(null);

  React.useEffect(() => {
    const categoryIndex = Categories.findIndex((item) => item === props.value);

    if (categoryIndex !== -1) {
      setValue({
        title: TranslatedCategories[categoryIndex],
        value: Categories[categoryIndex],
      });
    }
  }, [props.value]);

  return (
    <StyledCategorySelector className={props.className}>
      <div className="selector__main-title">
        <ReusableImage
          src={`${STATIC_URLS.SVG_ICONS}/category.svg`}
          alt="Category icon"
          className="selector__icon"
          width={36}
          height={36}
        />
        <span className="selector__title">Выберите категорию</span>
      </div>
      <Autocomplete
        value={value}
        defaultValue={{
          title: TranslatedCategories[TranslatedCategories.length - 1],
          value: Categories[Categories.length - 1],
        }}
        onChange={(_, newValue) => {
          if (newValue && typeof newValue === "string") {
            const categoryIndex = TranslatedCategories.findIndex(
              (item) => item === newValue
            );

            if (categoryIndex !== -1) {
              const selectedCategory = {
                title: TranslatedCategories[categoryIndex],
                value: Categories[categoryIndex],
              };
              setValue(selectedCategory);
              props.setFieldValue("taskInfo.category", selectedCategory.value);
            }
          } else if (newValue && typeof newValue === "object") {
            setValue(newValue);
            props.setFieldValue("taskInfo.category", newValue.value);
          } else {
            setValue({
              title: TranslatedCategories[TranslatedCategories.length - 1],
              value: Categories[Categories.length - 1],
            });
            props.setFieldValue(
              "taskInfo.category",
              Categories[Categories.length - 1]
            );
          }
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={Categories.map((category, index) => ({
          title: TranslatedCategories[index],
          value: category,
        }))}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.title
        }
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        className="selector__autocomplete"
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="Созданные категории"
            className="selector__input"
          />
        )}
      />
    </StyledCategorySelector>
  );
};

const StyledCategorySelector = styled.div`
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

export default CategorySelector;
