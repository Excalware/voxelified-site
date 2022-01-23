import React from 'react';
import styled from 'styled-components';
import { CheckCircle, InfoCircle, ExclamationTriangle, ExclamationCircle } from 'react-bootstrap-icons';

import Grid from './Grid';
import Typography from './Typography';

const Icons = {
    success: CheckCircle,
    info: InfoCircle,
    warning: ExclamationTriangle,
    error: ExclamationCircle
};
const Variants = {
    standard: {
        success: {
            icon: "#00E87E",
            color: "#00351D",
            border: "transparent",
            textColor: "#5CFFB5"
        },
        info: {
            icon: "#2BB1FF",
            color: "#002E49",
            border: "transparent",
            textColor: "#80D0FF"
        },
        warning: {
            icon: "#f8d063",
            color: "#564004",
            border: "transparent",
            textColor: "#FBE3A2"
        },
        error: {
            icon: "#F4645D",
            color: "#510905",
            border: "transparent",
            textColor: "#F9A29E"
        }
    },
    outlined: {
        success: {
            icon: "#F4645D",
            color: "#00351D",
            border: "transparent",
            textColor: "#5CFFB5"
        },
        info: {
            icon: "#F4645D",
            color: "#00351D",
            border: "transparent",
            textColor: "#5CFFB5"
        },
        warning: {
            icon: "#F4645D",
            color: "#00351D",
            border: "transparent",
            textColor: "#5CFFB5"
        },
        error: {
            icon: "#F4645D",
            color: "#00351D",
            border: "transparent",
            textColor: "#5CFFB5"
        }
    },
    filled: {
        success: {
            icon: "#F4645D",
            color: "#00351D",
            border: "transparent",
            textColor: "#5CFFB5"
        },
        info: {
            icon: "#F4645D",
            color: "#00351D",
            border: "transparent",
            textColor: "#5CFFB5"
        },
        warning: {
            icon: "#F4645D",
            color: "#00351D",
            border: "transparent",
            textColor: "#5CFFB5"
        },
        error: {
            icon: "#F4645D",
            color: "#00351D",
            border: "transparent",
            textColor: "#5CFFB5"
        }
    }
};

const MainComponent = styled(Grid)`
    padding: 6px 16px;
    min-width: ${props => props.minW ?? "unset"};
    border-radius: 4px;
    background-color: ${props => Variants[props.variant][props.severity].color};
`;

export default class Alert extends React.Component {
    render() {
        const AlertIcon = Icons[this.props.severity];
        const variant = Variants[this.props.variant ?? "standard"];
        const theme = variant[this.props.severity ?? "success"];
        return (
            <MainComponent
                minW={this.props.width}
                margin={this.props.margin}
                variant={this.props.variant ?? "standard"}
                severity={this.props.severity ?? "success"}
                direction="horizontal"
            >
                <Grid margin="10px 12px 10px 0" direction="vertical">
                    <AlertIcon size={16} color={theme.icon}/>
                </Grid>
                <Grid margin="8px 0" direction="vertical">
                    <Typography text={this.props.title} size="1rem" color={theme.textColor} margin="0 0 0.35em 0"/>
                    <Typography text={this.props.body} size="0.9rem" color={theme.textColor}/>
                </Grid>
            </MainComponent>
        );
    }
}