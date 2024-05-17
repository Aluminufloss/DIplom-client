"use client";

import styled from "styled-components";
import ListSkeleton from "./ListSkeleton";

const ListkeletonsSection: React.FC = () => {
  return (
    <StyledListSkeletonsSection>
      {new Array(3).fill(1).map((_, i) => (
        <ListSkeleton key={i} />
      ))}
    </StyledListSkeletonsSection>
  );
};

const StyledListSkeletonsSection = styled.section`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

export default ListkeletonsSection;
