import ky from 'ky';
import React, { useState, useEffect } from 'react';
import { styled } from '@stitches/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Search, ArrowLeft, CheckCircle } from 'react-bootstrap-icons';

import App from '/voxeliface/components/App';
import Main from '/voxeliface/components/Main';
import Card from '/voxeliface/components/Card';
import Grid from '/voxeliface/components/Grid';
import Image from '/voxeliface/components/Image';
import Table from '/voxeliface/components/Table';
import Alert from '/voxeliface/components/Alert';
import Header from '/components/Header';
import Button from '/voxeliface/components/Button';
import Stepper from '/voxeliface/components/Stepper';
import TextInput from '/voxeliface/components/Input/Text';
import Typography from '/voxeliface/components/Typography';
import RouteGuard from '/components/RouteGuard';
import InputLabel from '/components/InputLabel';
import BasicSpinner from '/voxeliface/components/BasicSpinner';

import { supabase } from '/lib/supabase/client';

const StyledMethod = styled('div', {
    width: '18rem',
    height: '12rem',
    display: 'flex',
    overflow: 'hidden',
    alignItems: 'center',
    background: '#2c2c2c',
    borderRadius: 6,
    flexDirection: 'column',
    justifyContent: 'space-between',

    '& > div:first-child': {
        width: '100%',
        flexGrow: 1,
        objectFit: 'cover',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: 'left'
    }
});

const TableButtonParent = styled('th', {
    width: 65
});

