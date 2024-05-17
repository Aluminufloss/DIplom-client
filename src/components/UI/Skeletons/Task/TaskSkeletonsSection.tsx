"use client";

import styled from "styled-components";

import TaskSkeleton from "./TaskSkeleton";

const TaskSkeletonsSection: React.FC = () => {
  return (
    <StyledTaskSkeletonsSection>
      {new Array(3).fill(1).map((_, i) => (
        <TaskSkeleton key={i} />
      ))}
    </StyledTaskSkeletonsSection>
  );
};

const StyledTaskSkeletonsSection = styled.section`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default TaskSkeletonsSection;
