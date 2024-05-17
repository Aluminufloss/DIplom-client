"use client";

import Skeleton from "@mui/material/Skeleton";
import styled from "styled-components";

const TaskSkeleton: React.FC = () => {
  return (
    <StyledTaskSkeleton>
      <Skeleton
        variant="rectangular"
        width={24}
        height={24}
        animation="wave"
        className="checkbox"
      />
      <Skeleton variant="text" animation="wave" className="text" />
    </StyledTaskSkeleton>
  );
};

const StyledTaskSkeleton = styled.div`
  width: 100%;

  display: flex;
  align-items: center;

  padding: 16px 20px;

  background-color: ${(props) => props.theme.colorValues.white};

  border: 1px solid ${(props) => props.theme.colorValues.lightGrey};
  border-radius: 5px;

  .checkbox {
    border-radius: 5px;

    margin-right: 16px;
  }

  .text {
    max-width: 220px;
    width: 100%;

    line-height: 24px;

    border-radius: 5px;
  }
`;

export default TaskSkeleton;
