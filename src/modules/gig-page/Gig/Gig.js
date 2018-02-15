import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import DeleteIcon from "./../../../components/DeleteIcon/DeleteIcon";
import TextButton from "./../../../components/TextButton/TextButton";

const Gig = styled.tr`
  background: ${props => props.theme.colorGreyLightest};

  & > Td {
    padding: 1rem 2rem;
    text-align: center;
  }

  &:nth-child(even) {
    background: ${props => props.theme.colorGreyMedium};
  }

  &:nth-child(odd) {
    background: ${props => props.theme.colorGreyLightest};
  }
`;

const Td = styled.td``;

const gig = props => {
  return (
    <Gig className="gig">
      <Td>{props.date}</Td>
      <Td>{props.time}</Td>
      <Td>{props.location}</Td>
      <Td>{props.comments}</Td>
      <Td>
        <TextButton clickHandler={props.editClickHandler}>edit</TextButton>
      </Td>
      <Td>
        <DeleteIcon deleteClickHandler={props.deleteClickHandler} />
      </Td>
    </Gig>
  );
};

gig.propTypes = {
  date: propTypes.string,
  time: propTypes.string,
  location: propTypes.string,
  comments: propTypes.string,
  deleteClickHandler: propTypes.func,
  editClickHandler: propTypes.func
};

export default gig;
