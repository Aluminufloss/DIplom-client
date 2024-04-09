import { keyframes } from "styled-components";

export const loadingAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(100%);
  }
  50% {
    transform: translateY(0);
  }
	60% {
		transform: translateY(50%);
	}
	65% {
		transform: translateY(0);
	}
	70% {
		transform: translateY(25%);
	}
	75% {
		transform: translateY(0);
	}
	80% {
		transform: translateY(12.5%);
	}
	85% {
		transform: translateY(0);
	}
	90% {
		transform: translateY(6.25%);
	}
	100% {
		transform: translateY(0);
	}
`;