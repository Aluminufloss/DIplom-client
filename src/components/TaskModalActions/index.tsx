import React from "react";
import styled from "styled-components";

type PropsType = {
  type: "deleting" | "creating";
  className?: string;
};

const TaskModalActions: React.FC<PropsType> = (props) => {
  const description = React.useMemo(() => {
    return props.type === "deleting"
      ? "Вы уверены, что хотите удалить данную задачу?"
      : "Создать задание?";
  }, [props.type]);

  return <StyledModalActions>
    <p>{description}</p>
  </StyledModalActions>;
};

const StyledModalActions = styled.div``;

export default TaskModalActions;
