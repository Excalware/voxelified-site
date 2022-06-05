import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { PlusLg, ArrowClockwise } from 'react-bootstrap-icons';

import Grid from '/voxeliface/components/Grid';
import Table from '/voxeliface/components/Table';
import Button from '/voxeliface/components/Button';
import Header from '/voxeliface/components/Typography/Header';
import BasicSpinner from '/voxeliface/components/BasicSpinner';
import ContainerPage from '/components/ContainerPage';

import { supabase } from '/lib/supabase/client';
export default function ContainerBindings() {
    const { query: { id } } = useRouter();
    const { access_token } = useSelector(state => state.user.session);

    const [loading, setLoading] = useState(false);
    const [bindings, setBindings] = useState();
    useEffect(() => {
        if(!bindings && !loading && access_token) {
            setLoading(true);

            supabase.from('containerBindings')
            .select('name, type')
            .eq('cid', id).then(({ data, error }) => {
                if(error)
                    throw error;

                setBindings(data);
                setLoading(false);
            });
        }
    });
    return (
        <ContainerPage>
            <Header>Container Bindings</Header>
            <Grid margin="0 0 1rem" spacing={8}>
                <Button theme="secondary" onClick={() => setBindings()} disabled={loading}>
                    {loading ? <BasicSpinner size={16}/> : <ArrowClockwise/>}
                    Refresh
                </Button>
                <Button href="bindings/create">
                    <PlusLg size={14}/>
                    Create Binding
                </Button>
            </Grid>

            <Table css={{
                border: '1px solid $secondaryBorder',
                overflow: 'hidden',
                borderRadius: 8
            }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {!loading && bindings?.length > 0 ?
                        bindings.map((binding, index) =>
                            <tr key={index}>
                                <td>{binding.name}</td>
                                <td>{['Group Role'][binding.type]}</td>
                            </tr>
                        )
                    : <tr>
                        <td>No Bindings Found</td>
                        <td/>
                    </tr>}
                </tbody>
            </Table>
        </ContainerPage>
    );
};
export { getServerSideProps } from '/lib/auth';