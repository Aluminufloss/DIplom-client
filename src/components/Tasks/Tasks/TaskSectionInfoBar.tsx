"use client";

import React from "react";
import styled from "styled-components";
import { SectionEnum } from "./models";
import { format } from "date-fns/format";

type PropsType = {
  sectionType: SectionEnum;
};

export const TaskSectionInfoBar: React.FC<PropsType> = (props) => {
  const todayDate = format(new Date(), "EEE dd.MM.yyyy");

  return (
    <StyledTaskSectionInfoBar>
      <p className="info-bar__title">{props.sectionType}</p>
      <span className="info-bar__date">{todayDate}</span>
    </StyledTaskSectionInfoBar>
  );
};

const StyledTaskSectionInfoBar = styled.div`
  width: 100%;
  max-width: 1000px;

  margin-bottom: 30px;

  display: flex;
  align-items: flex-start;

  padding: 16px 20px;

  background-color: ${(props) => props.theme.colorValues.sidebarWhite};

  border: 1px solid ${(props) => props.theme.colorValues.lightGrey};
  border-radius: 5px;

  .info-bar {
    &__title {
      ${(props) => props.theme.typography.fnTitle5}
      ${(props) => props.theme.typography.fnSemiBold};
      color: ${(props) => props.theme.colorValues.primary};
    }

    &__date {
      ${(props) => props.theme.typography.fnTitle2}
      ${(props) => props.theme.typography.fnMedium};
      color: ${(props) => props.theme.colorValues.grey};

			margin-left: 5px;
    }
  }
`;

export default TaskSectionInfoBar;
