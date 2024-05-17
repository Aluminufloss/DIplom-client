"use client";

import Skeleton from "@mui/material/Skeleton";
import styled from "styled-components";

const ListSkeleton: React.FC = () => {
  return (
    <StyledListSkeleton>
      <Skeleton
        variant="rectangular"
        width={5}
        height={34}
        animation="wave"
        className="border"
      />
      <Skeleton
        variant="rectangular"
        width={24}
        height={24}
        animation="wave"
        className="checkbox"
      />
      <Skeleton variant="text" animation="wave" className="text" />
    </StyledListSkeleton>
  );
};

const StyledListSkeleton = styled.div`
  width: 100%;
  max-height: 34px;

  display: flex;
  align-items: center;

  padding: 5px 10px 5px 0;

  .border {
    margin-right: 10px;
  }

  .checkbox {
    border-radius: 5px;
  }

  .text {
    width: 60%;

    line-height: 24px;
    margin-left: 5px;

    border-radius: 5px;
  }
`;

export default ListSkeleton;
