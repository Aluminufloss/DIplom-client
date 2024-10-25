import styled from "styled-components";
import AnalyticsDropdown from "./StatisticsSection/AnalyticsDropdown";

const AnalyticsSectionBar: React.FC = () => {
  return (
    <StyledAnalyticsSectionBar>
      <h3 className="analytics__title">Аналитика по всем задачам</h3>
      <AnalyticsDropdown />
    </StyledAnalyticsSectionBar>
  );
};

const StyledAnalyticsSectionBar = styled.section`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

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
