import React from 'react';

import Grid from '/voxeliface/components/Grid';
import Card from '/voxeliface/components/Card';
import Table from '/voxeliface/components/Table';
import TextInput from '/voxeliface/components/Input/Text';
import InputLabel from '/components/InputLabel';
import AccountPage from '/components/AccountPage';

import { supabase, supautil } from '/lib/supabase/client';

export default class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: ""
        };
    }

    render() {
        return (
            <AccountPage>
                <Card title="Account Information">
                    <Grid spacing="16px" direction="vertical">
                        <Grid wrap="wrap" spacing="24px">
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
                    </Grid>
                </Card>
                <Card title="Your Profile">
                    <Grid spacing="16px" direction="vertical">
                        <Grid spacing="24px">
                            <Grid direction="vertical">
                                <InputLabel for="username-input" text="Username"/>
                                <TextInput
                                    id="username-input"
                                    value={this.state.username}
                                    onChange={(event) => this.setState({
                                        username: event.target.value
                                    })}
                                    readOnly
                                    disabled
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
                <Card title="External Providers" margin="16px 0" padding="0">
                    <Table>
                        <thead>
                            <tr>
                                <th>
                                    Provider
                                </th>
                                <th>
                                    Identity
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.session ?
                                this.state.session.user.identities.map((identity, index) =>
                                    <tr key={index}>
                                        <td>
                                            {identity.provider}
                                        </td>
                                        <td>
                                            {identity.identity_data.full_name}
                                        </td>
                                    </tr>
                                )
                            :
                                <tr>
                                    <td>
                                        Loading
                                    </td>
                                    <td/>
                                </tr>
                            }
                        </tbody>
                    </Table>
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

    async addProvider(provider) {
        await supabase.auth.signUp({
            provider
        }, {
            redirectTo: `https://${location.hostname}/login`
        });
    }
};
export { getServerSideProps } from '/lib/auth';