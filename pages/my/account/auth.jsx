import React from 'react';

import Grid from '/voxeliface/components/Grid';
import Card from '/voxeliface/components/Card';
import TextInput from '/voxeliface/components/Input/Text';
import InputLabel from '/components/InputLabel';
import AccountPage from '/components/AccountPage';

import { supabase, supautil } from '/lib/supabase/client';

export default class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <AccountPage>
                <Card title="Quick Login">
                    <Grid spacing="24px">
                        <Grid direction="vertical">
                            <InputLabel for="name-input" text="Account Name"/>
                            <TextInput
                                id="name-input"
                                value={this.state.accountName}
                                onChange={(event) => this.setState({
                                    accountName: event.target.value
                                })}
                                readOnly
                                disabled
                            />
                        </Grid>
                        <Grid direction="vertical">
                            <InputLabel for="email-input" text="Email Address"/>
                            <TextInput
                                id="email-input"
                                value={this.state.email}
                                onChange={(event) => this.setState({
                                    email: event.target.value
                                })}
                                readOnly
                                disabled
                            />
                        </Grid>
                    </Grid>
                </Card>
            </AccountPage>
        );
    }

    componentDidMount() {
        const session = supabase.auth.session();
        if(session)
            this.setSession(session);

        supabase.auth.onAuthStateChange((event, session) => {
            if(event == 'SIGNED_IN')
                this.setSession(session);
        });
    }

    async setSession(session) {
        this.setState({
            session,
            
            email: session.user.email,
            username: "Placeholder Text"
        });

        const profile = await supautil.getProfile();
        this.setState({
            profile,
            username: profile.username,
            accountName: profile.name
        });
    }
};
export { getServerSideProps } from '/lib/auth';