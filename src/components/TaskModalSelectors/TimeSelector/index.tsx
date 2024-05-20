"use client";

import React from "react";
import { TextField } from "@mui/material";
import styled from "styled-components";
import ReusableImage from "@/components/UI/image";
import { STATIC_URLS } from "@/utils/constant";

import { DurationType } from "@/models";

type PropsType = {
  value?: DurationType;
  setFieldValue: (
    field: string,
    value: DurationType,
    shouldValidate?: boolean
  ) => void;
  className?: string;
};

const TimeSelector: React.FC<PropsType> = ({
  value = { hours: 0, minutes: 0 },
  setFieldValue,
  className,
}) => {
  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHours = e.target.value.replace(/^0+/, "") || "0";

    const parsedHours = parseInt(newHours, 10);

    if (!isNaN(parsedHours) && parsedHours >= 0) {
      setFieldValue("taskInfo.timeDuration", { ...value, hours: parsedHours });
    }
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinutes = e.target.value.replace(/^0+/, "") || "0";

    const parsedMinutes = parseInt(newMinutes, 10);

    if (!isNaN(parsedMinutes) && parsedMinutes >= 0 && parsedMinutes < 60) {
      setFieldValue("taskInfo.timeDuration", {
        ...value,
        minutes: parsedMinutes,
      });
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "0") {
      e.target.value = "";
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    type: "hours" | "minutes"
  ) => {
    if (e.target.value === "") {
      setFieldValue("taskInfo.timeDuration", { ...value, [type]: 0 });
    }
  };

  return (
    <StyledTimeSelector className={className}>
      <div className="selector__main-title">
        <ReusableImage
          src={`${STATIC_URLS.SVG_ICONS}/watch.svg`}
          alt="List icon"
          className="selector__icon"
        />
        <span className="selector__title">Выберите время на задачу</span>
      </div>
      <div className="selector__time-wrapper">
        <div className="selector__time-item">
          <TextField
            label="Часы"
            type="number"
            value={value.hours === 0 ? "" : value.hours}
            onChange={handleHoursChange}
            onFocus={handleFocus}
            onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
              handleBlur(event, "hours")
            }
            InputProps={{
              inputProps: { min: 0 },
            }}
            className="selector__time-item--hours"
          />
        </div>
        <div className="selector__time-item">
          <TextField
            label="Минуты"
            type="number"
            value={value.minutes === 0 ? "" : value.minutes}
            onChange={handleMinutesChange}
            onFocus={handleFocus}
            onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
              handleBlur(event, "minutes")
            }
            InputProps={{
              inputProps: { min: 0, max: 59 },
            }}
            className="selector__time-item--minutes"
          />
        </div>
      </div>
    </StyledTimeSelector>
  );
};

const StyledTimeSelector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .selector {
    &__time-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      max-width: 300px;
    }

    &__time-item {
      &--hours {
        flex: 1 1 70%;
      }

      &--minutes {
        flex: 1 1 30%;
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

export default TimeSelector;
