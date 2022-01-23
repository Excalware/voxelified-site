import React from 'react';
import { withRouter } from 'next/router';
import styled from 'styled-components';

import Grid from '../../../../../components/Grid';
import Card from '../../../../../components/Card';
import Table from '../../../../../components/Table';
import Button from '../../../../../components/Experimental/Button';
import Spinner from '../../../../../components/Spinner';
import Typography from '../../../../../components/Typography';
import ContainerPage from '../../../../../components/ContainerPage';

import { supabase, supautil } from '../../../../../lib/supabase/client';

const Container = styled.a`
    gap: 2px;
    width: fit-content;
    border: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    padding: 16px 24px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 8px;
    flex-direction: column;
    text-decoration: none;
    background-color: #222222;

    &:hover {
        cursor: pointer;
        background-color: #2c2c2c;
    }
`;

export default withRouter(class ContainerBindings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bindings: []
        };
    }

    render() {
        const split = this.props.router.asPath.split("/");
        const url = split.splice(0, split.indexOf("containers") + 2).join("/");
        return (
            <ContainerPage>
                <Card title="Bindings" margin="16px 0" padding="0" buttons={
                    <Button href={`${url}/bindings/create`}>
                        Create Binding
                    </Button>
                }>
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
            const { id } = this.props.router.query;
            this.setState({
                session,
                
                email: session.user.email
            });

            supabase.from('verificationContainers')
            .select('*')
            .eq('id', id).then(({data, error}) => this.setState({
                container: data[0]
            }));

            supabase.from('containerBindings')
            .select('*')
            .eq('cid', id).then(({data, error}) => this.setState({
                bindings: data
            }));
        }, 1000);
    }
});