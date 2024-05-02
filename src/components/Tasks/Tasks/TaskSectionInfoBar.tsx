"use client";

import React from "react";
import styled from "styled-components";
import { SectionEnum } from "./models";
import { format } from "date-fns/format";

type PropsType = {
  sectionType: SectionEnum;
  listName?: string;
};

export const TaskSectionInfoBar: React.FC<PropsType> = (props) => {
  const todayDate = format(new Date(), "EEE dd.MM.yyyy");

  return (
    <StyledTaskSectionInfoBar>
      <p className="info-bar__title">{props.sectionType}</p>
      {props.listName && <span className="info-bar__list">{props.listName}</span>}
      <span className="info-bar__date">{todayDate}</span>
    </StyledTaskSectionInfoBar>
  );
};

const StyledTaskSectionInfoBar = styled.div`
  width: 100%;

  margin-bottom: 20px;

  display: flex;
  align-items: flex-end;

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
  }
`;

export default TaskSectionInfoBar;
