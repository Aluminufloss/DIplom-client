"use client";

import React from "react";
import styled from "styled-components";
import "dayjs/locale/ru";
import dayjs from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { STATIC_URLS } from "@/utils/constant";

import ReusableImage from "@/components/UI/image";

type ParamsType = {
  name: string;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => void;
  value?: string;
  className?: string;
};

const PlannedDateSelector: React.FC<ParamsType> = (props) => {
  const datepickerValue = dayjs(props.value);

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    props.setFieldValue(
      props.name,
      newValue?.toISOString() ?? new Date().toLocaleDateString()
    );
  };

  return (
    <StyledPlannedDateSelector id={props.name} className={props.className}>
      <div className="selector__main-title">
        <ReusableImage
          src={`${STATIC_URLS.SVG_ICONS}/clock.svg`}
          alt="Planned icon"
          className="selector__icon"
        />
        <span className="selector__title">Запланировать</span>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <DatePicker
          defaultValue={dayjs(new Date())}
          onChange={handleDateChange}
          value={datepickerValue}
          className="selector__datepicker"
          disablePast
        />
      </LocalizationProvider>
    </StyledPlannedDateSelector>
  );
};

const StyledPlannedDateSelector = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .selector {
    &__main-title {
      display: flex;
      align-items: center;
    }

    &__datepicker {
      width: 100%;
      max-width: 300px;

      & .Mui-focused {
        & fieldset {
          border-color: ${(props) => props.theme.colorValues.primary};
        }
      }

      & div {
        border-radius: 5px;
      }

      & input {
        padding: 12px 16px;

        &::selection {
          color: ${(props) => props.theme.colorValues.white};
          background-color: ${(props) => props.theme.colorValues.primary};
        }
      }
    }

    &__icon {
      margin-right: 12px;
    }

    &__title {
      color: ${(props) => props.theme.colorValues.black};
      ${(props) => props.theme.typography.fnTitle1};
      ${(props) => props.theme.typography.fnMedium};
    }

    &__timepicker {
      width: 100%;
      max-width: 240px;

      border: 1px solid ${(props) => props.theme.colorValues.lightGrey};
      border-radius: 5px;

      margin-left: 12px;
      padding: 0 12px;

      &::placeholder {
        color: ${(props) => props.theme.colorValues.darkGrey};
        ${(props) => props.theme.typography.fnLabel2};
        ${(props) => props.theme.typography.fnMedium};
      }
    }
  }
`;

export default PlannedDateSelector;
