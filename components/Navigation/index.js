import React from 'react';
import styled from 'styled-components';

import Grid from '../Grid';
import Typography from '../Typography';
import NavigationLink from './Link';
import NavigationCategory from './Category';

const MainComponent = styled(Grid)`
    height: calc(100vh - 64px);
    min-width: 16rem;
    margin-top: 64px;
    background-color: #171717;
`;

export default class Navigation extends React.Component {
    render() {
        return (
            <MainComponent direction="vertical">
                {this.props.data.map((category, index) =>
                    <NavigationCategory key={index} name={category[0]}>
                        {category[1].map((link, index) =>
                            <NavigationLink key={index} name={link[0]} link={link[1]} icon={link[2]}/>
                        )}
                    </NavigationCategory>
                )}
            </MainComponent>
        );
    }
};