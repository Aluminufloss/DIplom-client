import React from "react";
import styled from "styled-components";
import Link from "next/link";

import { STATIC_URLS } from "@/utils/constant";

import ReusableImage from "../image";

type PropsType = {
  href: string;
  type: "small" | "medium" | "big";
  alt: string;
  className?: string;
};

const imagePaths = {
  big: `${STATIC_URLS.LOGO}/logo_big.png`,
  medium: `${STATIC_URLS.LOGO}/logo_big.png`,
  small: `${STATIC_URLS.LOGO}/logo_big.png`,
};

const LogoLink: React.FC<PropsType> = (props) => {
  const imagePath = imagePaths[props.type];

  return (
    <StyledLogo href={props.href}>
      <ReusableImage src={imagePath} alt={props.alt} width={180} height={40} />
    </StyledLogo>
  );
};

const StyledLogo = styled(Link)`
  margin: 0 auto;
`;

export default LogoLink;
