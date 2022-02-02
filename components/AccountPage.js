import React from 'react';

import App from '../components/App';
import Main from '../components/Main';
import Grid from '../components/Grid';
import Header from '../components/Header';
import Typography from '../components/Typography';
import Navigation from '../components/Navigation';

import { supabase, supautil } from '../lib/supabase/client';

export default class ContainerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            renderClient: false
        };
    }

    render() {
        return (
            <App title="Voxel Account">
                <Header
                    text="voxel account"
                    icon={"/favicon.ico"}
                />
                <Navigation data={[
                    ["Account", [
                        ["Preferences", "/my/account"],
                        ["Logout", supautil.logout, "BoxArrowUpRight"]
                    ]],
                    ["Roblox Verification", [
                        ["Details", "/my/verification"],
                        ["Containers", "/my/verification/containers"],
                        ["Connect", "/verification/connect", "BoxArrowUpRight"]
                    ]]
                ]}/>
                <Main>
                    {this.state.renderClient ?
                        <Grid spacing="24px" direction="vertical">
                            {this.props.children}
                        </Grid>
                    :
                        <Grid width="100%" direction="vertical" alignItems="center">
                            <Typography text="You're being redirected" size="3rem" weight={700}/>
                        </Grid>
                    }
                </Main>
            </App>
        );
    }

    componentDidMount() {
        const session = supabase.auth.session();
        if(!session)
            location.href = '/login';
        else
            this.setState({
                renderClient: true
            });

        supabase.auth.onAuthStateChange((event, session) => {
            if(event == 'SIGNED_OUT') {
                location.href = '/';
                this.setState({
                    renderClient: false
                });
            }
        });
    }
};