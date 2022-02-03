import React from 'react';
import styled from 'styled-components';
import { List } from 'react-bootstrap-icons';

import Grid from '../Grid';
import NavigationLink from './Link';
import NavigationCategory from './Category';

const MainComponent = styled(Grid)`
    height: calc(100vh - 64px);
    z-index: 1000;
    overflow: hidden;
    min-width: 16rem;
    margin-top: 64px;
    transition: max-height 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    background-color: #171717;

    @media screen and (max-width: 768px) {
        & {
            width: 100%;
            height: 100%;
            position: absolute;
            max-height: ${props => props.open ? "100%" : "0px"};
        }
        & > button {
            display: unset;
        }
    }
`;

const MenuButtonGrid = styled(Grid)`
    top: 0;
    right: 0;
    height: 64px;
    display: flex;
    z-index: 10000;
    position: fixed;
    align-items: center;
    margin-right: 16px;
`;

const MenuButton = styled.button`
    color: white;
    border: none;
    padding: 0;
    display: none;
    overflow: hidden;
    font-size: 1.5rem;
    background: transparent;
    align-items: center;
    justify-content: center;

    &:after {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        content: '';
        position: absolute;
        transform: scale(6, 6);
        transition: transform .5s, opacity 1s;
        pointer-events: none;
        background-image: radial-gradient(circle, #fff 10%, transparent 10%);
        background-repeat: no-repeat;
        background-position: 50% ;
    }

    &:active:after {
        opacity: .3;
        transform: scale(0, 0);
        transition: 0s;
    }

    &:hover {
        cursor: pointer;
    }

    @media screen and (max-width: 768px) {
        display: flex;
    }
`;

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    render() {
        return (
            <Grid>
                <MainComponent open={this.state.open} direction="vertical" justifyContent="space-between">
                    <Grid direction="vertical">
                        {this.props.data.map((category, index) =>
                            <NavigationCategory key={index} name={category[0]}>
                                {category[1].map((link, index) =>
                                    <NavigationLink key={index} name={link[0]} link={link[1]} icon={link[2]}/>
                                )}
                            </NavigationCategory>
                        )}
                    </Grid>
                    {this.props.buttons &&
                        <NavigationCategory name="">
                            {this.props.buttons.map((link, index) =>
                                <NavigationLink key={index} name={link[0]} link={link[1]} icon={link[2]}/>
                            )}
                        </NavigationCategory>
                    }
                </MainComponent>
                <MenuButtonGrid>
                    <MenuButton onClick={() => this.setState({ open: !this.state.open })}>
                        <List/>
                    </MenuButton>
                </MenuButtonGrid>
            </Grid>
        );
    }
};