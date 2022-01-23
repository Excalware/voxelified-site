import ky from 'ky';
import App from '../components/App';
import Card from '../components/Card';
import Grid from '../components/Grid';
import Main from '../components/Main';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import Typography from '../components/Typography';

import React from 'react';

export default class RobloxStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            overallStatus: "Checking...",
            statusColor: null,
            checking: [false, false],
            apis: [[], []]
        };
    }

    async componentDidMount() {
        this.setState({
            checking: [true, true]
        });
        ky.get('/api/v1/rbx-status-1', {
            timeout: false
        }).json().then(data => {
            this.setState(state => {
                state.checking[0] = false;
                return {
                    overallStatus: data.text || [
                        "Available",
                        "Unavailable",
                        "Undergoing Maintenance"
                    ][data.status],
                    statusColor: [
                        "#88ff88",
                        "#ff5252",
                        "#ffc14f"
                    ][data.status],
                    checking: state.checking
                };
            });
        });
        ky.get('/api/v1/rbx-status-2', {
            timeout: false
        }).json().then(data => {
            this.setState(state => {
                state.checking[1] = false;
                return {
                    checking: state.checking,
                    apis: data.apis
                };
            });
        });
    }

    render() {
        return (
            <App>
                <Header text="voxel" icon={"/favicon.ico"}/>
                <Main>
                    <Typography
                        text="Roblox Status"
                        size="2rem"
                        weight={600}
                    />
                    <Typography
                        text="Refreshes every 60 seconds"
                        size="0.8rem"
                        color="#ffffff55"
                    />
                    <Grid margin="24px 0 0 0" spacing="16px">
                        <Card title="Overall Status">
                            <Typography
                                text={this.state.overallStatus}
                                color={this.state.statusColor || "white"}
                                margin="0 16px 0 0"
                            />
                            <Spinner size={22} visible={this.state.checking[0]}/>
                        </Card>
                        <Card title="API Availability">
                            <Typography
                                text={`${this.state.apis[0].length} / ${this.state.apis[1].length} Available`}
                                margin="0 16px 0 0"
                            />
                            <Spinner size={22} visible={this.state.checking[1]}/>
                        </Card>
                    </Grid>
                </Main>
            </App>
        );
    }
};