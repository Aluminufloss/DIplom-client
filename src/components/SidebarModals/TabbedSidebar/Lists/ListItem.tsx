import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

import ReusableImage from "@/components/UI/image";
import { AppPaths, STATIC_URLS } from "@/utils/constant";

type PropsType = {
  title: string;
  isActiveTab: boolean;
  listId: string;
  className?: string;
  onClick: (buttonPosition: number, listId: string) => void;
};

const ITEM_HEIGHT = 34;

const ListItem: React.FC<PropsType> = (props) => {
  const itemRef = React.useRef<HTMLLIElement>(null);

  const router = useRouter();

  const handleDeleteList = React.useCallback((event: React.MouseEvent) => {
    const itemOffset = itemRef.current?.offsetTop || 0;
    props.onClick(itemOffset + ITEM_HEIGHT, props.listId);
    event.stopPropagation();
  }, []);

  return (
    <StyledListItem
      className={props.className}
      $isActiveTab={props.isActiveTab}
      ref={itemRef}
      onClick={() => router.push(`${AppPaths.list}/${props.listId}`)}
    >
      <ReusableImage
        src={`${STATIC_URLS.SVG_ICONS}/list.svg`}
        alt="List icon"
        className="icon"
      />
      <p className="title">
        {props.title}
      </p>
      <ReusableImage
        width={20}
        height={20}
        src={`${STATIC_URLS.SVG_ICONS}/delete.svg`}
        alt="Delete icon"
        onClick={handleDeleteList}
        className="icon__delete"
      />
    </StyledListItem>
  );
};

const StyledListItem = styled.li<{ $isActiveTab: boolean }>`
  width: 100%;
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;

  border-radius: 5px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  border-left: 4px solid
    ${(props) =>
      props.$isActiveTab
        ? props.theme.colorValues.primary
        : props.theme.colorValues.lightGrey};

  padding: 5px 8px;

  transition: all 0.5s ease;

  cursor: pointer;

  .icon {
    transform: translateY(1px);

    &__delete {
      position: absolute;
      right: 8px;
      top: 7px;

      opacity: 0;

      margin-left: 5px;

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
    margin-right: 32px;
  }

  &:hover {
    background-color: ${(props) => props.theme.colorValues.lightGrey};

    .icon__delete {
      opacity: 1;
    }
  }
`;

export default ListItem;
