import React, { useRef, useEffect } from 'react';
import styled from 'styled-components'
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Col, Box, CodeSnippet, CodeBlock, Terminal } from './helpers'

/* Layout */
const ResponsiveGridLayout = WidthProvider(Responsive);

/*
 * **************************************************
 *  SLIDE CONTENT
 *
 *  This should be rendered as the direct child of a
 *  'react-sliding-panes.Slide' node/component.
 * **************************************************
 */

export function SlideProps () {
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
----------------------------------------------------------------------
------  prop  ----  default value  -------  type  ----------  comments
----------------------------------------------------------------------
     lazy:      [true,               PropTypes.bool  ],
     once:      [true,               PropTypes.bool  ],  // lazyloaded only once?

`;

    return(<React.Fragment>
                <ResponsiveGridLayout {...gridParams} style={{minHeight:'100vh', minWidth:'100vw', overflow: 'hidden'}}>
                    <Col key="center" color="dark">
                        <Box flex={true}>
                            If lazyloading slides have <CodeSnippet>{`once={false}`}</CodeSnippet>, they will be unmounted every time they are invisible.
                        </Box>
                    </Col>
                    <Col key="left" color="light">
                        <Box>
                            <h4>
                                <CodeSnippet>Slide</CodeSnippet> defaultProps and propTypes
                            </h4>

                            <Terminal>
                            {
                                minimalExample
                            }
                            </Terminal>

                        </Box>
                    </Col>
                    <Col key="right" color="mid" />
                </ResponsiveGridLayout>
    </React.Fragment>)
}
