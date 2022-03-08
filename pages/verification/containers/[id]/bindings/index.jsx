import React from 'react';
import { withRouter } from 'next/router';
import { ArrowClockwise } from 'react-bootstrap-icons';

import Grid from '/voxeliface/components/Grid';
import Card from '/voxeliface/components/Card';
import Table from '/voxeliface/components/Table';
import Button from '/voxeliface/components/Button';
import Spinner from '/voxeliface/components/Spinner';
import Typography from '/voxeliface/components/Typography';
import ContainerPage from '/components/ContainerPage';

import { supabase } from '/lib/supabase/client';

export default withRouter(class ContainerBindings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            bindings: []
        };
    }

    render() {
        const split = this.props.router.asPath.split("/");
        const url = split.splice(0, split.indexOf("containers") + 2).join("/");
        return (
            <ContainerPage>
                <Card title={
                    <Grid spacing="12px" alignItems="center">
                        <Typography
                            text="Bindings"
                            size="1.2rem"
                            color="white"
                            weight={600}
                        />
                        {this.state.loading && <Spinner size={24}/>}
                    </Grid>
                } margin="16px 0" padding="0" buttons={<>
                    <Button theme="secondary" onClick={this.loadBindings.bind(this)} disabled={this.state.loading}>
                        <ArrowClockwise/>
                        Refresh
                    </Button>
                    <Button href={`${url}/bindings/create`}>
                        Create Binding
                    </Button>
                </>}>
                    <Table>
                        <thead>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Type
                                </th>
                                <th>
                                    In-Use
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.bindings.length > 0 ?
                                this.state.bindings.map((binding, index) =>
                                    <tr key={index}>
                                        <td>
                                            {binding.name}
                                        </td>
                                        <td>
                                            {["Group Role"][binding.type]}
                                        </td>
                                        <td>
                                            N/A
                                        </td>
                                    </tr>
                                )
                            :
                                <tr>
                                    <td>
                                        No Bindings Found
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

    async setSession(session) {
        setTimeout(() => {
            this.setState({
                session,
                
                email: session.user.email
            });

            this.loadBindings();
        }, 1000);
    }

    loadBindings() {
        const { id } = this.props.router.query;
        this.setState({ loading: true });

        supabase.from('containerBindings')
            .select('name, type')
            .eq('cid', id).then(({ data }) => this.setState({
                loading: false,
                bindings: data
            }));
    }
});
export { getServerSideProps } from '/lib/auth';