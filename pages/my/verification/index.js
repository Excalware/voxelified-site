import ky from 'ky';
import React from 'react';

import Grid from '../../../components/Grid';
import Card from '../../../components/Card';
import Table from '../../../components/Table';
import Typography from '../../../components/Typography';
import AccountPage from '../../../components/AccountPage';

import { supabase } from '../../../lib/supabase/client';

export default class Verification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: ["Loading", "#ffffff"],
            accounts: null
        };
    }

    render() {
        return (
            <AccountPage>
                <Card title="Information">
                    <Grid spacing="24px">
                        <Grid direction="vertical">
                            <Typography text="Verification Status"/>
                            <Typography text={this.state.status[0]} color={this.state.status[1]}/>
                        </Grid>
                    </Grid>
                </Card>
                <Card title="Connected Accounts" margin="16px 0" padding="0">
                    <Grid spacing="24px">
                        <Table>
                            <thead>
                                <tr>
                                    <th>
                                        User ID
                                    </th>
                                    <th>
                                        Username
                                    </th>
                                    <th>
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.accounts?.length > 0 ?
                                    this.state.accounts.map((account, index) =>
                                        <tr key={index}>
                                            <td>
                                                {account.userId}
                                            </td>
                                            <td>
                                                Not Implemented
                                            </td>
                                            <td>
                                                {account.verified ? 'Verified' : 'Pending'}
                                            </td>
                                        </tr>
                                    )
                                :
                                    <tr>
                                        <td>
                                            No Accounts Found
                                        </td>
                                        <td/>
                                        <td/>
                                    </tr>
                                }
                            </tbody>
                        </Table>
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
            
            email: session.user.email
        });

        const accounts = await ky.get('/api/v1/verification/users/connected', {
            headers: {
                Authorization: session.access_token
            }
        }).json();
        this.setState({
            status: accounts.data.length ? accounts.data.find(a => a.verified) ? ["Verified", "#24b47e"] : ["Pending Verification", "#d9b169"] : ["No Accounts", "#d37d7d"],
            accounts: accounts.data
        })
    }
};
export { getServerSideProps } from '../../../lib/auth';