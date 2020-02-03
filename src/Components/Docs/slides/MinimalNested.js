import React, { useRef, useEffect } from 'react';
import styled from 'styled-components'
import { Col, Box, CodeSnippet, CodeBlock, Terminal } from './helpers'
import { Responsive, WidthProvider } from 'react-grid-layout';



/*

import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/arta.css';
hljs.registerLanguage('javascript', javascript);
hljs.configure({
    tabReplace: '    ',
    useBR: true,
})
hljs.initHighlighting()
*/


const ResponsiveGridLayout = WidthProvider(Responsive);

/*
 * **************************************************
 *  SLIDE CONTENT
 *
 *  This should be rendered as the direct child of a
 *  'react-sliding-panes.Slide' node/component.
 * **************************************************
 */

export function MinimalNested () {
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
export default function NestedSliderApp (props) {
    return (
        <Slider>

            <Slide> 1 </Slide>

            <Slide key={'slide-2'}>
            /* key props are optional unless generating slides from an array */
                2
            </Slide>

            <SubSlider key={'slide-3'}>
                {
                    childSlides.map((Feature, i) => (
                        <Slide key={\`slide-3-\${i+1}\`}>
                        /* slides are 1-indexed internally */
                            {\`3.\${i+1}\`}
                        </Slide>
                    ))
                }
            </SubSlider>

        </Slider>
    );
}
    `;

    return(<React.Fragment>
                <ResponsiveGridLayout {...gridParams} style={{minHeight:'100vh', minWidth:'100vw', overflow: 'hidden'}}>
                    <Col key="center" color="dark">
                        <Box flex={true}>
                            <strong>Take-away:</strong><br />
                            <CodeSnippet>Slide</CodeSnippet><strong> and </strong><CodeSnippet>SubSlider</CodeSnippet> components should be the <em><strong>only</strong> immediate</em> children of <CodeSnippet>Slider</CodeSnippet> components. <br /><br />
                            A maximum (1-indexed) nesting depth of 2 is supported. That means a single ancestor, with any number of second-generation children. In other words, the parent <CodeSnippet>Slider</CodeSnippet> can have mulitple <em>direct</em> <CodeSnippet>SubSlider</CodeSnippet> children. <br /><br />
                            Why? Because this component exists on a real 2-dimensional plane. Each additional layer of nesting requires either (a) an additional dimension of motion or (b) a different imlementation. <br /><br />
                            Methods for adding additional scroll dimensions will be included in future releases.
                        </Box>
                    </Col>
                    <Col key="left" color="light">
                        <Box>
                            <h4>
                                Minimal Example - Nested Sliders
                            </h4>

                            <Terminal >
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
