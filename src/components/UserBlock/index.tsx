import React from "react";
import styled from "styled-components";

import { STATIC_URLS } from "@/utils/constant";
import { useAppSelector } from "@/utils/hooks/useAppSelector";

import ReusableImage from "@/components/UI/image";
import UserDropDownMenu from "../UserDropDownMenu";

const UserBlock: React.FC = () => {
  const userInfo = useAppSelector((state) => state.userInfo);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [isDropdownMenuVisible, setIsDropdownMenuVisible] =
    React.useState(false);

  const onChangeUsername = React.useCallback(() => {}, []);

  const onCloseMenu = React.useCallback(() => {
    setIsDropdownMenuVisible(false);
  }, []);

  const setListener = React.useCallback(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        inputRef.current.autofocus = false;
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onCloseMenu]);

  return (
    <StyledUserButton>
      <div className="input__container">
        <input
          ref={inputRef}
          type="text"
          readOnly
          className="titles"
          value={userInfo.username ?? userInfo.email}
        />
        <ReusableImage 
          width={16}
          height={16}
          src={`${STATIC_URLS.SVG_ICONS}/save.svg`}
          alt="Save icon"
          className="input__save-icon"
        />
      </div>
      <div
        className="image__wrapper"
        onClick={() => setIsDropdownMenuVisible((prev) => !prev)}
      >
        <ReusableImage
          src={`${STATIC_URLS.BACKGROUND}/user_default.png`}
          alt="User icon"
          width={24}
          height={24}
          className="image"
        />
      </div>
      {isDropdownMenuVisible && (
        <UserDropDownMenu
          onChangeUsername={onChangeUsername}
          onCloseMenu={onCloseMenu}
        />
      )}
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

  .titles {
    ${(props) => props.theme.typography.fnTitle1};
    ${(props) => props.theme.typography.fnSemiBold};
    color: ${(props) => props.theme.colorValues.black};

    max-width: 220px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    margin-right: 8px;
  }

  .input__container {
    position: relative;
  }

  .input__save-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;

    cursor: pointer;

    transition: all 0.3s ease;
  }
`;

export default UserBlock;
