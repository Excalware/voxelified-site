import React, { useState, useEffect } from 'react';
import { styled } from '@stitches/react';
import { useSelector } from 'react-redux';
import { Box, PersonBadge, ArrowClockwise } from 'react-bootstrap-icons';

import Grid from '/voxeliface/components/Grid';
import Button from '/voxeliface/components/Button';
import Header from '/voxeliface/components/Typography/Header';
import Typography from '/voxeliface/components/Typography';
import AccountPage from '/components/AccountPage';
import BasicSpinner from '/voxeliface/components/BasicSpinner';

import { supabase } from '/lib/supabase/client'
const Container = styled('a', {
    gap: 2,
    width: 'fit-content',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    padding: '16px 24px',
    minWidth: 260,
    background: '#222222',
    transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    borderRadius: 8,
    flexDirection: 'column',
    textDecoration: 'none',
    
    '&:hover': {
        cursor: 'pointer',
        background: '#2c2c2c'
    }
});

export default function VerificationContainers() {
    const { access_token } = useSelector(state => state.user.session);

    const [loading, setLoading] = useState(false);
    const [containers, setContainers] = useState();
    useEffect(() => {
        if(!containers && !loading && access_token) {
            setLoading(true);

            supabase.from('verificationContainers')
            .select('*').then(({ data, error }) => {
                if(error)
                    throw error;
                setContainers(data);
                setLoading(false);
            });
        }
    });

    return (
        <AccountPage>
            <Header>Verification Containers</Header>
            <Grid spacing="16px" direction="vertical" css={{
                '@media screen and (max-width: 768px)': {
                    marginLeft: 40
                }
            }}>
                <Button theme="secondary" onClick={() => setContainers()} disabled={loading}>
                    {loading ? <BasicSpinner size={16}/> : <ArrowClockwise/>}
                    Refresh
                </Button>
                <Grid wrap="wrap" spacing="24px">
                    {containers && containers.map((container, index) =>
                        <Container key={index} href={`/verification/containers/${container.id}`}>
                            <Grid spacing="8px" alignItems="center">
                                <Box color="rgba(255, 255, 255, 0.8)"/>
                                <Typography text={container.name} size="1.1rem"/>
                            </Grid>
                            <Grid spacing="8px" alignItems="center">
                                <PersonBadge color="rgba(255, 255, 255, 0.8)"/>
                                <Typography text="Container Manager" size="0.9rem" weight={400} lineHeight={1.5}/>
                            </Grid>
                            <Typography text={container.id} size="0.5rem" color="rgba(255, 255, 255, 0.2)" weight={300} margin="4px 0 0 0"/>
                        </Container>
                    )}
                </Grid>
            </Grid>
        </AccountPage>
    );
};
export { getServerSideProps } from '/lib/auth';