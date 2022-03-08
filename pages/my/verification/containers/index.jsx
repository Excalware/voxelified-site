import React from 'react';
import { styled } from '@stitches/react';
import { Box, PersonBadge, ArrowClockwise } from 'react-bootstrap-icons';

import Grid from '/voxeliface/components/Grid';
import Button from '/voxeliface/components/Button';
import Typography from '/voxeliface/components/Typography';
import AccountPage from '/components/AccountPage';

import { supabase } from '/lib/supabase/client';

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

export default class VerificationContainers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    render() {
        return (
            <AccountPage>
                <Grid spacing="16px" direction="vertical" css={{
                    '@media screen and (max-width: 768px)': {
                        marginLeft: 40
                    }
                }}>
                    <Button theme="secondary" onClick={this.loadContainers.bind(this)} disabled={this.state.loading}>
                        <ArrowClockwise/>
                        Refresh
                    </Button>
                    <Grid wrap="wrap" spacing="24px">
                        {this.state.containers && this.state.containers.map((container, index) =>
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

    setSession(session) {
        this.setState({
            session,
            
            email: session.user.email
        });
        this.loadContainers();
    }

    async loadContainers() {
        this.setState({
            loading: true
        });

        const { data, error } = await supabase
        .from('verificationContainers')
        .select('*');

        this.setState({
            loading: false,
            containers: data
        });
    }
};
export { getServerSideProps } from '/lib/auth';