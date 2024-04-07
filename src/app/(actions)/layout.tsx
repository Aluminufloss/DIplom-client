"use client";

import { STATIC_URLS } from "@/utils/constant";
import media from "@/utils/media";
import Image from "next/image";
import styled from "styled-components";

export default function FormsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StyledFormsLayout>
      <div className="image__container">
        <Image
          src={`${STATIC_URLS.BACKGROUND}/actions_background.png`}
          alt="Actions background"
          fill
        />
      </div>
      <div className="content">{children}</div>
    </StyledFormsLayout>
  );
}

const StyledFormsLayout = styled.div`
  width: 100%;
  height: 100%;

  display: flex;

  background-color: ${(props) => props.theme.colorValues.white};

  .image__container {
    position: relative;

    width: 66%;
    height: 100%;
  }

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

    .image__container {
      width: 0;
    }
  }

  ${media.desktop} {
    padding: 28px 24px;

    .content {
      padding: 0;
    }
  }
`;
