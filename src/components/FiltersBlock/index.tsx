import React from "react";
import styled from "styled-components";

import FilterIcon from "./FilterIcon";
import FiltersModal from "./FiltersModal";

type PropsType = {
  className?: string;
};

const FiltersBlock: React.FC<PropsType> = (props) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  return (
    <StyledFilters
      className={props.className}
      onMouseEnter={() => setIsModalVisible(true)}
      onMouseLeave={() => setIsModalVisible(false)}
    >
      <FilterIcon className="filters__icon" />
      <span className="filters__text">Фильтры</span>
      <FiltersModal isModalVisible={isModalVisible} />
    </StyledFilters>
  );
};

const StyledFilters = styled.div`
  display: flex;
  align-items: center;
  align-self: center;

  position: relative;

  padding: 5px 10px;

  border-radius: 5px;
  border: 1px solid transparent;

  cursor: pointer;

  transition: all 0.3s ease;

  .filters {
    &__text {
      ${(props) => props.theme.typography.fnTitle2}
      ${(props) => props.theme.typography.fnMedium};
      color: ${(props) => props.theme.colorValues.lightGrey};

      margin-left: 5px;

      user-select: none;
    }
  }

  &:hover {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    background-color: ${(props) => props.theme.colorValues.primary};

    .filters {
      &__text {
        color: ${(props) => props.theme.colorValues.white};
      }

      &__icon {
        fill: ${(props) => props.theme.colorValues.white};
      }
    }
  }

  &:active {
    transform: translateY(1px);
  }
`;

export default FiltersBlock;
