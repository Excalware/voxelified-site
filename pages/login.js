import ky from 'ky';
import React from 'react';
import { withRouter } from 'next/router';
import styled from 'styled-components';

import App from '../components/App';
import Main from '../components/Main';
import Grid from '../components/Grid';
import Alert from '../components/Alert';
import Input from '../components/Input';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import Divider from '../components/Divider';
import Typography from '../components/Typography';
import InputLabel from '../components/Input/Label';
import DiscordLogin from '../components/LogInButtons/Discord';
import MagicLinkLogin from '../components/LogInButtons/MagicLink';

import { supabase, supautil } from '../lib/supabase/client';

const RedirectGrid = styled(Grid)`

`;

export default withRouter(class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            magicLink: false,
            magicSent: false,
            magicValue: "",
            redirecting: false
        };
    }

    render() {
        return (
            <App title="Voxel Account">
                <Header text="voxel" icon={"/voxel-white.svg"}/>
                <Main>
                    {this.state.redirecting ?
                        <RedirectGrid direction="vertical" alignItems="center" justifyContent="center">
                            <Typography text={`Welcome ${supautil.getDisplayName()}!`} size="3rem" weight={700} margin="0 0 2px 0"/>
                            <Typography text={`You're being signed in...`} size="2rem" weight={600} margin="0 0 16px 0"/>
                            <Spinner/>
                        </RedirectGrid>
                    :
                        <Grid width="100%" direction="vertical" alignItems="center">
                            <Typography text="Log in to Voxel" size="3rem" weight={700} margin="0 0 24px 0"/>
                            <DiscordLogin onClick={this.discordSignIn.bind(this)}/>
                            <Divider width="250px" margin="12px 0"/>
                            
                            {this.state.magicSent ?
                                <Alert
                                    title="Magic Link Sent"
                                    body={`Check your inbox for your link!
                                        Your email is ${this.state.magicValue}
                                    `}
                                    width="264px"
                                    severity="success"
                                />
                            : this.state.magicLink ?
                                <Grid direction="vertical">
                                    <Grid margin="0 0 8px 0" direction="vertical">
                                        <InputLabel for="magic-email" text="Email Address"/>
                                        <Input
                                            id="magic-email"
                                            type="email"
                                            width="264px"
                                            value={this.state.magicValue}
                                            onChange={(event) => this.setState({
                                                magicValue: event.target.value
                                            })}
                                            placeholder="example@gmail.com"
                                        />
                                    </Grid>
                                    <MagicLinkLogin onClick={this.sendMagicLink.bind(this)}/>
                                </Grid>
                            :
                                <MagicLinkLogin onClick={this.magicLinkClick.bind(this)}/>
                            }
                            {this.state.error ?
                                <Alert title="Unknown Error" body={this.state.error} width="264px" margin="16px 0" severity="error"/>
                            : null}
                        </Grid>
                    }
                </Main>
            </App>
        );
    }

    sendAuth(event, session) {
        ky.post('/api/v1/auth/authenticate', {
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            json: { event, session }
        }).then(() => this.redirect());
    }

    componentDidMount() {
        const session = supabase.auth.session();
        if(session)
            this.sendAuth('SIGNED_IN', session);
        supabase.auth.onAuthStateChange(this.sendAuth.bind(this));

        if(location) {
            const search = new URLSearchParams(location.search);
            if(search.get("error") || search.get("error_code"))
                this.setState({
                    error: search.get("error_description")
                });
            else if(location.hash.startsWith("#")) {
                const query = JSON.parse('{"' + decodeURI(location.hash.substring(1).replace(/\+/g, " ")).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
                if(query.error || query.error_code)
                    this.setState({
                        error: query.error_description
                    });
            }
            history.replaceState({}, document.title, location.pathname);
        }
    }

    redirect() {
        location.href = '/my/account';
        this.setState({
            redirecting: true
        });
    }

    async discordSignIn() {
        await supabase.auth.signIn({
            provider: 'discord'
        }, {
            redirectTo: `https://${location.hostname}/login`
        });
    }

    async magicLinkClick() {
        this.setState({
            magicLink: true
        });
    }

    async sendMagicLink() {
        const { user, error } = await supabase.auth.signIn({
            email: this.state.magicValue,
        }, {
            redirectTo: `https://${location.hostname}/login`
        });
        if(error)
            return this.setState({
                error: error.message
            });
        this.setState({
            magicSent: true
        });
    }
});