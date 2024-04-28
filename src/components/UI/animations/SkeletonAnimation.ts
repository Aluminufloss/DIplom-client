import { keyframes } from "styled-components";

export const SkeletonAnimation = keyframes`
  0% {
    background-color: rgba(0, 0, 0, 0.05);
  }
	100% {
    background-color: rgba(0, 0, 0, 0.2);
	}
`;