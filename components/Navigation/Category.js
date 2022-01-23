import React from 'react';
import styled from 'styled-components';

import Grid from '../Grid';
import Typography from '../Typography';

const MainComponent = styled(Grid)`
    width: 100%;
    padding: 1.25rem .75rem;
`;

export default class NavigationCategory extends React.Component {
    render() {
        return (
            <MainComponent direction="vertical">
                <Typography text={this.props.name} size=".875rem" color="#bbbbbb" margin=".5rem 1rem"/>
                <Grid spacing="4px" direction="vertical">
                    {this.props.children}
                </Grid>
            </MainComponent>
        );
    }
};