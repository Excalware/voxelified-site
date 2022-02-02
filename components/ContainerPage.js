import React from 'react';
import { withRouter } from 'next/router';
import styled from 'styled-components';

import App from '../components/App';
import Main from '../components/Main';
import Grid from '../components/Grid';
import Header from '../components/Header';
import Typography from '../components/Typography';
import Navigation from '../components/Navigation';

import { supabase } from '../lib/supabase/client';

const BetaText = styled(Typography)`
    color: #ffffffad;
    margin: 0 0 0 8px;
    padding: 1px 8px;
    font-size: 0.8rem;
    font-weight: 600;
    font-family: Nunito, sans-serif;
    border-radius: 8px;
    background-color: #ffffff33;
`;

export default withRouter(class ContainerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            renderClient: false
        };
    }

    render() {
        const split = this.props.router.asPath.split("/");
        const url = split.splice(0, split.indexOf("containers") + 2).join("/");
        return (
            <App title="Voxel Containers">
                <Header
                    text={
                        <Grid margin="0 0 0 16px" alignItems="center">
                            <Typography
                                text="voxel containers"
                                size="1.5rem"
                                weight={600}
                            />
                            <BetaText text="beta"/>
                        </Grid>
                    }
                    icon={"/favicon.ico"}
                />
                <Navigation data={[
                    ["Container", [
                        ["Details", `${url}`],
                        ["Members", `${url}/members`],
                        ["Bindings", `${url}/bindings`]
                    ]]
                ]} buttons={[
                    ["Back to Verification", "/my/verification"]
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
});