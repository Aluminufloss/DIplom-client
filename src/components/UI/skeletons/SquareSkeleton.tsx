"use client";

import styled from "styled-components";
import { SkeletonAnimation } from "../animations/SkeletonAnimation";

type PropsType = {
  className?: string;
};

const SquareSkeleton: React.FC<PropsType> = (props) => {
  return (
    <StyledSkeleton
      className={props.className}
    >
      Skeleton
    </StyledSkeleton>
  );
};

const StyledSkeleton = styled.div`
  width: 100%;

  padding: 16px 20px;

  border-radius: 5px;
  color: transparent;

  animation: 1s ${SkeletonAnimation} linear infinite alternate;
`;

export default SquareSkeleton;
