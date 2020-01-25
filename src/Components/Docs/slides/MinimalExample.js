import React, { useRef, useEffect } from 'react';
import styled from 'styled-components'

/* Layout */
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveGridLayout = WidthProvider(Responsive);

/*
 * **************************************************
 *  SLIDE CONTENT
 *
 *  This should be rendered as the direct child of a
 *  'react-sliding-panes.Slide' node/component.
 * **************************************************
 */

export function MinimalExample () {
    const static_layout = true;
    const layouts = {
        xl: [
            {i: 'left', x: 0 , y:0 , w:4 , h:1 , static: static_layout},
            {i: 'center' , x:4 , y:0 , w:3 , h:1 , static: static_layout},
            {i: 'right' , x:4 , y:0 , w:0 , h:0 , static: static_layout},
        ],
        lg: [
            {i: 'left', x: 0 , y:0 , w:4 , h:1 , static: static_layout},
            {i: 'center' , x:4 , y:0 , w:3 , h:1 , static: static_layout},
            {i: 'right' , x:4 , y:0 , w:0 , h:0 , static: static_layout},
        ],
        md: [
            {i: 'left', x: 0 , y:0 , w:4 , h:1 , static: static_layout},
            {i: 'center' , x:4 , y:0 , w:3 , h:1 , static: static_layout},
            {i: 'right' , x:99 , y:0 , w:0 , h:0 , static: static_layout},
        ],
        sm: [
            {i: 'left', x: 0 , y:0 , w:1 , h:1 , static: static_layout},
            {i: 'center' , x:2 , y:0 , w:2 , h:1 , static: static_layout},
            {i: 'right' , x:99 , y:0 , w:0 , h:0 , static: static_layout},
        ],
        xs: [
            {i: 'left', x: 0 , y:0 , w:1 , h:1 , static: static_layout},
            {i: 'center' , x:2 , y:0 , w:2 , h:1 , static: static_layout},
            {i: 'right' , x:99 , y:0 , w:0 , h:0 , static: static_layout},
        ],
    }

    const gridParams = {
        "autoResize" : true,
        "breakpoints" : {
            xl: 1280,
            lg: 1080,
            md: 800,
            sm: 768,
            xs: 700,
        },
        "cols" : {
            xl: 7,
            lg: 7,
            md: 7,
            sm: 1,
            xs: 1,
        },
        "containerPadding" : {
            xl: [0, 0],
            lg: [0, 0],
            md: [0, 0],
            sm: [0, 0],
            xs: [0, 0],
        },
        "margin" : {
            xl: [0,0],
            lg: [0,0],
            md: [0,0],
            sm: [0,0],
            xs: [0,0],
        },
        "verticalCompact" : true,
        "compactType" : 'vertical',
        "rowHeight" : 1600,
        "className": "layout",
        "layouts" : layouts,
    }

    const minimalExample = `
export default function App (props) {
    return (
        <Slider>

            <Slide> 1 </Slide>

            <Slide> 2 </Slide>

            <Slide> 3 </Slide>

        </Slider>
    );
}
    `;

    return(<React.Fragment>
                <ResponsiveGridLayout {...gridParams} style={{minHeight:'100vh', minWidth:'100vw', overflow: 'hidden'}}>
                    <Col key="center" color="dark">
                        <Box flex={true}>
                            <strong>Very Important:</strong><br />
                            <CodeSnippet>Slide</CodeSnippet> components should be the <em><strong>only</strong> immediate</em> children of <CodeSnippet>Slider</CodeSnippet> components. <br /><br />
                            <CodeSnippet>Slide</CodeSnippet> components should <em><strong>always</strong> be the immediate</em> children of either <CodeSnippet>Slider</CodeSnippet> or <CodeSnippet>SubSlider</CodeSnippet> components.
                        </Box>
                    </Col>
                    <Col key="left" color="light" align={'start'} alignSelf={'center'}>
                        <Box>
                            <h1>
                            react-sliding-panes
                            </h1>

                            <h4>
                            Minimal Example
                            </h4>

                            <CodeBlock>
                            {
                                minimalExample
                            }
                            </CodeBlock>

                        </Box>
                    </Col>
                    <Col key="right" color="mid" />
                </ResponsiveGridLayout>
    </React.Fragment>)
}


const CodeSnippet = styled.code`
    background: rgba(0,0,0,0.1)
`;

const CodeBlock = ({children}) => {
    const PreCode = ({children}) => (<div><pre><code className={"language-javascript language-js js javascript"}>{children}</code></pre></div>)

    const Block = styled.div`
        display: block;
        padding: 1em 1em;
        background: rgba(0,0,0,0.05);
        color: #444;
        white-space: pre;
        overflow-x: scroll;
    `;

    return <Block><PreCode>{children}</PreCode></Block>
}


const Col = styled.div`
    display: flex;
    flex-direction: column;
    ${
        props => {
            switch(props.color){
                case 'mid':
                    return (`
                        background: rgba(145,165,185,1.0);
                    `);
                case 'light':
                    return (`
                        background: rgba(255,255,255,1.0);
                    `);
                case 'dark':
                    return (`
                        background: rgba(195,215,235,1.0);
                    `);
            }
        }
    }
`;

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

const Box = ({children, flex}) => {
    const boxId = `boxContainer${Math.floor(Math.random()*1000)}${new Date().getTime()}`

    const DetectBottom = styled.div`
        position: absolute;
        bottom: 0;
        width: 10%;
        height: 1px;
        background-color: rgba(0,0,0,50.1);

    `;

    const status = useRef({
        atBottom: false,
    })

    function on_bottomDetected (entries, observer) {
        status.current.atBottom = true
        console.log(entries)
    }

    let options = {
        root: document.getElementById(`content_${boxId}`),
        rootMargin: '0px',
        threshold: 0,
    }

    let observer = new IntersectionObserver(on_bottomDetected, options)

    useEffect(() => {

        const onWheel = (e) => {
            console.log("wheel detected")
            if (status.current.atBottom){
                console.log('at the bottom!')
            } else {
                console.log('not at the bottom')
                e.stopPropagation()
                status.current.atBottom = false;
            }
        }

        try {
            observer.observe(document.getElementById(boxId))
            document.getElementById(boxId).addEventListener('wheel', onWheel)
        } catch (err) {
            console.error(err)
        }
        return(() => {
            try {
                document.getElementById(boxId).removeEventListener('wheel', onWheel)
            } catch {}
        })
    })

    return(
        <BoxContainer id={boxId} flex={flex}>
            <BoxContent id={`content_${boxId}`}>
                <DetectBottom id={`bottom_${boxId}`} />
                {
                    children
                }
            </BoxContent>
        </BoxContainer>
    );
}