export default function ContainerBindingCreator() {
    const { query: { id } } = useRouter();
    const { access_token } = useSelector(state => state.user.session);

    const [type, setType] = useState();
    const [role, setRole] = useState();
    const [step, setStep] = useState(0);
    const [error, setError] = useState();
    const [roles, setRoles] = useState();
    const [group, setGroup] = useState();
    const [groups, setGroups] = useState();
    const [loading, setLoading] = useState(false);
    const [groupNameId, setGroupNameId] = useState();
    const search = async() => {
        setLoading(true);

        const { data, error, message } = await ky.get(`/api/v1/verification/search/groups/${encodeURI(groupNameId || "null")}`, {
            throwHttpErrors: false
        }).json();
        if(error) {
            setError(message);
            setGroups();
            return setLoading(false);
        }

        setError();
        setGroups(data);
        setLoading(false);
    };
    useEffect(() => {
        if(group) {
            setLoading(true);
            ky.get(`/api/v1/verification/search/groups/${group.id}/roles`, {
                throwHttpErrors: false
            }).json().then(({ data, error }) => {
                if(error) {
                    setError(error.message);
                    return setLoading(false);
                }
                setStep(2);
                setError();
                setRoles(data);
                setLoading(false);
            });
        }
    }, [group]);
    useEffect(() => {
        if(role) {
            setLoading(true);
            supabase.from('containerBindings')
            .insert([{
                cid: id,
                name: role.name,
                type,
                data: role.id
            }]).then(({ error }) => {
                if(error) {
                    setError(error.message);
                    return setLoading(false);
                }
                setStep(3);
                setError();
                setLoading(false);
            });
        }
    }, [role]);

    return (
        <App>
            <RouteGuard>
                <Header/>
                <Main>
                    <Button href="." theme="secondary" css={{
                        left: 24,
                        bottom: 24,
                        zIndex: 1000,
                        position: 'absolute'
                    }}>
                        <ArrowLeft size={14}/>
                        Back to Bindings
                    </Button>
                    <Grid spacing={24} direction="vertical">
                        <Stepper step={step} steps={[
                            ["Choose Type", 
                                <Grid key={0} wrap="wrap" width="100%" spacing="16px" padding="24px 0" direction="horziontal" justifyContent="center">
                                    <StyledMethod css={{
                                        '& > div:first-child': {
                                            backgroundImage: 'url(/voxel.png)'
                                        }
                                    }}>
                                        <div/>
                                        <Grid width="100%" height="30%" padding="0 16px" alignItems="center" justifyContent="space-between">
                                            <Typography text="Group Role"/>
                                            <Button onClick={() => {
                                                setType(0);
                                                setStep(1);
                                            }}>
                                                Proceed
                                            </Button>
                                        </Grid>
                                    </StyledMethod>
                                    <StyledMethod css={{
                                        '& > div:first-child': {
                                            backgroundImage: 'url(/voxel.png)'
                                        }
                                    }}>
                                        <div/>
                                        <Grid width="100%" height="30%" padding="0 16px" alignItems="center" justifyContent="space-between">
                                            <Typography text="Experience Product"/>
                                            <Button disabled>
                                                Proceed
                                            </Button>
                                        </Grid>
                                    </StyledMethod>
                                    {error &&
                                        <Alert title="Unknown Error" body={error} margin="16px 0" severity="error"/>
                                    }
                                </Grid>
                            ],
                            [type >= 0 ? ['Choose Group'][type] : 'Step 2',
                                [
                                    <Grid key={0} width="100%" spacing="16px" padding="24px 128px" justifyContent="center" css={{
                                        '@media screen and (max-width: 768px)': {
                                            flexWrap: 'wrap',
                                            paddingLeft: 0,
                                            paddingRight: 0
                                        }
                                    }}>
                                        <Grid direction="vertical">
                                            <InputLabel htmlFor="groupNameId">
                                                Group Name or ID
                                            </InputLabel>
                                            <TextInput
                                                id="groupNameId"
                                                width="236px"
                                                value={groupNameId}
                                                onChange={setGroupNameId}
                                                autoComplete="none"
                                            />
                                            <Button
                                                onClick={search}
                                                disabled={loading}
                                                css={{
                                                    margin: '8px 0',
                                                    minWidth: 236
                                                }}
                                            >
                                                {loading ? <BasicSpinner size={16}/> : <Search/>}
                                                Search
                                            </Button>
                                            {error &&
                                                <Alert title="Unknown Error" body={error} margin="16px 0" severity="error"/>
                                            }
                                        </Grid>
                                        <Card title="Groups Found" width="auto" margin="16px 0" padding={0} css={{
                                            '@media screen and (max-width: 768px)': {
                                                minWidth: '100%'
                                            }
                                        }}>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <TableButtonParent/>
                                                        <th>Name</th>
                                                        <th>Members</th>
                                                        <th>Identifier</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {groups?.length > 0 ?
                                                        groups.map((group, index) =>
                                                            <tr key={index}>
                                                                <td>
                                                                    <Button onClick={() => setGroup(group)} css={{
                                                                        width: 65,
                                                                        color: '#fff',
                                                                        height: 65,
                                                                        border: 'none',
                                                                        margin: '-12px -16px -12px -24px',
                                                                        minWidth: 'unset',
                                                                        background: 'none',
                                                                        borderRadius: 0,
                                                                    
                                                                        '&:active': {
                                                                            color: '#fff',
                                                                            background: 'rgba(255, 255, 255, 0.1)',
                                                                        },
                                                                        '&:hover': {
                                                                            color: '#fff',
                                                                            background: 'rgba(255, 255, 255, 0.06)',
                                                                        },
                                                                        '&:disabled': {
                                                                            color: 'rgba(255, 255, 255, 0.5)',
                                                                            background: 'rgba(0, 0, 0, 0.1)'
                                                                        }
                                                                    }}>
                                                                        <CheckCircle size={24}/>
                                                                    </Button>
                                                                </td>
                                                                <td>
                                                                    <Grid spacing={12} alignItems="center">
                                                                        <Image src={group.image} alt="Group Image" width="40px" height="40px"/>
                                                                        <Typography text={group.name}/>
                                                                    </Grid>
                                                                </td>
                                                                <td>{group.memberCount}</td>
                                                                <td>{group.id}</td>
                                                            </tr>
                                                        )
                                                    : <tr>
                                                        <td/>
                                                        <td>No Groups Found</td>
                                                        <td/>
                                                        <td/>
                                                    </tr>}
                                                </tbody>
                                            </Table>
                                        </Card>
                                    </Grid>
                                ][type]
                            ],
                            [type >= 0 ? ['Choose Role'][type] : 'Step 3',
                                [
                                    <Grid key={0} width="100%" spacing="16px" padding="24px 128px" direction="vertical" css={{
                                        '@media screen and (max-width: 768px)': {
                                            flexWrap: 'wrap',
                                            paddingLeft: 0,
                                            paddingRight: 0
                                        }
                                    }}>
                                        {error &&
                                            <Alert title="Unknown Error" body={error} margin="16px 0" severity="error"/>
                                        }
                                        <Card title="Group Roles Found" margin="16px 0" padding={0} css={{
                                            '@media screen and (max-width: 768px)': {
                                                minWidth: '100%'
                                            }
                                        }}>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <TableButtonParent/>
                                                        <th>Name</th>
                                                        <th>Members</th>
                                                        <th>Identifier</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {roles?.length > 0 ?
                                                        roles.map((role, index) =>
                                                            <tr key={index}>
                                                                <td>
                                                                    <Button onClick={() => setRole(role)} css={{
                                                                        width: 65,
                                                                        color: '#fff',
                                                                        height: 65,
                                                                        border: 'none',
                                                                        margin: '-12px -16px -12px -24px',
                                                                        minWidth: 'unset',
                                                                        background: 'none',
                                                                        borderRadius: 0,
                                                                    
                                                                        '&:active': {
                                                                            color: '#fff',
                                                                            background: 'rgba(255, 255, 255, 0.1)',
                                                                        },
                                                                        '&:hover': {
                                                                            color: '#fff',
                                                                            background: 'rgba(255, 255, 255, 0.06)',
                                                                        },
                                                                        '&:disabled': {
                                                                            color: 'rgba(255, 255, 255, 0.5)',
                                                                            background: 'rgba(0, 0, 0, 0.1)'
                                                                        }
                                                                    }}>
                                                                        <CheckCircle size={24}/>
                                                                    </Button>
                                                                </td>
                                                                <td><Typography text={role.name}/></td>
                                                                <td>{role.memberCount}</td>
                                                                <td>{role.id}</td>
                                                            </tr>
                                                        )
                                                    : <tr>
                                                        <td/>
                                                        <td>
                                                            No Roles Found
                                                        </td>
                                                        <td/>
                                                        <td/>
                                                    </tr>}
                                                </tbody>
                                            </Table>
                                        </Card>
                                    </Grid>
                                ][type]
                            ],
                            ["Finished!",
                                <Grid key={0} padding="24px 0" direction="vertical">
                                    <Typography size="2rem" weight={600} margin="0 0 16px 0">
                                        🥳 You have created a new binding! 🥳
                                    </Typography>
                                    <InputLabel>
                                        Overview coming soon!
                                    </InputLabel>
                                    <Button href=".">
                                        Back to Bindings
                                    </Button>
                                </Grid>
                            ]
                        ]}/>
                    </Grid>
                </Main>
            </RouteGuard>
        </App>
    );
};
export { getServerSideProps } from '/lib/auth';