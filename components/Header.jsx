import React from 'react';

import Image from '/voxeliface/components/Image';
import Header from '/voxeliface/components/Header';
import Typography from '/voxeliface/components/Typography';

export default class InputLabel extends React.Component {
    render() {
        return (
            <Header brand={<>
                <Image
                    src={this.props.icon ?? "/voxel-white.svg"}
                    alt="Voxel Brand Logo"
                    size={36}
                    objectFit="contain"
                    suppressHydrationWarning={true}
                    css={{
                        margin: '0 12px 0 0',
                        verticalAlign: 'middle'
                    }}
                />
                {(typeof this.props.text === 'string' || !this.props.text) ?
                    <Typography
                        text={this.props.text ?? "voxelified"}
                        size="1.5rem"
                        weight={600}
                    />
                : this.props.text}
            </>} {...this.props}/>
        );
    }
};