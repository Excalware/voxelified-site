import React from 'react';
import styled from 'styled-components';

const MainComponent = styled.div`
    margin: ${props => props.margin ?? 0};
    min-width: ${props => props.width ?? "unset"};
    object-fit: fill;
    min-height: ${props => props.height ?? "unset"};
    border-radius: ${props => props.borderRadius ?? 0};
    background-size: cover;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
`;

export default class Image extends React.Component {
    render() {
        return (
            <MainComponent {...this.props}/>
        );
    }
}