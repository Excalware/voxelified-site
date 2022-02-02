import React from 'react';
import styled from 'styled-components';

const MainComponent = styled.div`
    width: ${props => props.width ?? "2px"};
    height: ${props => props.height ?? "2px"};
    margin: ${props => props.margin ?? "0"};
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.08);
`;

export default class Divider extends React.Component {
    render() {
        return (
            <MainComponent {...this.props}/>
        );
    }
}