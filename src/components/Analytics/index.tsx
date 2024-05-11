"use client"

import styled from "styled-components";
import AnalyticsSectionBar from "./AnalyticsSectionBar";
import GraphSection from "./GraphSection";
import StatisticsSection from "./StatisticsSection";

const AnalyticsSection: React.FC = () => {
  return (
    <StyledAnalyticsSection>
      <AnalyticsSectionBar />
      <div className="content--analytics">
        <GraphSection />
        <StatisticsSection />
      </div>
    </StyledAnalyticsSection>
  );
}

const StyledAnalyticsSection = styled.section`
  width: 100%;

  display: flex;
  flex-direction: column;

  .content--analytics {
    display: flex;
    justify-content: space-between;
    gap: 24px;
  }
`;

export default AnalyticsSection;