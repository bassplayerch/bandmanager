import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

const ContentContainer = styled.div`
    background: ${props => props.theme.colorWhite};
    max-height: 93%;
    margin-top: 4rem;
    margin-left: auto;
    margin-right: auto;
    box-shadow: ${props => props.theme.boxShadowLight};
    overflow-y: auto;
    align-self: flex-start;
    flex 0 0 80%;
`;

const contentContainer = (props) => {
    return <ContentContainer>{props.children}</ContentContainer>
}

contentContainer.propTypes= {

}
 
export default contentContainer;