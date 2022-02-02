import React from 'react';
import { withRouter } from 'next/router';
import styled from 'styled-components';
import * as Icon from 'react-bootstrap-icons';

import Typography from '../Typography';

const MainComponent = styled.a`
    width: 100%;
    color: white;
    display: flex;
    padding: .25rem 1rem;
    font-size: .875rem;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    align-items: center;
    border-radius: 4px;
    justify-content: space-between;
    text-decoration: none;
    background-color: ${props => props.onpage ? "rgba(255, 255, 255, 0.06)" : "transparent"};

    &:hover {
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.02);
    }
    &:disabled {
        cursor: not-allowed;
    }
`;

export default withRouter(class NavigationLink extends React.Component {
    render() {
        const LinkIcon = this.props.icon && Icon[this.props.icon];
        return (
            <MainComponent href={this.props.link instanceof Function ? undefined : this.props.link} target="_self" onpage={this.props.router.asPath === this.props.link} onClick={this.props.link instanceof Function ? this.props.link : undefined}>
                {this.props.name}
                {this.props.icon &&
                    <LinkIcon/>
                }
            </MainComponent>
        );
    }
});