import React from 'react';
import { useSelector } from 'react-redux';

import Grid from '/voxeliface/components/Grid';
import Card from '/voxeliface/components/Card';
import TextInput from '/voxeliface/components/Input/Text';
import InputLabel from '/components/InputLabel';
import AccountPage from '/components/AccountPage';

export default function Account() {
    const { username } = useSelector(state => state.user.profile);
    const { user: { email } } = useSelector(state => state.user.session);
    return (
        <AccountPage>
            Coming soon!
        </AccountPage>
    );
};
export { getServerSideProps } from '/lib/auth';