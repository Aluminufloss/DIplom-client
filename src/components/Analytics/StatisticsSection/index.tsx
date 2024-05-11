"use client";

import styled from "styled-components";
import ProgressBlock from "./ProgressBlock";

const StatisticsSection: React.FC = () => {
  return (
    <StyledStatisticsSection>
      <ProgressBlock />
    </StyledStatisticsSection>
  );
};

const StyledStatisticsSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  background-color: ${(props) => props.theme.colorValues.sidebarWhite};
  border-radius: 5px;

  padding: 24px;

  & {
    -ms-overflow-style: none;
    overflow-x: hidden;
    scrollbar-width: none;
    overflow-y: scroll;
  }
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default StatisticsSection;
