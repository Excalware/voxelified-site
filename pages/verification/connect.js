import ky from 'ky';
import React from 'react';
import styled from 'styled-components';
import { Plus, ClipboardPlus } from 'react-bootstrap-icons';

import App from '../../components/App';
import Main from '../../components/Main';
import Card from '../../components/Card';
import Grid from '../../components/Grid';
import Image from '../../components/Image';
import Alert from '../../components/Alert';
import Header from '../../components/Header';
import Button from '../../components/Experimental/Button';
import Stepper from '../../components/Stepper';
import ExpInput from '../../components/Input/ExpInput';
import Typography from '../../components/Typography';
import RouteGuard from '../../components/RouteGuard';
import RobloxUser from '../../components/RobloxUser';
import InputLabel from '../../components/Input/Label';

import { supabase } from '../../lib/supabase/client';

const Method = styled(Grid)`
    width: 18rem;
    height: 12rem;
    overflow: hidden;
    border-radius: 6px;
    background-color: #2c2c2c;

    & > div:first-child {
        width: 100%;
        height: 70%;
        object-fit: cover;
        background-size: cover;
        background-image: url(${props => props.img});
        background-repeat: no-repeat;
        background-position-x: left;
    }
`;

const Card1 = styled(Card)`
    @media screen and (max-width: 768px) {
        min-width: 100%;
    }
`;

const Grid1 = styled(Grid)`
    @media screen and (max-width: 768px) {
        flex-wrap: wrap;
        padding-left: 0;
        padding-right: 0;
    }
`;

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
                    <Header
                        text="voxel"
                        icon={"/voxel-white.svg"}
                    />
                    <Main>
                        <Grid spacing="24px" direction="vertical">
                            <Stepper step={this.state.step} steps={[
                                ["Choose Account",
                                    <Grid1 key={0} wrap="wrap" width="100%" spacing="16px" padding="24px 128px" justifyContent="center">
                                        <Grid direction="vertical">
                                            <InputLabel for="nameUserId" text="Name, Username or ID"/>
                                            <ExpInput
                                                id="nameUserId"
                                                width="236px"
                                                value={this.state.nameUserId}
                                                onChange={(event) => this.setState({
                                                    nameUserId: event.target.value
                                                })}
                                            />
                                            <Button
                                                width="236px"
                                                margin="8px 0"
                                                onClick={this.search.bind(this)}
                                                disabled={this.state.searching}
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
                                ["Choose Method", 
                                    <Grid key={0} wrap="wrap" width="100%" spacing="16px" padding="24px 0" direction="horziontal" justifyContent="center">
                                        <Method img="/verify-method-1.png" alt="Method 0 Image" direction="vertical" alignItems="center" justifyContent="space-between">
                                            <div/>
                                            <Grid width="100%" margin="0 0 10px 0" padding="0 16px" alignItems="center" justifyContent="space-between">
                                                <Typography text="Profile Code"/>
                                                <Button onClick={() => this.method(0)} disabled={this.state.gettingCode}>
                                                    Proceed
                                                </Button>
                                            </Grid>
                                        </Method>
                                        <Method img="/voxel.png" alt="Method 1 Image" direction="vertical" alignItems="center" justifyContent="space-between">
                                            <div/>
                                            <Grid width="100%" margin="0 0 10px 0" padding="0 16px" alignItems="center" justifyContent="space-between">
                                                <Typography text="In-Experience"/>
                                                <Button onClick={() => this.method(1)} disabled>
                                                    Proceed
                                                </Button>
                                            </Grid>
                                        </Method>
                                        <Method img="/voxel.png" alt="Method 2 Image" direction="vertical" alignItems="center" justifyContent="space-between">
                                            <div/>
                                            <Grid width="100%" margin="0 0 10px 0" padding="0 16px" alignItems="center" justifyContent="space-between">
                                                <Typography text="Roblox OAuth"/>
                                                <Button onClick={() => this.method(2)} disabled>
                                                    Proceed
                                                </Button>
                                            </Grid>
                                        </Method>
                                        {this.state.error &&
                                            <Alert title="Unknown Error" body={this.state.error} margin="16px 0" severity="error"/>
                                        }
                                    </Grid>
                                ],
                                ["Verify",
                                    <Grid key={0} padding="24px 0" direction="vertical">
                                        <Typography text="Profile Code Verification" size="2rem" weight={600} margin="0 0 16px 0"/>
                                        <InputLabel for="verifyCode" text="Verification Code"/>
                                        <ExpInput
                                            id="verifyCode"
                                            width="300px"
                                            value={this.state.verifyCode}
                                            readOnly
                                        >
                                            <Button theme="secondary" onClick={_ => navigator.clipboard.writeText(document.getElementById("verifyCode").value)}>
                                                <ClipboardPlus/>
                                                Copy
                                            </Button>
                                        </ExpInput>
                                        <Button width="300px" margin="16px 0 0 0" onClick={this.confirm.bind(this)} disabled={this.state.confirming}>
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
export { getServerSideProps } from '../../lib/auth';