"use client";

import styled from "styled-components";
import LinkButton from "../UI/buttons/LinkButton";
import { AppPaths } from "@/utils/constant";

const EmptySection: React.FC = () => {
  return (
    <StyledEmptySection>
      <div className="content">
        <h2 className="title">У вас нету задач для отображения</h2>
        <p className="description">
          Вы можете создать задачу в разделах "Сегодня", "Запланированные" или
          "Все задачи". Так же можете создать список и создать там новую задачу.
        </p>
        <LinkButton
          className="link"
          href={AppPaths.tasksToday}
          title="Создать задачу"
        />
      </div>
    </StyledEmptySection>
  );
};

const StyledEmptySection = styled.div`
  max-width: 70%;
  max-height: 500px;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.colorValues.sidebarWhite};
  border-radius: 5px;

  padding: 24px;

  flex-grow: 1;

  .content {
    width: 90%;
    max-height: 400px;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin: 0;

    border-radius: 5px;

    background-color: ${(props) => props.theme.colorValues.white};
  }

  .title {
    ${(props) => props.theme.typography.fnTitle3};
    ${(props) => props.theme.typography.fnSemiBold};
    color: ${(props) => props.theme.colorValues.black};
    margin-bottom: 18px;
  }

  .description {
    ${(props) => props.theme.typography.fnTitle1};
    ${(props) => props.theme.typography.fnMedium};
    color: ${(props) => props.theme.colorValues.black};

    max-width: 85%;
    text-align: center;
  }

  .link {
    width: 40%;

    display: flex;
    justify-content: center;  
    align-items: center;

    margin-top: 32px;
    padding: 12px 16px;

    border-radius: 5px;

    background-color: ${(props) => props.theme.colorValues.primary};

    color: ${(props) => props.theme.colorValues.white};
    ${(props) => props.theme.typography.fnMedium};
    ${(props) => props.theme.typography.fnTitle1};

    text-decoration: none;

    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${(props) => props.theme.colorValues.orangeSecondary};
    }
  }
`;

export default EmptySection;
