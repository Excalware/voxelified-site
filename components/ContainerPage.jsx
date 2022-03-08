import React from 'react';
import { withRouter } from 'next/router';

import App from '/voxeliface/components/App';
import Main from '/voxeliface/components/Main';
import Grid from '/voxeliface/components/Grid';
import Header from '/components/Header';
import Typography from '/voxeliface/components/Typography';
import Navigation from '/voxeliface/components/Navigation';
import RouteGuard from './RouteGuard';

export default withRouter(class ContainerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        const split = this.props.router.asPath.split("/");
        const url = split.splice(0, split.indexOf("containers") + 2).join("/");
        return (
            <App title="Voxelified Containers">
                <RouteGuard>
                    <Header
                        text={<>
                            <Typography
                                text="voxelified containers"
                                size="1.5rem"
                                weight={600}
                            />
                            <Typography text="beta" size=".8rem" color="#ffffffad" weight={600} css={{
                                margin: '0 0 0 8px',
                                height: 'fit-content',
                                padding: '1px 8px',
                                background: '#ffffff33',
                                fontFamily: 'Nunito, sans-serif',
                                borderRadius: 8
                            }}/>
                        </>}
                        icon={"/voxel-white.svg"}
                    />
                    <Grid height="calc(100vh - 64px)">
                        <Navigation data={[
                            ["Container", [
                                ["Details", `${url}`],
                                ["Members", `${url}/members`],
                                ["Bindings", `${url}/bindings`]
                            ]]
                        ]} buttons={[
                            ["Back to Verification", "/my/verification"]
                        ]}/>
                        <Main>
                            <Grid spacing="24px" direction="vertical">
                                {this.props.children}
                            </Grid>
                        </Main>
                    </Grid>
                </RouteGuard>
            </App>
        );
    }
});