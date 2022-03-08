import React from 'react';

import App from '/voxeliface/components/App';
import Main from '/voxeliface/components/Main';
import Grid from '/voxeliface/components/Grid';
import Header from '/components/Header';
import Navigation from '/voxeliface/components/Navigation';
import RouteGuard from './RouteGuard';

import { supautil } from '/lib/supabase/client';

export default class ContainerPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <App title="Voxelified Account">
                <RouteGuard>
                    <Header
                        text="voxelified account"
                        icon={"/voxel-white.svg"}
                    />
                    <Grid height="calc(100vh - 64px)">
                        <Navigation data={[
                            ["Account", [
                                ["Preferences", "/my/account"],
                                ["Authentication", "/my/account/auth"],
                                ["Logout", supautil.logout, "BoxArrowUpRight"]
                            ]],
                            ["Roblox Verification", [
                                ["Details", "/my/verification"],
                                ["Containers", "/my/verification/containers"],
                                ["Connect", "/verification/connect", "BoxArrowUpRight"]
                            ]]
                        ]}/>
                        <Main>
                            <Grid spacing="24px" direction="vertical">
                                {this.props.children}
                            </Grid>
                        </Main>
                    </Grid>
                </RouteGuard>
            </App>
        );
    }
};