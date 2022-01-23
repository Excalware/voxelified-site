import React from 'react';
import styled from 'styled-components';

const MainComponent = styled.label`
    color: #989898;
    margin: 6px 0;
    padding: 0;
    font-size: 1rem;
    font-weight: 500;
`;

export default class InputLabel extends React.Component {
    render() {
        return (
            <MainComponent htmlFor={this.props.for}>
                {this.props.text}
            </MainComponent>
        );
    }
};