import React from "react";
import styled from "styled-components";

import { STATIC_URLS } from "@/utils/constant";

import ReusableImage from "@/components/UI/image";
import UserDropDownMenu from "../UserDropDownMenu";

const UserBlock: React.FC = (props) => {
  const [isDropdownMenuVisible, setIsDropdownMenuVisible] =
    React.useState(false);

  return (
    <StyledUserButton>
      <p className="title">Title text</p>
      <div className="image__wrapper"  onClick={() => setIsDropdownMenuVisible((prev) => !prev)}>
        <ReusableImage
          src={`${STATIC_URLS.BACKGROUND}/user_default.png`}
          alt="User icon"
          width={24}
          height={24}
          className="image"
        />
      </div>
      {isDropdownMenuVisible && <UserDropDownMenu />}
    </StyledUserButton>
  );
};

const StyledUserButton = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

  position: relative;

  .image {
    border-radius: 50px;

    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }

    &__wrapper {
      width: 24px;
      height: 24px;

      user-select: none;
    }
  }

  .title {
    ${(props) => props.theme.typography.fnTitle1};
    ${(props) => props.theme.typography.fnSemiBold};
    color: ${(props) => props.theme.colorValues.black};

    max-width: 220px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    margin-right: 8px;
  }
`;

export default UserBlock;
