import ky from 'ky';
import React, { useState, useEffect } from 'react';
import { styled } from '@stitches/react';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { PlusLg, Search, ArrowLeft, ClipboardPlus } from 'react-bootstrap-icons';

import App from '/voxeliface/components/App';
import Main from '/voxeliface/components/Main';
import Card from '/voxeliface/components/Card';
import Grid from '/voxeliface/components/Grid';
import Image from '/voxeliface/components/Image';
import Alert from '/voxeliface/components/Alert';
import Header from '/components/Header';
import Button from '/voxeliface/components/Button';
import Stepper from '/voxeliface/components/Stepper';
import TextInput from '/voxeliface/components/Input/Text';
import RouteGuard from '/components/RouteGuard';
import RobloxUser from '/components/RobloxUser';
import InputLabel from '/components/InputLabel';
import Typography from '/voxeliface/components/Typography';
import HeaderText from '/voxeliface/components/Typography/Header';
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

const Card1 = styled(Card, {
    '@media screen and (max-width: 768px)': {
        minWidth: '100%'
    }
});

const Grid1 = styled(Grid, {
    '@media screen and (max-width: 768px)': {
        flexWrap: 'wrap',
        paddingLeft: 0,
        paddingRight: 0
    }
});

export default function VerificationConnect() {
    const { user: { id: userId }, access_token } = useSelector(state => state.user.session);

    const [code, setCode] = useState();
    const [user, setUser] = useState();
    const [step, setStep] = useState(0);
    const [error, setError] = useState();
    const [account, setAccount] = useState();
    const [accounts, setAccounts] = useState();
    const [method, setMethod] = useState();
    const [loading, setLoading] = useState(false);
    const [nameUserId, setNameUserId] = useState();
    const copyCode = () => {
        navigator.clipboard.writeText(code);
        toast.success('Copied verification code!');
    };
    const confirm = async() => {
        setLoading(true);
        const { error, message } = await ky.post('/api/v1/verification/confirm', {
            json: { code, method },
            headers: { authorization: access_token },
            throwHttpErrors: false
        }).json();
        if(error) {
            setError(message);
            return setLoading(false);
        }
        
        setStep(3);
        setLoading(false);
    };
    const search = async() => {
        setLoading(true);

        const { data, error, message } = await ky.get(`/api/v1/verification/search/rbx/${encodeURI(nameUserId || "null")}`, {
            throwHttpErrors: false
        }).json();
        if(error) {
            setError(message);
            setAccounts();
            return setLoading(false);
        }

        setError();
        setLoading(false);
        setAccounts(data);
    };
    useEffect(() => {
        if(user) {
            setLoading(true);
            supabase.from('verificationUsers')
            .select('*')
            .match({ userId: user.id }).then(({ data, error }) => {
                if(error) {
                    setError(error.message);
                    return setLoading(false);
                }

                const verified = data.some(v => v.verified);
                if (verified) {
                    setStep(3);
                    return setLoading(false);
                }
                setStep(1);
                setAccount(user);
                setLoading(false);
            });
        }
    }, [user]);
    useEffect(() => {
        if(typeof method === 'number') {
            setLoading(true);
            ky.post('/api/v1/verification/connect', {
                json: { userId: user.id },
                headers: { authorization: access_token },
                throwHttpErrors: false
            }).json().then(({ code, error, message }) => {
                if(error) {
                    setError(message);
                    return setLoading(false);
                }
                setCode(code);
                setStep(2);
                setError();
                setLoading(false);
            });
        }
    }, [method]);

    return (
        <App>
            <RouteGuard>
                <Header/>
                <Main>
                    <Button href="/my/verification" theme="secondary" css={{
                        left: 24,
                        bottom: 24,
                        zIndex: 1000,
                        position: 'absolute'
                    }}>
                        <ArrowLeft size={14}/>
                        Back to Verification
                    </Button>
                    <Grid spacing={24} direction="vertical">
                        <Stepper step={step} steps={[
                            ["Choose Account",
                                <Grid1 key={0} wrap="wrap" width="100%" spacing="16px" padding="24px 128px" justifyContent="center">
                                    <Grid direction="vertical">
                                        <InputLabel for="nameUserId" text="Name, Username or ID"/>
                                        <TextInput
                                            id="nameUserId"
                                            width={236}
                                            value={nameUserId}
                                            onChange={setNameUserId}
                                        >
                                            <Button onClick={search} disabled={loading}>
                                                {loading ? <BasicSpinner size={16}/> : <Search/>}
                                                Search
                                            </Button>
                                        </TextInput>
                                        {error &&
                                            <Alert title="Unknown Error" body={error} margin="16px 0" severity="error"/>
                                        }
                                    </Grid>
                                    <Card1 title="Accounts Found" margin="16px 0">
                                        <Grid spacing={8} direction="vertical">
                                            {accounts?.length > 0 ?
                                                accounts.map((user, index) =>
                                                    <RobloxUser
                                                        key={index}
                                                        id={user.id}
                                                        name={user.name}
                                                        avatar={user.image}
                                                        displayName={user.displayName}
                                                        buttons={
                                                            <Button onClick={() => setUser(user)}>
                                                                <PlusLg size={14}/>
                                                                Continue
                                                            </Button>
                                                        }
                                                    />
                                                )
                                            :
                                                "place and hold er"
                                            }
                                        </Grid>
                                    </Card1>
                                </Grid1>
                            ],
                            ["Choose Method", <>
                                <Grid key={0} wrap="wrap" width="100%" spacing="16px" padding="24px 0" direction="horziontal" justifyContent="center">
                                    <StyledMethod alt="Method 0 Image" css={{
                                        '& > div:first-child': {
                                            backgroundImage: 'url(/verify-method-1.png)'
                                        }
                                    }}>
                                        <div/>
                                        <Grid width="100%" margin="12px 0" padding="0 1rem" alignItems="center" justifyContent="space-between">
                                            <Typography text="Profile Code"/>
                                            <Button onClick={() => {
                                                setMethod(0);
                                                setStep(1);
                                            }} disabled={loading}>
                                                Proceed
                                            </Button>
                                        </Grid>
                                    </StyledMethod>
                                    <StyledMethod alt="Method 1 Image" css={{
                                        '& > div:first-child': {
                                            backgroundImage: 'url(/voxel.png)'
                                        }
                                    }}>
                                        <div/>
                                        <Grid width="100%" margin="12px 0" padding="0 1rem" alignItems="center" justifyContent="space-between">
                                            <Typography text="In-Experience"/>
                                            <Button disabled>
                                                Proceed
                                            </Button>
                                        </Grid>
                                    </StyledMethod>
                                    <StyledMethod alt="Method 2 Image" css={{
                                        '& > div:first-child': {
                                            backgroundImage: 'url(/voxel.png)'
                                        }
                                    }}>
                                        <div/>
                                        <Grid width="100%" margin="12px 0" padding="0 1rem" alignItems="center" justifyContent="space-between">
                                            <Typography text="Roblox OAuth"/>
                                            <Button disabled>
                                                Proceed
                                            </Button>
                                        </Grid>
                                    </StyledMethod>
                                </Grid>
                                {error &&
                                    <Alert title="Unknown Error" body={error} margin="16px 0" severity="error"/>
                                }
                            </>],
                            ["Verify",
                                <Grid key={0} padding="24px 0" direction="vertical">
                                    <HeaderText>Profile Code Verification ({user?.name})</HeaderText>
                                    <InputLabel htmlFor="code">
                                        Verification Code
                                    </InputLabel>
                                    <TextInput
                                        id="code"
                                        width={300}
                                        value={code}
                                        readOnly
                                    >
                                        <Button theme="secondary" onClick={copyCode}>
                                            <ClipboardPlus/>
                                            Copy
                                        </Button>
                                    </TextInput>
                                    <Button onClick={confirm} disabled={loading} css={{
                                        minWidth: 300,
                                        marginTop: 8
                                    }}>
                                        Confirm Code
                                    </Button>
                                    {error &&
                                        <Alert title="Unknown Error" body={error} margin="16px 0" severity="error"/>
                                    }
                                    <Grid margin="24px 0" spacing="24px">
                                        <Grid spacing="4px" direction="vertical">
                                            <InputLabel text="Open your profile page."/>
                                            <Image src="https://gyazo.com/9a56d413c5fc0a258e8a2ed7a74a6fed.gif" alt="Profile Open GIF" width="10rem" height="16rem" borderRadius="8px"/>
                                        </Grid>
                                        <Grid spacing="4px" direction="vertical">
                                            <InputLabel text="Then, enter your verification code!"/>
                                            <Image src="https://gyazo.com/1e825dd9193c35fd657c47ea6c803d3b.gif" alt="Profile Edit GIF" width="36rem" height="16rem" borderRadius="8px"/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ],
                            ["Connected",
                                <Grid key={0} padding="24px 0" direction="vertical">
                                    <Typography text="🥳 You have connected your account! 🥳" size="2rem" weight={600} margin="0 0 16px 0"/>
                                    <Button href="/my/verification">
                                        Back to Verification
                                    </Button>
                                </Grid>
                            ]
                        ]}/>
                    </Grid>
                </Main>
                <Toaster/>
            </RouteGuard>
        </App>
    );
};
export { getServerSideProps } from '/lib/auth';