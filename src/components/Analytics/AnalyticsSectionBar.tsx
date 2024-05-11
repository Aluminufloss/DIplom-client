import styled from "styled-components";

const AnalyticsSectionBar: React.FC = () => {
  return (
    <StyledAnalyticsSectionBar>
      <h3 className="analytics__title">Аналитика</h3>
    </StyledAnalyticsSectionBar>
  );
};

const StyledAnalyticsSectionBar = styled.section`
  width: 100%;

  background-color: red;

  display: flex;
  align-items: center;

  padding: 12px 16px;

  margin-bottom: 20px;

  background-color: ${(props) => props.theme.colorValues.sidebarWhite};

  border: 1px solid ${(props) => props.theme.colorValues.lightGrey};
  border-radius: 5px;

  .analytics {
    &__title {
      ${(props) => props.theme.typography.fnTitle3}
      ${(props) => props.theme.typography.fnSemiBold};
      color: ${(props) => props.theme.colorValues.primary};
    }
  }
`;

export default AnalyticsSectionBar;
