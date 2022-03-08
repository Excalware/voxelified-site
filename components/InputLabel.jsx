import React from 'react';

import Typography from '/voxeliface/components/Typography';

export default class InputLabel extends React.Component {
    render() {
        return (
            <Typography weight={600} family="Nunito, sans-serif" css={{
                size: ".875rem",
                color: "#bbbbbb",
                marginBottom: 6,
                ...this.props.css
            }}>
                {this.props.children ?? this.props.text}
            </Typography>
        );
    }
};