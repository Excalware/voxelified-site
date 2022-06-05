import React from 'react';

import App from '/components/App';
import Main from '/voxeliface/components/Main';
import Grid from '/voxeliface/components/Grid';
import Header from '/components/Header';
import RouteGuard from './RouteGuard';
import * as Navigation from './Navigation';

import { supautil } from '/lib/supabase/client';
export default function AccountPage({ children }) {
    return (
        <App title="Voxelified Account">
            <RouteGuard>
                <Header/>
                <Main>
                    <Grid height="100vh" margin="1rem 3rem" background="$secondaryBackground2" borderRadius={16} css={{
                        overflow: 'hidden'
                    }}>
                        <Navigation.Root data={[
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
                        <Grid width="100%" padding="2rem" direction="vertical" css={{
                            overflow: 'hidden auto'
                        }}>
                            {children}
                        </Grid>
                    </Grid>
                </Main>
            </RouteGuard>
        </App>
    );
};