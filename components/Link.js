import React from 'react';
import styled from 'styled-components';

const MainComponent = styled.a`
    color: ${props => props._color ?? "white"};
    margin: ${props => props._margin ?? 0};
    font-size: ${props => props._size ?? "1rem"};
    font-weight: ${props => props._weight ?? 500};
    line-height: ${props => props._lineHeight ?? 1.43};
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    text-decoration: none;

    &:hover {
        color: ${props => props._hoverColor ?? "unset"}
    }
`;

export default class Typography extends React.Component {
    render() {
        return (
            <MainComponent href={this.props.href} target={this.props.target ?? "_self"} _color={this.props.color} _margin={this.props.margin} _size={this.props.size} _weight={this.props.weight} _lineHeight={this.props.lineHeight} _hoverColor={this.props.hoverColor}>
                {this.props.children}
            </MainComponent>
        );
    }
}