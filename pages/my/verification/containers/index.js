import React from 'react';
import styled from 'styled-components';
import { Box, PersonBadge, ArrowClockwise } from 'react-bootstrap-icons';

import Grid from '../../../../components/Grid';
import Button from '../../../../components/Experimental/Button';
import Typography from '../../../../components/Typography';
import AccountPage from '../../../../components/AccountPage';

import { supabase } from '../../../../lib/supabase/client';

const Container = styled.a`
    gap: 2px;
    width: fit-content;
    border: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    padding: 16px 24px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 8px;
    flex-direction: column;
    text-decoration: none;
    background-color: #222222;

    &:hover {
        cursor: pointer;
        background-color: #2c2c2c;
    }
`;

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
                <Button theme="secondary" onClick={this.loadContainers.bind(this)} disabled={this.state.loading}>
                    <ArrowClockwise/>
                    Refresh
                </Button>
                <Grid spacing="24px">
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