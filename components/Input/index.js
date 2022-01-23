import React from 'react';
import styled from 'styled-components';

const MainComponent = styled.input`
    color: #CBCBCB;
    width: ${props => props.width ?? "unset"};
    border: none;
    outline: none;
    padding: 12px;
    min-width: 210px;
    font-size: 1rem;
    transition: color 100ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-weight: 500;
    font-family: HCo Gotham SSm, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
    border-radius: 4px;
    background-color: #3B3B3B;

    &:focus {
        color: white;
    }
    &:disabled {
        cursor: not-allowed;
        opacity: 50%;
    }
`;

export default class Input extends React.Component {
    render() {
        return (
            <MainComponent {...this.props}/>
        );
    }
};