import React from 'react';
import styled from 'styled-components';

import Grid from '../Grid';

const ExpComponent = styled.div`
    width: ${props => props._width ?? "unset"};
    position: relative;
`;

const ExpInputComponent = styled.input`
    color: rgba(255, 255, 255, 0.8);
    width: 100%;
    border: 1px solid #343434;
    outline: none;
    padding: 8px 16px;
    min-width: 210px;
    font-size: 0.9rem;
    transition: border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-weight: 500;
    font-family: HCo Gotham SSm, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
    border-radius: 4px;
    background-color: transparent;

    &:read-only {
        cursor: default;
    }
    &:not(:read-only):focus {
        border-color: #797979;
        background-color: rgba(255, 255, 255, 0.01);
    }
    &:disabled {
        cursor: not-allowed;
        opacity: 50%;
    }
`;

const ExpButtonsComponent = styled(Grid)`
    top: 0;
    right: 0;
    height: 100%;
    padding: .25rem;
    position: absolute;
`;

export default class ExpInput extends React.Component {
    render() {
        return (
            <ExpComponent _width={this.props.width}>
                <ExpInputComponent id={this.props.id} value={this.props.value} readOnly={this.props.readOnly} onChange={this.props.onChange} disabled={this.props.disabled}/>
                <ExpButtonsComponent>
                    {this.props.children}
                </ExpButtonsComponent>
            </ExpComponent>
        );
    }
};