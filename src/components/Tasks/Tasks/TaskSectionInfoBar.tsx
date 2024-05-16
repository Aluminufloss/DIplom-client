"use client";

import React from "react";
import styled from "styled-components";
import { format } from "date-fns/format";
import { setDefaultOptions } from "date-fns";
import { ru } from "date-fns/locale";

import { SectionEnum } from "./models";

import FiltersBlock from "@/components/FiltersBlock";

type PropsType = {
  sectionType: SectionEnum;
  isInsideAllTasks?: boolean;
  listName?: string;
};

export const TaskSectionInfoBar: React.FC<PropsType> = (props) => {
  setDefaultOptions({ locale: ru });

  const dateString = format(new Date(), "EEE dd.MM.yyyy");
  const todayDate = dateString[0].toUpperCase() + dateString.slice(1);

  return (
    <StyledTaskSectionInfoBar>
      <p className="info-bar__title">{props.sectionType}</p>
      {props.listName && (
        <span className="info-bar__list">{props.listName}</span>
      )}
      {!props.isInsideAllTasks && (
        <>
          <span className="info-bar__date">{todayDate}</span>
          <FiltersBlock className="info-bar__filters" />
        </>
      )}
    </StyledTaskSectionInfoBar>
  );
};

const StyledTaskSectionInfoBar = styled.div`
  width: 100%;

  margin-bottom: 20px;

  display: flex;
  align-items: center;

  padding: 12px 16px;

  background-color: ${(props) => props.theme.colorValues.sidebarWhite};

  border: 1px solid ${(props) => props.theme.colorValues.lightGrey};
  border-radius: 5px;

  .info-bar {
    &__title {
      ${(props) => props.theme.typography.fnTitle3}
      ${(props) => props.theme.typography.fnSemiBold};
      color: ${(props) => props.theme.colorValues.primary};
    }

    &__date {
      ${(props) => props.theme.typography.fnTitle2}
      ${(props) => props.theme.typography.fnMedium};
      color: ${(props) => props.theme.colorValues.grey};

      margin-left: 8px;
    }

    &__list {
      ${(props) => props.theme.typography.fnTitle3}
      ${(props) => props.theme.typography.fnMedium};
      color: ${(props) => props.theme.colorValues.grey};

      line-height: 30px;

      margin-left: 8px;
    }

    &__filters {
      margin-left: auto;
    }
  }
`;

export default TaskSectionInfoBar;
