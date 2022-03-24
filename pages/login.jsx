import ky from 'ky';
import React from 'react';
import { withRouter } from 'next/router';

import App from '/voxeliface/components/App';
import Main from '/voxeliface/components/Main';
import Grid from '/voxeliface/components/Grid';
import Alert from '/voxeliface/components/Alert';
import Header from '/components/Header';
import Spinner from '/voxeliface/components/Spinner';
import Divider from '/voxeliface/components/Divider';
import TextInput from '/voxeliface/components/Input/Text';
import LoginHelp from '/voxeliface/components/LogInButtons/LoginHelp';
import Typography from '/voxeliface/components/Typography';
import InputLabel from '/components/InputLabel';
import DiscordLogin from '/voxeliface/components/LogInButtons/Discord';
import MagicLinkLogin from '/voxeliface/components/LogInButtons/MagicLink';

import { supabase, supautil } from '/lib/supabase/client';

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
            <App title="Voxelified Login">
                <Header/>
                <Main>
                    {this.state.redirecting ?
                        <Grid direction="vertical" alignItems="center" justifyContent="center">
                            <Typography text={`Welcome ${supautil.getDisplayName()}!`} size="3rem" weight={700} margin="0 0 2px 0"/>
                            <Typography text={`You're being signed in...`} size="2rem" weight={600} margin="0 0 16px 0"/>
                            <Spinner/>
                        </Grid>
                    :
                        <Grid width="100%" direction="vertical" alignItems="center">
                            <Typography text="Voxelified Login" size="3rem" family="Nunito" weight={700} margin="0 0 24px 0"/>
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
                                        <TextInput
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
            redirectTo: `${location.protocol}//${location.hostname}${location.port ? `:${location.port}` : ''}/login`
        });
    }

    async magicLinkClick() {
        this.setState({
            magicLink: true
        });
    }

    async sendMagicLink() {
        const { error } = await supabase.auth.signIn({
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