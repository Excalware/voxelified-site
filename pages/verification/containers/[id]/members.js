import React from 'react';
import { withRouter } from 'next/router';

import Grid from '../../../../components/Grid';
import Card from '../../../../components/Card';
import Alert from '../../../../components/Alert';
import Table from '../../../../components/Table';
import Button from '../../../../components/Experimental/Button';
import Spinner from '../../../../components/Spinner';
import ExpInput from '../../../../components/Input/ExpInput';
import Typography from '../../../../components/Typography';
import InputLabel from '../../../../components/Input/Label';
import ContainerPage from '../../../../components/ContainerPage';

import { supabase } from '../../../../lib/supabase/client';

export default withRouter(class ContainerMembers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            loading: true,
            addingMember: false
        };
    }

    render() {
        return (
            <ContainerPage>
                <Card title="Add A Member">
                    <Grid spacing="16px" direction="vertical">
                        <Grid spacing="24px">
                            <Grid direction="vertical">
                                <InputLabel for="member-input" text="Account Name"/>
                                <ExpInput
                                    id="member-input"
                                    value={this.state.memberName}
                                    onChange={(event) => this.setState({
                                        memberName: event.target.value
                                    })}
                                />
                                <Button margin="8px 0 0 0" onClick={this.addMember.bind(this)} disabled={this.state.addingMember}>
                                    Add Member
                                </Button>
                            </Grid>
                            {this.state.error &&
                                <Alert title="Unknown Error" body={this.state.error} margin="16px 0" severity="error"/>
                            }
                        </Grid>
                    </Grid>
                </Card>
                <Card title={
                    <Grid spacing="12px" alignItems="center">
                        <Typography
                            text="Container Members"
                            size="1.2rem"
                            color="white"
                            weight={600}
                        />
                        {this.state.loading && <Spinner size={24}/>}
                    </Grid>
                } padding={0}>
                    <Table>
                        <thead>
                            <tr>
                                <th>
                                    Username
                                </th>
                                <th>
                                    Account Name
                                </th>
                                <th>
                                    Role
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.members.length > 0 ?
                                this.state.members.map((member, index) =>
                                    <tr key={index}>
                                        <td>
                                            {member.profile.username}
                                        </td>
                                        <td>
                                            {member.profile.name}
                                        </td>
                                        <td>
                                            Manager
                                        </td>
                                    </tr>
                                )
                            :
                                <tr>
                                    <td>
                                        No Members Found
                                    </td>
                                    <td/>
                                    <td/>
                                </tr>
                            }
                        </tbody>
                    </Table>
                </Card>
            </ContainerPage>
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
        setTimeout(async() => {
            const { id } = this.props.router.query;
            this.setState({
                session,
                
                email: session.user.email
            });

            const container = await supabase
            .from('verificationContainers')
            .select('*')
            .eq('id', id).
            then(({data, error}) => {
                if(error)
                    throw new Error(error.message);
                return data[0];
            });

            const members = await supabase
            .from('containerMembers')
            .select('*')
            .eq('cid', id)
            .then(({data, error}) => {
                if(error)
                    throw new Error(error.message);
                return data;
            });

            const profiles = await supabase
            .from('profiles')
            .select('*')
            .filter('id', 'in', `(${members.map(m => `"${m.uid}"`).join(',')})`)
            .then(({data, error}) => {
                if(error)
                    throw new Error(error.message);
                return data;
            });
            
            for (const member of members)
                member.profile = profiles.find(p => p.id === member.uid);

            this.setState({
                members,
                loading: false,
                container
            });
        }, 1000);
    }

    async addMember() {
        this.setState({
            addingMember: true
        });

        const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('name', this.state.memberName);
        if(error)
            return this.setState({
                error: error.message,
                addingMember: false
            });

        supabase
        .from('containerMembers')
        .insert([
            {
                cid: this.state.container.id,
                uid: data[0].id
            }
        ])
        .eq('cid', this.state.container.id)
        .then(({ data, error }) => {
            if(error)
                return this.setState({
                    error: error.message,
                    addingMember: false
                });
            const member = data[0];

            supabase
            .from('profiles')
            .select('*')
            .eq('id', member.uid)
            .then(({ data, error }) => {
                member.profile = data[0];
                this.state.members.push(member);
                this.setState({
                    addingMember: false
                });
            });
        });
    }
});