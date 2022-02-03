import React from 'react';
import styled from 'styled-components';

import Grid from './Grid';
import Image from './Image';
import Typography from './Typography';

const MainComponent = styled(Grid)`
    min-width: 24rem;
    border-radius: 8px;
    background-color: #2C2C2C;
`;

export default class RobloxUser extends React.Component {
    render() {
        return (
            <MainComponent padding="12px 16px" direction="vertical">
                <Grid alignItems="center" justifyContent="space-between">
                    <Grid spacing="16px" alignItems="center">
                        <Image src={this.props.avatar} alt="User Image" width="40px" height="40px"/>
                        <Grid direction="vertical">
                            <Typography
                                text={this.props.displayName}
                                size="1.2rem"
                                color="white"
                                weight={500}
                            />
                            {this.props.displayName !== this.props.name &&
                                <Typography
                                    text={this.props.name}
                                    size="0.7rem"
                                    color="rgba(255, 255, 255, 0.4)"
                                    weight={500}
                                    margin="-2px 0 0 0"
                                />
                            }
                        </Grid>
                    </Grid>
                    <Grid margin="0 0 0 32px">
                        {this.props.buttons}
                    </Grid>
                </Grid>
            </MainComponent>
        );
    }
}