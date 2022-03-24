import React from 'react';

import Image from '/voxeliface/components/Image';
import Header from '/voxeliface/components/Header';

export default class InputLabel extends React.Component {
    render() {
        return (
            <Header css={{
                background: '#25272c'
            }} brand={<>
                <Image
                    src={this.props.icon ?? "/img/brand-text.svg"}
                    alt="Voxelified Text Vector"
                    size={48}
                    width={192}
                    objectFit="contain"
                    suppressHydrationWarning={true}
                    css={{
                        margin: '0 12px 0 0',
                        verticalAlign: 'middle'
                    }}
                />
                {this.props.text}
            </>} {...this.props}/>
        );
    }
};