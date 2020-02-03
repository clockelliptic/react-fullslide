import React, { useRef, useEffect } from 'react';
import styled from 'styled-components'
import { Col, Box, CodeSnippet, CodeBlock, Terminal } from './helpers'

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

export function SliderProps () {
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
     showNavDots:      [true,         PropTypes.bool  ],
     navDotColor:      ['#fff',       PropTypes.string],
     navDotPos:        ['primary',    PropTypes.string], //or 'secondary'
     initialPage:      [1,            PropTypes.number],
     buttonIds:        [[],           PropTypes.array ],
     easing:           ['ease-out',   PropTypes.string],
     initialPage:      [1,            PropTypes.number], // 1-based indexing
     touchEnabled:     [true,         PropTypes.bool  ],
     wheelEnabled:     [true,         PropTypes.bool  ],
     onAfterScroll:    [function(){}, PropTypes.func  ],
     onBeforeScroll:   [function(){}, PropTypes.func  ],
     swipeSensitivity: [100,          PropTypes.number],
     transDuration:    [1,            PropTypes.number], // seconds
     orientation:      ['y' (or 'x'), PropTypes.string],

`;

    return(<React.Fragment>
                <ResponsiveGridLayout {...gridParams} style={{minHeight:'100vh', minWidth:'100vw', overflow: 'hidden'}}>
                    <Col key="center" color="dark">
                        <Box flex={true}>
                            Both <CodeSnippet>Slider</CodeSnippet> and <CodeSnippet>SubSlider</CodeSnippet> can take any of these props.
                        </Box>
                    </Col>
                    <Col key="left" color="light">
                        <Box>
                            <h4>
                                <CodeSnippet>Slider</CodeSnippet> defaultProps and propTypes
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
