import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import Grid from './Grid';
import Typography from './Typography';

const HeaderComponent = styled.header`
    top: 0;
    width: 100%;
    height: 64px;
    z-index: 1100;
    padding: 0 24px;
    position: fixed;
    justify-content: space-between;
    background-color: #121212;

    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
`;

const BrandComponent = styled.div`
    display: flex;
`;

const IconComponent = styled(Image)`
    vertical-align: middle;
`;

export default class Header extends React.Component {
    render() {
        return (
            <HeaderComponent>
                <BrandComponent>
                    <IconComponent
                        src={this.props.icon}
                        alt="Voxel Brand Logo"
                        width={36}
                        height={36}
                        objectFit="contain"
                        suppressHydrationWarning={true}
                    />
                    {typeof this.props.text == 'string' ?
                        <Typography
                            text={this.props.text}
                            size="1.5rem"
                            weight={600}
                            margin="0 0 0 16px"
                        />
                    : this.props.text}
                </BrandComponent>
                <Grid>
                    {this.props.children}
                </Grid>
            </HeaderComponent>
        );
    }
};