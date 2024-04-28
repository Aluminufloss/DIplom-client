"use client";

import styled from "styled-components";

import SquareSkeleton from "./SquareSkeleton";

const TasksSkeletonSection: React.FC = () => {
  return (
    <StyledList>
      {new Array(3).fill(1).map((_, index) => (
        <SquareSkeleton key={index} />
      ))}
    </StyledList>
  );
};

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default TasksSkeletonSection;