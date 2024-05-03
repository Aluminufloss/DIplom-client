"use client"

import Link from "next/link";
import styled from "styled-components";

import { AppPaths } from "@/utils/constant";

const NotFound: React.FC = () => {
  return (
    <StyledError>
      <h2 className="title">404 Не найдено</h2>
      <p className="description">Страницы с данным списком не существует.</p>
      <Link href={AppPaths.tasksToday} className="link">Вернуться назад</Link>
    </StyledError>
  );
};

const StyledError = styled.div`
  width: 100%;
  height: 100%;
  max-width: 540px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 72px auto 0;
  padding: 24px;

  border: 1px solid ${(props) => props.theme.colorValues.lightGrey};
  border-radius: 5px;

  box-shadow: 2px 2px 50px 0px rgba(0, 0, 0, 0.05);

  .title {
    ${(props) => props.theme.typography.fnTitle3};
    ${(props) => props.theme.typography.fnMedium};
    ${(props) => props.theme.colorValues.black};

    margin-bottom: 24px;
    margin-top: 32px;
  }

  .description {
    ${(props) => props.theme.typography.fnTitle2};
    ${(props) => props.theme.typography.fnRegular};
    ${(props) => props.theme.colorValues.black};

    max-width: 100%;

    margin-bottom: 24px;
  }

  .link {
    ${(props) => props.theme.typography.fnTitle2};
    ${(props) => props.theme.typography.fnRegular};
    color: ${(props) => props.theme.colorValues.white};

    background-color: ${(props) => props.theme.colorValues.primary};

    border: 1px solid ${(props) => props.theme.colorValues.lightGrey};
    border-radius: 5px;

    padding: 8px 16px;
    margin-bottom: 16px;

    transition: transform .3s ease;

    &:hover {
      transform: scale(1.02);
    }
  }
`;

export default NotFound;
