"use client";

import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "dayjs/locale/ru";

type ParamsType = {
  name: string;
  value?: Date;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  className?: string;
};

const PlannedDateSelector: React.FC<ParamsType> = (props) => {
  const datepickerValue = dayjs(props.value);

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    const formattedDate = newValue ? newValue.toDate() : null;
    props.setFieldValue(props.name, formattedDate);
  };

  return (
    <StyledPlannedDateSelector id={props.name} className={props.className}>
      <span className="selector__title">Запланировать</span>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <DatePicker
          defaultValue={dayjs(new Date())}
          onChange={handleDateChange}
          value={datepickerValue}
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
    &__title {
      color: ${(props) => props.theme.colorValues.darkGrey};
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
