import React from 'react';
import styled from 'styled-components';

const Sizes = {
    small: {
        padding: '.375rem .625rem'
    }
}

const Themes = {
    primary: {
        color: {
            hover: "#5da58a",
            normal: "#4ebd93",
            active: "#4ebd93",
            disabled: "#578976"
        },
        border: {
            hover: "none",
            normal: "none",
            active: "none",
            disabled: "none"
        },
        textColor: {
            hover: "#FFFFFF",
            normal: "#FFFFFF",
            active: "#FFFFFF",
            disabled: "#cfcfcf"
        },
        opacity: {
            hover: 1,
            normal: 1,
            active: 1,
            disabled: 1
        }
    },
    secondary: {
        color: {
            hover: "#1f1f1f",
            normal: "#2a2a2a",
            active: "#2a2a2a",
            disabled: "#2a2a2a"
        },
        border: {
            hover: "1px solid #e0e0e00d",
            normal: "1px solid #2a2a2a",
            active: "1px solid #2a2a2a",
            disabled: "1px solid #2a2a2a"
        },
        textColor: {
            hover: "#FFFFFF",
            normal: "#FFFFFF",
            active: "#FFFFFF",
            disabled: "#cfcfcf"
        },
        opacity: {
            hover: 1,
            normal: 1,
            active: 1,
            disabled: 0.5
        }
    },
    tertiary: {
        color: {
            hover: "transparent",
            normal: "transparent",
            active: "transparent",
            disabled: "transparent"
        },
        border: {
            hover: "1px solid #e0e0e00d",
            normal: "1px solid #2a2a2a",
            active: "1px solid #2a2a2a",
            disabled: "1px solid #2a2a2a"
        },
        textColor: {
            hover: "#FFFFFF",
            normal: "#FFFFFF",
            active: "#FFFFFF",
            disabled: "#cfcfcf"
        },
        opacity: {
            hover: 1,
            normal: 1,
            active: 1,
            disabled: 0.5
        }
    }
};
const ButtonComponent = styled.a`
    gap: 8px;
    width: ${props => props.width ?? "fit-content"};
    color: ${props => props.theme.textColor.normal};
    cursor: pointer;
    margin: ${props => props.margin ?? 0};
    border: ${props => props.theme.border.normal};
    height: ${props => props.height ?? "fit-content"};
    outline: 0;
    opacity: ${props => props.theme.opacity.normal};
    padding: ${props => props.size.padding};
    display: inline-flex;
    position: relative;
    font-size: .75rem;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), border 250ms cubic-bezier(0.4, 0, 0.2, 1), opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
    font-family: Nunito, sans-serif;
    font-weight: 625;
    line-height: 1.43;
    user-select: none;
    align-items: center;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    border-radius: .25rem;
    text-decoration: none;
    justify-content: center;
    background-color: ${props => props.theme.color.normal};

    &:hover {
        color: ${props => props.theme.textColor.hover};
        border: ${props => props.theme.border.hover};
        opacity: ${props => props.theme.opacity.hover};
        background-color: ${props => props.theme.color.hover};
    }
    &:active {
        color: ${props => props.theme.textColor.active};
        border: ${props => props.theme.border.active};
        opacity: ${props => props.theme.opacity.active};
        background-color: ${props => props.theme.color.active};
    }
    &[disabled] {
        color: ${props => props.theme.textColor.disabled};
        cursor: not-allowed;
        border: ${props => props.theme.border.disabled};
        opacity: ${props => props.theme.opacity.disabled};
        background-color: ${props => props.theme.color.disabled};
    }
`;

export default class Button extends React.Component {
    render() {
        const { size, theme, onClick, disabled } = this.props;
        return (
            <ButtonComponent {...this.props} size={Sizes[size ?? "small"]} theme={theme instanceof Object ? theme : Themes[theme ?? "primary"]} onClick={(...args) => {
                if(!disabled && onClick)
                    return onClick(...args);
            }}>
                {this.props.children ?? "Button"}
            </ButtonComponent>
        );
    }
};
