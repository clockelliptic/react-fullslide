import React from 'react';
import styled, { keyframes } from 'styled-components'

/*
 * DESC:
 *  Container that fades in / out.
 *
 */
export default class FadeContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true,
            children: props.children,
        }
    }

    onHide () {
        this.setState({visibility: false})
    }

    render() {
        const Children = this.state.children
        return (
            <div>
            <Fade out={!this.state.visible}>
                <Children onHide={this.onHide.bind(this)} />
            </Fade>
            </div>
        );
    }
}


export const fadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;

export const fadeOut = keyframes`
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
`;

export const Fade = styled.div`
    visibility: ${props => props.out ? 'hidden' : 'visible'};
    animation: ${props => props.out ? fadeOut : fadeIn} 2s linear;
    transition: visibility 2s ease-in;
`;