import React from 'react';
import styled, { keyframes } from 'styled-components';

const ClickAnim = keyframes`
    0% {
        transform: none;
    }
    50% {
        transform: scale(0.9);
    }
    100% {
        transform: none;
    }
`;

const MainComponent = styled.button`
    gap: 8px;
    color: #e0e0e0;
    border: none;
    display: flex;
    padding: .375rem .625rem;
    font-size: .75rem;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-weight: 500;
    align-items: center;
    font-family: HCo Gotham SSm, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
    border-radius: 4px;
    background-color: #343434;

    &:hover {
        cursor: pointer;
        background-color: #797979;
    }
    &:focus {
        animation: ${ClickAnim} 250ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    &:active {
        animation: none;
    }
`;

export default class InputButton extends React.Component {
    render() {
        return (
            <MainComponent onClick={this.props.onClick} tabIndex={0}>
                {this.props.children}
            </MainComponent>
        );
    }
};