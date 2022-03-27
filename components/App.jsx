import React from 'react';

import App from '/voxeliface/components/App/Tauri';

export default class App extends React.Component {
    render() {
        return (
            <App
                title="Voxelified"
                description="Small service providing products for Discord and Roblox"
            {...this.props}/>
        );
    }
};