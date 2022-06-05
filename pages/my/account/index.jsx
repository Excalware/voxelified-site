import React from 'react';
import { useSelector } from 'react-redux';

import Grid from '/voxeliface/components/Grid';
import Table from '/voxeliface/components/Table';
import Header from '/voxeliface/components/Typography/Header';
import TextInput from '/voxeliface/components/Input/Text';
import InputLabel from '/voxeliface/components/Input/Label';
import AccountPage from '/components/AccountPage';
export default function Account() {
    const { name, username } = useSelector(state => state.user.profile);
    const { user: { email, identities } } = useSelector(state => state.user.session);
    return (
        <AccountPage>
            <Header>Account Information</Header>
            <Grid wrap="wrap" spacing="24px">
                <Grid direction="vertical">
                    <InputLabel htmlFor="name-input">Account Name</InputLabel>
                    <TextInput
                        id="name-input"
                        value={name}
                        onChange={(event) => this.setState({
                            accountName: event.target.value
                        })}
                        readOnly
                        disabled
                    />
                </Grid>
                <Grid direction="vertical">
                    <InputLabel htmlFor="email-input">Email Address</InputLabel>
                    <TextInput
                        id="email-input"
                        value={email}
                        onChange={(event) => this.setState({
                            email: event.target.value
                        })}
                        readOnly
                        disabled
                    />
                </Grid>
            </Grid>

            <Header spacious>Public Profile</Header>
            <Grid direction="vertical">
                <InputLabel htmlFor="username-input">Username</InputLabel>
                <TextInput
                    id="username-input"
                    value={username}
                    onChange={(event) => this.setState({
                        username: event.target.value
                    })}
                    readOnly
                    disabled
                />
            </Grid>

            <Header spacious>External Providers</Header>
            <Table css={{
                border: '1px solid $secondaryBorder',
                overflow: 'hidden',
                borderRadius: 8
            }}>
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
                    {identities ?
                        identities.map((identity, index) =>
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
        </AccountPage>
    );
};
export { getServerSideProps } from '/lib/auth';