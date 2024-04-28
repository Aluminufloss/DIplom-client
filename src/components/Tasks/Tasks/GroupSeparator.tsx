import styled from "styled-components";

type PropsType = {
  title: string;
  onClick: () => void;
};

const GroupSeparator: React.FC<PropsType> = (props) => {
  return (
    <StyledGroupSeparator onClick={props.onClick}>
      {props.title}
    </StyledGroupSeparator>
  );
};

const StyledGroupSeparator = styled.div`
  ${(props) => props.theme.typography.fnTitle2}
  ${(props) => props.theme.typography.fnMedium};
  color: ${(props) => props.theme.colorValues.primary};

  width: 100%;

  margin-bottom: 20px;

  display: flex;
  align-items: flex-end;

  padding: 12px 16px;

  background-color: ${(props) => props.theme.colorValues.sidebarWhite};

  border: 1px solid ${(props) => props.theme.colorValues.lightGrey};
  border-radius: 5px;

  cursor: pointer;
`;

export default GroupSeparator;
