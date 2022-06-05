import React from 'react';
import { useRouter } from 'next/router';

import App from '/components/App';
import Main from '/voxeliface/components/Main';
import Grid from '/voxeliface/components/Grid';
import Header from '/components/Header';
import RouteGuard from './RouteGuard';
import * as Navigation from './Navigation';
export default function ContainerPage({ children }) {
    const { asPath } = useRouter();
    const split = asPath.split("/");
    const url = split.splice(0, split.indexOf("containers") + 2).join("/");
    return (
        <App title="Voxelified Containers">
            <RouteGuard>
                <Header/>
                <Main>
                    <Grid height="100vh" margin="1rem 3rem" background="$secondaryBackground2" borderRadius={16} css={{
                        overflow: 'hidden'
                    }}>
                        <Navigation.Root data={[
                            ["Container", [
                                ["Details", `${url}`],
                                ["Members", `${url}/members`],
                                ["Bindings", `${url}/bindings`]
                            ]]
                        ]} buttons={[
                            ["Back to Verification", "/my/verification"]
                        ]}/>
                        <Grid width="100%" padding="2rem" direction="vertical" css={{
                                overflow: 'hidden auto'
                            }}>
                            {children}
                        </Grid>
                    </Grid>
                </Main>
            </RouteGuard>
        </App>
    );
};