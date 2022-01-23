import React from 'react';
import { Discord } from 'react-bootstrap-icons';

import Button from '../Button';

export default class DiscordLogin extends React.Component {
    render() {
        return (
            <Button
                mw={264}
                text="Continue with Discord"
                icon={<Discord size={20}/>}
                theme={{
                    color: {
                        hover: "#646ed1",
                        normal: "#5865F2",
                        active: "#9aa2ed",
                        disabled: "#6067a8"
                    },
                    border: {
                        hover: "transparent",
                        normal: "transparent",
                        active: "transparent",
                        disabled: "transparent"
                    },
                    textColor: {
                        hover: "#E1E1E1",
                        normal: "#FFFFFF",
                        active: "#CBCBCB",
                        disabled: "#565656"
                    }
                }}
                {...this.props}
            />
        );
    }
};