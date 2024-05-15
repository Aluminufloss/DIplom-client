"use client";

import styled, { useTheme } from "styled-components";
import * as React from "react";

import { GraphSectionType, TasksAnalyticsType } from "@/models";

import { PieChart } from "@mui/x-charts/PieChart";
import { makeGraphSections } from "./utils/makeGraphSections";

type PropsTYpe = {
  tasksInfo?: TasksAnalyticsType;
};

const GraphSection: React.FC<PropsTYpe> = (props) => {
  const [graphSections, setGraphSections] = React.useState<GraphSectionType[]>(
    []
  );
  const theme = useTheme();

  React.useEffect(() => {
    if (props.tasksInfo) {
      const graphSectionsData = makeGraphSections(props.tasksInfo);
      setGraphSections(graphSectionsData);
    }
  }, [props.tasksInfo]);

  return (
    <StyledGraphSection>
      <PieChart
        series={[
          {
            data: graphSections,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        slotProps={{
          legend: { hidden: true },
        }}
        colors={[theme.colorValues.green, theme.colorValues.primary, theme.colorValues.error]}
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

  background-color: ${(props) => props.theme.colorValues.sidebarWhite};
  border-radius: 5px;

  padding: 24px;

  flex-grow: 1;

  .graph {
    width: 800px;
    height: 600px;
  }
`;

export default GraphSection;
