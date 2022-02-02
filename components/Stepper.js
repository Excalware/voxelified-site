import React from 'react';
import styled, { keyframes } from 'styled-components';

import Grid from './Grid';
import Typography from './Typography';

const MainComponent = styled(Grid)`
    padding: 24px;
    align-items: center;
    border-radius: 8px;
    justify-content: center;
    background-color: #2C2C2C;
`;

const DividerComponent = styled.div`
    width: 1px;
    height: 1px;
    flex-grow: 1;
    background-color: rgba(255, 255, 255, 0.2);
`;

const StepComponent = styled.div`
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    border-radius: 50%;
    justify-content: center;
    background-color: ${props => props.color};
`;

const anim1 = keyframes`
    from {
        left: 0;
    }

    to {
        left: -100%;
    }
`;

const anim2 = keyframes`
    from {
        left: 0;
    }

    to {
        left: -100%;
    }
`;

const Grid1 = styled(Grid)`
    position: relative;
    min-width: 100%;
    animation: ${props => props.anim} 1s cubic-bezier(0.4, 0, 0.2, 1);
    animation-fill-mode: forwards;
`;

const Grid2 = styled(Grid)`
    position: relative;
    min-width: 100%;
    animation: ${props => props.anim} 1s cubic-bezier(0.4, 0, 0.2, 1);
    animation-fill-mode: forwards;
`;

const GridHolder = styled(Grid)`
    overflow: hidden;
    max-width: 100%;
`;

export default class Stepper extends React.Component {
    render() {
        const steps = [...this.props.steps];
        let stepIndex = 0;
        for (let i = 1; i < steps.length; i += 2) {
            steps.splice(i, 0, "divide");
        }
        return (
            <Grid direction="vertical">
                <MainComponent>
                    {steps.map((step, index) =>
                        step == "divide" ?
                            <DividerComponent key={index}/>
                        :
                            <Grid key={index} margin="0 8px" spacing="8px" alignItems="center">
                                <StepComponent color={stepIndex <= this.props.step ? "#00E87E" : "rgba(255, 255, 255, 0.5)"}>
                                    <Typography text={stepIndex += 1} size="0.75rem" color={"#000000de"}/>
                                </StepComponent>
                                <Typography text={step[0]} size="14px" color={stepIndex - 1 <= this.props.step ? "white" : "rgba(255, 255, 255, 0.5)"} weight={stepIndex - 1 <= this.props.step ? 500 : 300}/>
                            </Grid>
                    )}
                </MainComponent>
                <GridHolder width="100%">
                    <Grid1 key={1 + this.props.step} anim={anim2} width="100%" direction="vertical" alignItems="center">
                        {this.props.step == 0 ? null : this.props.steps[this.props.step - 1][1]}
                    </Grid1>
                    <Grid2 key={2 + this.props.step} anim={anim1} width="100%" direction="vertical" alignItems="center">
                        {this.props.step == 0 ? this.props.steps[0][1] : this.props.steps[this.props.step][1]}
                    </Grid2>
                </GridHolder>
            </Grid>
        );
    }
};