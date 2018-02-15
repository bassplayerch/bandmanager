import React from "react";
import styled from "styled-components";

const GigsTable = styled.table`
  width: 100%;
  margin: 0 auto;
  border-collapse: collapse;
  border: 1px solid ${props => props.theme.colorGreyLight};
  background: ${props => props.theme.colorPrimary};
  & th {
    background: ${props => props.theme.colorPrimary};
    padding: 1rem 2rem;
    font-weight: 400;
    font-size: 1.8rem;
    color: ${props => props.theme.colorWhite};
  }
`;

const gigsTable = props => {
  return (
    <GigsTable>
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Location</th>
          <th>Comments</th>
          <th />
          <th />
        </tr>
      </thead>
      {props.children}
    </GigsTable>
  );
};

export default gigsTable;
