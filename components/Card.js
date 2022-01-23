import Grid from './Grid';
import React from 'react';
import styled from 'styled-components';
import Typography from './Typography';

const CardComponent = styled(Grid)`
    border: 1px solid rgba(255, 255, 255, 0.08);
    overflow: hidden;
    border-radius: 8px;
    background-color: #222222;
`;

const TitleGrid = styled(Grid)`
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

export default class Card extends React.Component {
    render() {
        return (
            <CardComponent
                direction="vertical"
                {...this.props}
            >
                <TitleGrid padding="16px 24px" alignItems="center" justifyContent="space-between">
                    <Typography
                        text={this.props.title || "Card Title"}
                        size="1.2rem"
                        color="white"
                        weight={600}
                    />
                    <Grid spacing="8px" alignItems="center">
                        {this.props.buttons}
                    </Grid>
                </TitleGrid>
                <Grid padding={this.props.padding ?? "16px 24px"}>
                    {this.props.children}
                </Grid>
            </CardComponent>
        );
    }
}