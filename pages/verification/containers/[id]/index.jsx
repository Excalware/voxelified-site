import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import Grid from '/voxeliface/components/Grid';
import Header from '/voxeliface/components/Typography/Header';
import Spinner from '/voxeliface/components/Spinner';
import TextInput from '/voxeliface/components/Input/Text';
import InputLabel from '/components/InputLabel';
import Typography from '/voxeliface/components/Typography';
import ContainerPage from '/components/ContainerPage';

import { supabase } from '/lib/supabase/client';
export default function Container() {
    const { query: { id } } = useRouter();
    const { access_token } = useSelector(state => state.user.session);

    const [loading, setLoading] = useState(false);
    const [container, setContainer] = useState();
    useEffect(() => {
        if(!container && !loading && access_token) {
            setLoading(true);

            supabase.from('verificationContainers')
            .select('name')
            .eq('id', id).then(({ data, error }) => {
                if(error)
                    throw error;
                setContainer(data[0]);
                setLoading(false);
            });
        }
    });
    return (
        <ContainerPage>
            <Header>Container Information</Header>
            {loading ?
                <Typography size="1.1rem" color="$primaryColor" family="Nunito" css={{ gap: '1rem' }}>
                    <Spinner/>
                    Loading...
                </Typography>
            :
                <Grid direction="vertical">
                    <InputLabel for="name-input" text="Container Name"/>
                    <TextInput
                        id="name-input"
                        value={container?.name}
                        readOnly
                        disabled
                    />
                </Grid>
            }
        </ContainerPage>
    );
};
export { getServerSideProps } from '/lib/auth';