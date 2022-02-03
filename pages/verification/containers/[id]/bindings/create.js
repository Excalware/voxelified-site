import ky from 'ky';
import React from 'react';
import { withRouter } from 'next/router';
import styled from 'styled-components';
import { CheckCircle } from 'react-bootstrap-icons';

import App from '../../../../../components/App';
import Main from '../../../../../components/Main';
import Card from '../../../../../components/Card';
import Grid from '../../../../../components/Grid';
import Image from '../../../../../components/Image';
import Table from '../../../../../components/Table';
import Alert from '../../../../../components/Alert';
import Header from '../../../../../components/Header';
import Button from '../../../../../components/Experimental/Button';
import Stepper from '../../../../../components/Stepper';
import ExpInput from '../../../../../components/Input/ExpInput';
import Typography from '../../../../../components/Typography';
import RouteGuard from '../../../../../components/RouteGuard';
import InputLabel from '../../../../../components/Input/Label';

import { supabase } from '../../../../../lib/supabase/client';

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

const TableButtonParent = styled.th`
    width: 65px;
`;

const TableButton = styled(Button)`
    width: 65px;
    color: white;
    height: 65px;
    border: none;
    margin: -12px -16px -12px -24px;
    min-width: unset;
    border-radius: 0;
    background-color: transparent;

    &:active {
        color: white;
        background-color: rgba(255, 255, 255, 0.1);
    }
    &:hover {
        color: white;
        background-color: rgba(255, 255, 255, 0.06);
    }
    &:disabled {
        color: rgba(255, 255, 255, 0.5);
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

export default withRouter(class ContainerBindingCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            type: -1,
            roles: [],
            error: null,
            groups: []
        };
    }

    render() {
        const split = this.props.router.asPath.split("/");
        const url = split.splice(0, split.indexOf("containers") + 2).join("/");
        return (
            <App>
                <RouteGuard>
                    <Header
                        text="voxel"
                        icon={"/favicon.ico"}
                    />
                    <Main>
                        <Grid spacing="24px" direction="vertical">
                            <Stepper step={this.state.step} steps={[
                                ["Choose Type", 
                                    <Grid key={0} spacing="16px" padding="24px 0" direction="horziontal">
                                        <Method img="/voxel.png" direction="vertical" alignItems="center" justifyContent="space-between">
                                            <div/>
                                            <Grid width="100%" height="30%" padding="0 16px" alignItems="center" justifyContent="space-between">
                                                <Typography text="Group Role"/>
                                                <Button onClick={() => this.type(0)} disabled={this.state.gettingCode}>
                                                    Proceed
                                                </Button>
                                            </Grid>
                                        </Method>
                                        <Method img="/voxel.png" direction="vertical" alignItems="center" justifyContent="space-between">
                                            <div/>
                                            <Grid width="100%" height="30%" padding="0 16px" alignItems="center" justifyContent="space-between">
                                                <Typography text="Experience Product"/>
                                                <Button onClick={() => this.type(1)} disabled>
                                                    Proceed
                                                </Button>
                                            </Grid>
                                        </Method>
                                        {this.state.error &&
                                            <Alert title="Unknown Error" body={this.state.error} margin="16px 0" severity="error"/>
                                        }
                                    </Grid>
                                ],
                                [this.state.type >= 0 ? ["Choose Group"][this.state.type] : "Step 2",
                                    [
                                        <Grid key={0} spacing="16px" padding="24px 128px">
                                            <Grid direction="vertical">
                                                <InputLabel for="groupNameId" text="Group Name or ID"/>
                                                <ExpInput
                                                    id="groupNameId"
                                                    width="236px"
                                                    value={this.state.groupNameId}
                                                    onChange={(event) => this.setState({
                                                        groupNameId: event.target.value
                                                    })}
                                                />
                                                <Button
                                                    width="236px"
                                                    margin="8px 0"
                                                    onClick={this.groupSearch.bind(this)}
                                                    disabled={this.state.searching}
                                                >
                                                    Search
                                                </Button>
                                                {this.state.error &&
                                                    <Alert title="Unknown Error" body={this.state.error} margin="16px 0" severity="error"/>
                                                }
                                            </Grid>
                                            <Card title="Groups Found" margin="16px 0" padding={0}>
                                                <Table>
                                                    <thead>
                                                        <tr>
                                                            <TableButtonParent/>
                                                            <th>
                                                                Name
                                                            </th>
                                                            <th>
                                                                Members
                                                            </th>
                                                            <th>
                                                                ID
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.groups.length == 0 ?
                                                            <tr>
                                                                <td/>
                                                                <td>
                                                                    No Groups Found
                                                                </td>
                                                                <td/>
                                                                <td/>
                                                            </tr>
                                                        :
                                                            this.state.groups.map((group, index) =>
                                                                <tr key={index}>
                                                                    <td>
                                                                        <TableButton onClick={() => this.selectGroup(group)}>
                                                                            <CheckCircle size={24}/>
                                                                        </TableButton>
                                                                    </td>
                                                                    <td>
                                                                        <Grid spacing="12px" alignItems="center">
                                                                            <Image src={group.image} alt="Group Image" width="40px" height="40px"/>
                                                                            <Typography text={group.name}/>
                                                                        </Grid>
                                                                    </td>
                                                                    <td>
                                                                        {group.memberCount}
                                                                    </td>
                                                                    <td>
                                                                        {group.id}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    </tbody>
                                                </Table>
                                            </Card>
                                        </Grid>
                                    ][this.state.type]
                                ],
                                [this.state.type >= 0 ? ["Choose Role"][this.state.type] : "Step 3",
                                    [
                                        <Grid key={0} spacing="16px" padding="24px 128px" direction="vertical">
                                            {this.state.error &&
                                                <Alert title="Unknown Error" body={this.state.error} margin="16px 0" severity="error"/>
                                            }
                                            <Card title="Group Roles Found" margin="16px 0" padding={0}>
                                                <Table>
                                                    <thead>
                                                        <tr>
                                                            <TableButtonParent/>
                                                            <th>
                                                                Name
                                                            </th>
                                                            <th>
                                                                Members
                                                            </th>
                                                            <th>
                                                                ID
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.roles.length == 0 ?
                                                            <tr>
                                                                <td/>
                                                                <td>
                                                                    No Roles Found
                                                                </td>
                                                                <td/>
                                                                <td/>
                                                            </tr>
                                                        :
                                                            this.state.roles.map((role, index) =>
                                                                <tr key={index}>
                                                                    <td>
                                                                        <TableButton onClick={() => this.selectGroupRole(role)}>
                                                                            <CheckCircle size={24}/>
                                                                        </TableButton>
                                                                    </td>
                                                                    <td>
                                                                        <Typography text={role.name}/>
                                                                    </td>
                                                                    <td>
                                                                        {role.memberCount}
                                                                    </td>
                                                                    <td>
                                                                        {role.id}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    </tbody>
                                                </Table>
                                            </Card>
                                        </Grid>
                                    ][this.state.type]
                                ],
                                ["Successful",
                                    <Grid key={0} padding="24px 0" direction="vertical">
                                        <Typography text="🥳 You have created a new binding! 🥳" size="2rem" weight={600} margin="0 0 16px 0"/>
                                        <InputLabel text="Overview coming soon!"/>
                                        <Button href={`${url}/bindings`}>
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
    }

    async groupSearch() {
        this.setState({
            searching: true
        });

        const { data, error, message } = await ky.get(`/api/v1/verification/search/groups/${encodeURI(this.state.groupNameId || "null")}`, {
            throwHttpErrors: false
        }).json();
        if(error)
            return this.setState({
                error: message,
                searching: false
            });
        this.setState({
            error: null,
            groups: data,
            searching: false
        });
    }

    async selectGroupRole(role) {
        if(this.state.searching)
            return;
        this.setState({
            searching: true
        });

        const { data, error } = await supabase
        .from('containerBindings')
        .insert([
            {
                cid: this.props.router.query.id,
                name: role.name,
                type: this.state.type,
                data: role.id
            }
        ]);
        if(error)
            return this.setState({
                error: error.message,
                searching: false
            });
        this.setState({
            step: 3,
            error: null,
            searching: false
        });
    }

    async type(type) {
        this.setState({
            step: 1,
            type
        });
    }

    async selectGroup(group) {
        this.setState({
            searching: true
        });

        const data = await ky.get(`/api/v1/verification/search/groups/${group.id}/roles`, {
            throwHttpErrors: false
        }).json();
        if(data.error)
            return this.setState({
                error: data.message,
                confirming: false
            });
        
        this.setState({
            step: 2,
            group,
            roles: data.data,
            error: null,
            searching: false
        });
    }
});
export { getServerSideProps } from '../../../../../lib/auth';