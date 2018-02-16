import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const ContentContainer = styled.div`
  background: ${props => props.theme.colorWhite};
  box-shadow: ${props => props.theme.boxShadowLight};
  overflow-y: auto;
  align-self: flex-start;
  flex: 1 0 auto;
  margin: 0 1.5vw;
  width: 20%;
  align-self: flex-start;
  max-height: 93%;
  margin-top: 3.4rem;
  word-wrap: break-word;
`;

const contentContainer = props => {
  return <ContentContainer>{props.children}</ContentContainer>;
};

contentContainer.propTypes = {};

export default contentContainer;
