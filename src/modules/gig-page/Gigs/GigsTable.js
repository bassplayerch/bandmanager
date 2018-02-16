import React from "react";
import styled from "styled-components";

const GigsTable = styled.table`
  width: 100%;
  min-width: 600px;
  margin: 0 auto;
  table-layout:fixed;
  border-collapse: collapse;
  background: ${props => props.theme.colorPrimary};
  & th {
    background: ${props => props.theme.colorPrimary};
    padding: 1rem 2rem;
    font-weight: 400;
    font-size: 1.8rem;
    color: ${props => props.theme.colorWhite};
  }
  & th:nth-of-type(4){
    width: 40%;
  }
  & th:nth-of-type(5){
    width: 5%;
  }  & th:nth-of-type(6){
    width: 5%;
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
