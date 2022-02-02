import React from 'react';
import styled from 'styled-components';

const MainComponent = styled.table`
    width: 100%;
    margin: ${props => props.margin ?? "0"};
    text-align: left;
    table-layout: fixed;
    border-spacing: 0;

    & * {
        padding: 0;
    }

    & th {
        color: #bbbbbb;
        font-weight: 500;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        background-color: #222222;
    }

    & td {
        font-weight: 500;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        background-color: #1D1D1D;
    }

    & tr:last-child td {
        border-bottom: none;
    }

    & th:last-child, & td:last-child {
        border-right: none;
    }

    & th, & td {
        padding: 12px 16px 12px 24px;
        font-size: .875rem;
        border-right: 1px solid rgba(255, 255, 255, 0.08);
    }
`;

export default class Table extends React.Component {
    render() {
        return (
            <MainComponent margin={this.props.margin}>
                {this.props.children}
            </MainComponent>
        );
    }
};