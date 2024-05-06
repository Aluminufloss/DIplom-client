import styled from "styled-components";

type PropsType = {
  isModalVisible: boolean;
}

const FiltersModal: React.FC<PropsType> = (props) => {
  return (
    <StyledFiltersModal $isModalVisible={props.isModalVisible}>
      <li className="filters__item">По дате</li>
      <li className="filters__item">По категории</li>
      <li className="filters__item">По алфавиту</li>
    </StyledFiltersModal>
  )
};

const StyledFiltersModal = styled.ul<{ $isModalVisible: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  top: calc(100% + 1px);
  left: 0;
  z-index: ${(props) => props.$isModalVisible ? "100" : "-1"};

  width: 100%;

  visibility: ${(props) => props.$isModalVisible ? "visible" : "hidden"};
  opacity: ${(props) => props.$isModalVisible ? "1" : "0"};

  background-color: ${(props) => props.theme.colorValues.white};

  border: 1px solid ${(props) => props.theme.colorValues.lightGrey};
  border-top: none;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;

  box-shadow: rgba(192, 194, 195, 0.1) 0px 8px 24px;

  transition: visibility 0.3s ease, opacity 0.3s ease;

  & li:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.colorValues.lightGrey};
  }

  .filters__item {
    ${(props) => props.theme.typography.fnLabel2};
    ${(props) => props.theme.typography.fnMedium};
    color: ${(props) => props.theme.colorValues.black};

    width: 100%;

    padding: 8px 10px;

    transition: background-color .3s ease;

    &:hover {
      background-color: ${(props) => props.theme.colorValues.strokeGrey};
    }
  }
`;

export default FiltersModal;