import React from 'react';
import { withRouter } from 'next/router';

import Grid from '../../../../components/Grid';
import Card from '../../../../components/Card';
import ExpInput from '../../../../components/Input/ExpInput';
import InputLabel from '../../../../components/Input/Label';
import ContainerPage from '../../../../components/ContainerPage';

import { supabase } from '../../../../lib/supabase/client';

export default withRouter(class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            containerName: ""
        };
    }

    render() {
        return (
            <ContainerPage>
                <Card title="Container Information">
                    <Grid spacing="16px" direction="vertical">
                        <Grid spacing="24px">
                            <Grid direction="vertical">
                                <InputLabel for="name-input" text="Container Name"/>
                                <ExpInput
                                    id="name-input"
                                    value={this.state.containerName}
                                    onChange={(event) => this.setState({
                                        containerName: event.target.value
                                    })}
                                    readOnly
                                    disabled
                                />
                            </Grid>
                        </Grid>
                    </Grid>
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
            .eq('id', id).then(({data, error}) => data[0]);

            this.setState({
                container,
                containerName: container.name
            });
        }, 1000);
    }
});