import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { PlusLg } from 'react-bootstrap-icons';

import Grid from '/voxeliface/components/Grid';
import Alert from '/voxeliface/components/Alert';
import Table from '/voxeliface/components/Table';
import Button from '/voxeliface/components/Button';
import Header from '/voxeliface/components/Typography/Header';
import Spinner from '/voxeliface/components/Spinner';
import TextInput from '/voxeliface/components/Input/Text';
import BasicSpinner from '/voxeliface/components/BasicSpinner';
import ContainerPage from '/components/ContainerPage';

import { supabase } from '/lib/supabase/client';
export default function ContainerMembers() {
    const { query: { id } } = useRouter();
    const { access_token } = useSelector(state => state.user.session);

    const [error, setError] = useState();
    const [members, setMembers] = useState();
    const [loading, setLoading] = useState(false);
    const [memberName, setMemberName] = useState();
    const [addingMember, setAddingMember] = useState(false);
    const addMember = async() => {
        setAddingMember(true);

        const { data, error } = await supabase.from('profiles')
        .select('*')
        .eq('name', memberName);
        if(error) {
            setError(error);
            return setAddingMember(false);
        }

        await supabase.from('containerMembers')
        .insert([{
            cid: id,
            uid: data[0].id
        }])
        .eq('cid', id)
        .then(({ data: [member], error }) => {
            if(error) {
                setError(error);
                return setAddingMember(false);
            }
            supabase.from('profiles')
            .select('*')
            .eq('id', member.uid)
            .then(({ data, error }) => {
                if(error) {
                    setError(error);
                    return setAddingMember(false);
                }

                member.profile = data[0];
                setMembers(v => [...v, member]);
                setAddingMember(false);
            });
        });
    };

    useEffect(() => {
        if(!members && !loading && access_token) {
            setLoading(true);

            supabase.from('containerMembers')
            .select('*')
            .eq('cid', id).then(({ data: members, error }) => {
                if(error)
                    throw error;

                supabase.from('profiles')
                .select('*')
                .filter('id', 'in', `(${members.map(m => `"${m.uid}"`).join(',')})`)
                .then(({ data, error }) => {
                    if(error)
                        throw error;
                    
                    setMembers(members.map(v => ({...v, profile: data.find(p => p.id === v.uid)})));
                    setLoading(false);
                });
            });
        }
    });
    return (
        <ContainerPage>
            <Header>Add New Member</Header>
            <Grid spacing={24}>
                <Grid direction="vertical">
                    <TextInput
                        id="member-input"
                        value={memberName}
                        onChange={setMemberName}
                        placeholder="Account name"
                    >
                        <Button onClick={addMember} disabled={addingMember}>
                            {addingMember ? <BasicSpinner size={16}/> : <PlusLg size={14}/>}
                            Add Member
                        </Button>
                    </TextInput>
                </Grid>
                {error &&
                    <Alert title="Unknown Error" body={error} margin="16px 0" severity="error"/>
                }
            </Grid>

            <Header spacious>
                {loading && <Spinner/>}
                Container Members
            </Header>
            <Table css={{
                border: '1px solid $secondaryBorder',
                overflow: 'hidden',
                borderRadius: 8
            }}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Account Name</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {members?.length > 0 ?
                        members.map((member, index) =>
                            <tr key={index}>
                                <td>{member.profile.username}</td>
                                <td>{member.profile.name}</td>
                                <td>Manager</td>
                            </tr>
                        )
                    : <tr>
                        <td>No Members Found</td>
                        <td/>
                        <td/>
                    </tr>}
                </tbody>
            </Table>
        </ContainerPage>
    );
};
export { getServerSideProps } from '/lib/auth';