import React, { useEffect, useRef } from 'react';
import styled from 'styled-components'


import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import './customScrollBar.css'

import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import { duotoneSpace } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
SyntaxHighlighter.registerLanguage('jsx', jsx);

/* **********************************************
 * Code Highlighting
 */
export const terminalStyle = duotoneSpace
export const codeBlockStyle = coy

export const CodeHighlighter= styled(SyntaxHighlighter)`
    background: none !important;
    font-size: 0.9em;
    text-shadow: #000;
`;

export const Terminal = ({children}) => {
    const Bar = styled.div`
        position: relative;
        display: flex;
        width: 100%;
        height: 2em;
        background: #fff;
        flex-direction: row;
        align-items: center;
        align-content: end;
        justify-content: flex-end;
    `;

    const BarButton = styled.div`
        width: 0.5em;
        height: 0.5em;
        border: 0px solid rgba(0,0,0,0);
        border-radius: 50%;
        margin-right: 0.5em;
    `;

    const Window = styled.div`
        display: flex;
        border: 1px solid #333;
        border-radius: 7px;
        background: rgb(36, 36, 46); !important;
        width: 100%;
        max-height: 30em;
        overflow: hidden;
        flex-direction: column;
    `;

    const WindowBody = styled.div`
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: row;
    `;

    const SideBar = styled.div`
        width: 10%;
        display: flex;
        background: rgba(255,255,255,0.1);
        flex-direction: column;
    `;

    const SideItem = styled.div`
        overflow: hidden;
        width: 100%;
        height: 3em;
        display: inline-block;
        background: rgba(0,0,0,0.2);
        margin-top: 0.1em;
    `;

    const VisibleSimpleBar = (props) => <SimpleBar {...props} forceVisible='y' autoHide={false}><ScrollBox>{props.children}</ScrollBox></SimpleBar>

    const Term = styled(VisibleSimpleBar)`
        position: relative;
        display: inline-block;
        width: 100%;
        max-height: 28em;
    `;

    return (
        <Window>
            <Bar><BarButton style={{background: '#4d4'}} /><BarButton style={{background: '#fe5'}} /><BarButton style={{background: '#f34'}} /></Bar>
            <WindowBody>
            <SideBar>{Array().fill().map(_ => <SideItem key={`${Math.floor(Math.random()*10000000000)}`} />)}</SideBar>
            <Term>
                <CodeHighlighter language="javascript" style={terminalStyle}>
                    {children}
                </CodeHighlighter>
            </Term>
            </WindowBody>
        </Window>
    )
}

/* **********************************************
 * CodeSnippet
 */
export const CodeSnippet = styled.code`
    background: rgba(0,0,0,0.1)
`;

/* **********************************************
 * CodeBlock
 */

export const CodeBlock = ({children}) => (
    <div style={{background: "rgba(0,0,0,0.0)", border: '1px solid rgba(0,0,0,0.7)', borderRadius: '7px', 'padding': '0.7em 1em', margin: '0.5em 0'}}>
        <CodeHighlighter language="javascript" style={codeBlockStyle}>
            {children}
        </CodeHighlighter>
    </div>
);


/* **********************************************
 * Col
 */

export const Col = styled.div`
    display: flex;
    flex-direction: column;
    ${
        props => {
            switch(props.color){
                case 'mid':
                    return (`
                        background: #fbc1bc;
                    `);
                case 'light':
                    return (`
                        background: #ffaada;
                    `);
                case 'dark':
                    return (`
                        background: #fff;
                    `);
            }
        }
    }
`;


/* **********************************************
 * Box
 *
 *  Prevents scroll propagatin within (normal) scrollable overflow containers.
 *  unless user has scrolled to the bottom of the overflow container.
 *
 */

const BoxContainer = styled.div`
    display: ${props => props.flex ? 'flex' : 'block'};
    overflow-x: hidden;
    height: 100vh;
    align-items: center;
    justify-content: flex-start;

`;

const BoxContent = styled.div`
    position: relative;
    padding: 2% 4% 8% 4%;
    width: 96%%;
`;


export const Box = ({children, flex}) => {
    const boxId = `boxContainer${Math.floor(Math.random()*1000)}${new Date().getTime()}`
    return(
        <BoxContainer id={boxId} flex={flex}>
            <BoxContent id={`content_${boxId}`}>
                {
                    children
                }
            </BoxContent>
        </BoxContainer>
    );
}



/* **********************************************
 * ScrollBox
 *
 *
 *  Prevents scroll propagatin within overflow containers.
 *
 */

export const ScrollBox = ({children}) => {
    const boxId = `boxContainer${Math.floor(Math.random()*1000)}${new Date().getTime()}`

    const Content = styled.div`
        position: relative;
        width: 100%;
        height: 100%
    `;

    const DetectBottom = styled.div`
        position: absolute;
        bottom: 0;
        width: 10%;
        height: 1px;
        background-color: rgba(0,0,0,50.1);

    `;

    useEffect(() => {

        const onScroll = (e) => {
            e.stopPropagation()
        }

        try {
            document.getElementById(boxId).addEventListener('wheel', onScroll)
            document.getElementById(boxId).addEventListener('touchstart', onScroll)
            document.getElementById(boxId).addEventListener('touchmove', onScroll)
            document.getElementById(boxId).addEventListener('touchend', onScroll)
        } catch (err) {
            console.error(err)
        }
        return(() => {
            try {
                document.getElementById(boxId).removeEventListener('wheel', onScroll)
                document.getElementById(boxId).removeEventListener('touchstart', onScroll)
                document.getElementById(boxId).removeEventListener('touchmove', onScroll)
                document.getElementById(boxId).removeEventListener('touchend', onScroll)
            } catch {}
        })
    })

    return(
        <Content id={`${boxId}`}>
            {
                children
            }
        </Content>
    );
}