import React from 'react';

import App from '../components/App';
import Main from '../components/Main';
import Grid from '../components/Grid';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import RouteGuard from '../components/RouteGuard';

import { supautil } from '../lib/supabase/client';

export default class ContainerPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <App title="Voxel Account">
                <RouteGuard>
                    <Header
                        text="voxel account"
                        icon={"/voxel-white.svg"}
                    />
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
                </RouteGuard>
            </App>
        );
    }
};