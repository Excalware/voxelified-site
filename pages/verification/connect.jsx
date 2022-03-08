import ky from 'ky';
import React from 'react';
import { styled } from '@stitches/react';
import { Plus, ClipboardPlus } from 'react-bootstrap-icons';

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
import Typography from '/voxeliface/components/Typography';
import RouteGuard from '/components/RouteGuard';
import RobloxUser from '/components/RobloxUser';
import InputLabel from '/components/InputLabel';

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

export default class VerificationConnect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            error: null,
            method: 0,
            userId: 0,
            account: null,
            accounts: [],
            searching: false,
            nameUserId: "",
            confirming: false,
            verifyCode: "Placeholder",
            gettingCode: false
        };
    }

    render() {
        return (
            <App>
                <RouteGuard>
                    <Header/>
                    <Main>
                        <Button href="/my/verification" theme="secondary" css={{
                            left: 24,
                            bottom: 24,
                            position: 'absolute'
                        }}>
                            Back to Verification
                        </Button>
                        <Grid spacing="24px" direction="vertical">
                            <Stepper step={this.state.step} steps={[
                                ["Choose Account",
                                    <Grid1 key={0} wrap="wrap" width="100%" spacing="16px" padding="24px 128px" justifyContent="center">
                                        <Grid direction="vertical">
                                            <InputLabel for="nameUserId" text="Name, Username or ID"/>
                                            <TextInput
                                                id="nameUserId"
                                                width="236px"
                                                value={this.state.nameUserId}
                                                onChange={(event) => this.setState({
                                                    nameUserId: event.target.value
                                                })}
                                            />
                                            <Button
                                                onClick={this.search.bind(this)}
                                                disabled={this.state.searching}
                                                css={{
                                                    margin: '8px 0',
                                                    minWidth: 236
                                                }}
                                            >
                                                Search
                                            </Button>
                                            {this.state.error &&
                                                <Alert title="Unknown Error" body={this.state.error} margin="16px 0" severity="error"/>
                                            }
                                        </Grid>
                                        <Card1 title="Accounts Found" margin="16px 0">
                                            <Grid spacing="8px" direction="vertical">
                                                {this.state.accounts.length > 0 ?
                                                    this.state.accounts.map((user, index) =>
                                                        <RobloxUser
                                                            key={index}
                                                            id={user.id}
                                                            name={user.name}
                                                            avatar={user.image}
                                                            displayName={user.displayName}
                                                            buttons={
                                                                <Button onClick={() => this.selectAccount(user)}>
                                                                    <Plus/>
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
                                                <Button onClick={() => this.method(0)} disabled={this.state.gettingCode}>
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
                                                <Button onClick={() => this.method(1)} disabled>
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
                                                <Button onClick={() => this.method(2)} disabled>
                                                    Proceed
                                                </Button>
                                            </Grid>
                                        </StyledMethod>
                                    </Grid>
                                    {this.state.error &&
                                        <Alert title="Unknown Error" body={this.state.error} margin="16px 0" severity="error"/>
                                    }
                                </>],
                                ["Verify",
                                    <Grid key={0} padding="24px 0" direction="vertical">
                                        <Typography text="Profile Code Verification" size="2rem" weight={600} margin="0 0 16px 0"/>
                                        <InputLabel for="verifyCode" text="Verification Code"/>
                                        <TextInput
                                            id="verifyCode"
                                            width="300px"
                                            value={this.state.verifyCode}
                                            readOnly
                                        >
                                            <Button theme="secondary" onClick={_ => navigator.clipboard.writeText(document.getElementById("verifyCode").value)}>
                                                <ClipboardPlus/>
                                                Copy
                                            </Button>
                                        </TextInput>
                                        <Button onClick={this.confirm.bind(this)} disabled={this.state.confirming} css={{
                                            minWidth: 300,
                                            marginTop: 8
                                        }}>
                                            Confirm Code
                                        </Button>
                                        {this.state.error &&
                                            <Alert title="Unknown Error" body={this.state.error} margin="16px 0" severity="error"/>
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
                </RouteGuard>
            </App>
        );
    }

    async search() {
        this.setState({
            searching: true
        });

        const { data, error, message } = await ky.get(`/api/v1/verification/search/rbx/${encodeURI(this.state.nameUserId || "null")}`, {
            throwHttpErrors: false
        }).json();
        if(error)
            return this.setState({
                error: message,
                searching: false
            });
        this.setState({
            error: null,
            accounts: data,
            searching: false
        });
    }

    async method(method) {
        this.setState({
            gettingCode: true
        });
        const session = supabase.auth.session();
        const { code, error, message } = await ky.post('/api/v1/verification/connect', {
            json: {
                userId: this.state.account.id
            },
            headers: {
                authorization: session.access_token
            },
            throwHttpErrors: false
        }).json();
        if(error)
            return this.setState({
                error: message,
                gettingCode: false
            });
        this.setState({
            step: 2,
            error: null,
            method,
            verifyCode: code,
            gettingCode: false
        });
    }

    async confirm() {
        this.setState({
            confirming: true
        });
        const session = supabase.auth.session();
        const data = await ky.post('/api/v1/verification/confirm', {
            json: {
                code: this.state.verifyCode,
                method: this.state.method
            },
            headers: {
                authorization: session.access_token
            },
            throwHttpErrors: false
        }).json();
        if(data.error)
            return this.setState({
                error: data.message,
                confirming: false
            });
        
        this.setState({
            step: 3,
            confirming: false
        });
    }

    async selectAccount(user) {
        const { data, error } = await supabase
        .from('verificationUsers')
        .select('*')
        .match({ userId: user.id });
        if(error)
            return this.setState({
                error: error.message
            });

        for (let i = 0; i < data.length; i++) {
            if(data[i].verified)
                return this.setState({
                    step: 3
                });
        }

        this.setState({
            step: 1,
            account: user
        });
    }
};
export { getServerSideProps } from '/lib/auth';