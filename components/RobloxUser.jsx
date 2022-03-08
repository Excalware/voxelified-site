import React from 'react';

import Grid from '/voxeliface/components/Grid';
import Image from '/voxeliface/components/Image';
import Typography from '/voxeliface/components/Typography';

export default class RobloxUser extends React.Component {
    render() {
        return (
            <Grid padding="12px 16px" direction="vertical" css={{
                minWidth: '24rem',
                background: '#2C2C2C',
                borderRadius: 8
            }}>
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
            </Grid>
        );
    }
}