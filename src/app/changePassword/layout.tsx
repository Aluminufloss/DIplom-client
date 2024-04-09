"use client";

import React from "react";
import styled from "styled-components";

import media from "@/utils/media";

export default function FormsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StyledFormsLayout>
      <div className="content">{children}</div>
    </StyledFormsLayout>
  );
}

const StyledFormsLayout = styled.div`
  width: 100%;
  height: 100%;

  position: relative;

  display: flex;

  background-color: ${(props) => props.theme.colorValues.white};

  .content {
    flex-grow: 1;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 40px 24px;
  }

  ${media.custom(1150)} {
    justify-content: center;
    align-items: center;
  }

  ${media.desktop} {
    padding: 28px 24px;

    .content {
      padding: 0;
    }
  }
`;
