import Grid from './Grid';
import React from 'react';
import styled from 'styled-components';
import Typography from './Typography';

const CardComponent = styled(Grid)`
    border: 1px solid rgba(255, 255, 255, 0.08);
    overflow: hidden;
    border-radius: 8px;
    background-color: #222222;

    @media only screen and (max-width: 768px) {
        border-left: none;
        border-right: none;
        border-radius: 0;
    }
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
                    {this.props.title == "string" ?
                        <Typography
                            text={this.props.title ?? "Card Title"}
                            size="1.2rem"
                            color="white"
                            weight={600}
                        />
                    : this.props.title}
                    <Grid spacing="8px" alignItems="center">
                        {this.props.buttons}
                    </Grid>
                </TitleGrid>
                <Grid wrap="wrap" padding={this.props.padding ?? "16px 24px"}>
                    {this.props.children}
                </Grid>
            </CardComponent>
        );
    }
}