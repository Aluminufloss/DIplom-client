import styled from "styled-components";

const EmptySearchCard: React.FC = () => {
  return (
    <StyledEmptySearchCard>
      <h2 className="title">По вашему запросу не найдено ни одной задачи</h2>
    </StyledEmptySearchCard>
  );
};

const StyledEmptySearchCard = styled.div`
  width: 100%;
  height: 100%;
  max-height: 360px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  border-radius: 5px;

  background-color: ${(props) => props.theme.colorValues.sidebarWhite};

  .title {
    ${(props) => props.theme.typography.fnTitle3}
    ${(props) => props.theme.typography.fnSemiBold};
    color: ${(props) => props.theme.colorValues.primary};

    z-index: 2;
  }

  .icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    z-index: 1;
  }
`;

export default EmptySearchCard;
