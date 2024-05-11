"use client";

import styled, { useTheme } from "styled-components";
import * as React from "react";
import { PieChart } from '@mui/x-charts/PieChart';

const GraphSection: React.FC = () => {
  const theme = useTheme();

  return (
    <StyledGraphSection>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10 },
              { id: 1, value: 15 },
              { id: 2, value: 200 },
            ],
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          },
        ]}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        width={700}
        height={450}
        className="graph"
      />
    </StyledGraphSection>
  );
};

const StyledGraphSection = styled.div`
  height: 100%;
  max-width: 70%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${props => props.theme.colorValues.sidebarWhite};
  border-radius: 5px;

  padding: 24px;

  flex-grow: 1;

  .graph {
    width: 800px;
    height: 600px;
  }
`;

export default GraphSection;
