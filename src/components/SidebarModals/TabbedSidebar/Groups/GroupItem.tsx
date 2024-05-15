import React from "react";
import styled from "styled-components";

import ReusableImage from "@/components/UI/image";
import { STATIC_URLS } from "@/utils/constant";
import Lists from "../Lists";
import { GroupType } from "@/models";

type PropsType = {
  group: GroupType;
  className?: string;
  onAddListToGroup: () => void;
  onClick: (buttonPosition: number, groupId: string) => void;
};

const ITEM_HEIGHT = 34;

const GroupItem: React.FC<PropsType> = (props) => {
  const itemRef = React.useRef<HTMLLIElement>(null);

  const handleDeleteGroup = React.useCallback((event: React.MouseEvent) => {
    const itemOffset = itemRef.current?.offsetTop || 0;
    props.onClick(itemOffset + ITEM_HEIGHT, props.group?.id);
    event.stopPropagation();
  }, []);

  return (
    <div className="wrapper">
      <StyledGroupItem className={props.className} ref={itemRef}>
        <ReusableImage
          src={`${STATIC_URLS.SVG_ICONS}/group.svg`}
          alt="Group icon"
          className="icon"
        />
        <p className="title">{props.group.name}</p>
        <div className="group__actions">
          <ReusableImage
            width={20}
            height={20}
            src={`${STATIC_URLS.SVG_ICONS}/delete.svg`}
            alt="Delete icon"
            onClick={handleDeleteGroup}
            className="icon__delete"
          />
          <ReusableImage
            width={20}
            height={20}
            src={`${STATIC_URLS.SVG_ICONS}/plus.svg`}
            alt="Add list icon"
            onClick={() => props.onAddListToGroup()}
            className="icon__plus"
          />
        </div>
      </StyledGroupItem>
      <Lists lists={props.group.lists} isInsideGroup/>
    </div>
  );
};

const StyledGroupItem = styled.li`
  width: 100%;
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;

  border-radius: 5px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  border-left: 4px solid ${(props) => props.theme.colorValues.lightGrey};

  padding: 5px 8px;

  transition: all 0.5s ease;

  cursor: pointer;

  .wrapper {
    height: 100%;
  }

  .icon {
    transform: translateY(1px);

    &__plus {
      position: absolute;
      right: 32px;
      top: 7px;

      opacity: 0;

      transition: opacity 0.3s ease;
    }

    &__delete {
      position: absolute;
      right: 8px;
      top: 7px;

      opacity: 0;

      transition: opacity 0.3s ease;
    }
  }

  .title {
    ${(props) => props.theme.typography.fnTitle1};
    ${(props) => props.theme.typography.fnMedium};
    color: ${(props) => props.theme.colorValues.black};

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    margin-left: 5px;
    margin-right: 52px;
  }

  &:hover {
    background-color: ${(props) => props.theme.colorValues.lightGrey};

    .icon__delete,
    .icon__plus {
      opacity: 1;
    }
  }
`;

export default GroupItem;
