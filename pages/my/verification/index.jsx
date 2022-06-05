import ky from 'ky';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Table from '/voxeliface/components/Table';
import Header from '/voxeliface/components/Typography/Header';
import Spinner from '/voxeliface/components/Spinner';
import Typography from '/voxeliface/components/Typography';
import AccountPage from '/components/AccountPage';
export default function Verification() {
    const { access_token } = useSelector(state => state.user.session);

    const [status, setStatus] = useState();
    const [loading, setLoading] = useState(false);
    const [accounts, setAccounts] = useState();
    useEffect(() => {
        if(!accounts && !loading && access_token) {
            setLoading(true);
            ky.get('/api/v1/verification/users/connected', {
                headers: {
                    Authorization: access_token
                }
            }).json().then(accounts => {
                setStatus(accounts.data.length ?
                    accounts.data.find(a => a.verified) ?
                        ["Verified", "#24b47e"] :
                        ["Pending Verification", "#d9b169"] :
                        ["No Accounts", "#d37d7d"]
                );
                setAccounts(accounts.data);
                setLoading(false);
            });
        }
    });
    return (
        <AccountPage>
            <Header>Verification Status</Header>
            {loading ?
                <Typography size="1.1rem" color="$primaryColor" family="Nunito" css={{ gap: '1rem' }}>
                    <Spinner/>
                    Loading...
                </Typography>
            :
                <Typography size="1.1rem" color={status?.[1]} weight={600} family="Nunito">
                    {status?.[0]}
                </Typography>
            }

            <Header spacious>Connected Accounts</Header>
            <Table css={{
                border: '1px solid $secondaryBorder',
                overflow: 'hidden',
                borderRadius: 8
            }}>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts?.length > 0 ?
                        accounts.map((account, index) =>
                            <tr key={index}>
                                <td>{account.userId}</td>
                                <td>{account.verified ? 'Verified' : 'Pending'}</td>
                            </tr>
                        )
                    :
                        <tr>
                            <td>No Accounts Found</td>
                            <td/>
                        </tr>
                    }
                </tbody>
            </Table>
        </AccountPage>
    );
};
export { getServerSideProps } from '/lib/auth';