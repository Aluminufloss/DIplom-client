import styled from "styled-components";

import LinearProgressBar from "@/components/UI/LinearProgressBar";

type PropsType = {
  label: string;
  value: number;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  className?: string;
};

const ProgressBar: React.FC<PropsType> = (props) => {
  return (
    <StyledProgressBar>
      <span className="progress__label">{props.label}</span>
      <LinearProgressBar value={props.value} color={props.color} />
    </StyledProgressBar>
  );
};

const StyledProgressBar = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 12px;

  .progress__label {
    color: ${(props) => props.theme.colorValues.black};
    ${(props) => props.theme.typography.fnLabel2};
    ${(props) => props.theme.typography.fnMedium};
  }
`;

export default ProgressBar;
