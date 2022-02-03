import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

const AppComponent = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: row;
`;

export default class App extends React.Component {
    render() {
        return (
            <AppComponent>
                <Head>
                    <title>{this.props.title ?? "Voxel"}</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                    <meta property="og:title" content="Voxel"/>
                    <meta property="og:description" content="Placeholder"/>
                    <meta property="og:image" content="/voxel.png"/>
                    <meta name="theme-color" content="#121212"/>
                </Head>
                {this.props.children}
                <style jsx global>{`
                    body {
                        margin: 0px;
                        padding: 0px;
                    }
                `}</style>
            </AppComponent>
        );
    }
};