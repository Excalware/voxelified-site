import React from 'react';
import { Magic } from 'react-bootstrap-icons';

import Button from '../Button';

class MagicLinkLogin extends React.Component {
    render() {
        return (
            <Button
                mw={264}
                text="Send a Magic Link"
                icon={<Magic size={20}/>}
                theme={{
                    color: {
                        hover: "#9d7dad",
                        normal: "#ae8bbf",
                        active: "#c49ad9",
                        disabled: "#6b5278"
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
}

export default MagicLinkLogin;