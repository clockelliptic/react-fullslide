import React, { useRef, useEffect } from 'react';
import styled from 'styled-components'
import { Col, Box, CodeSnippet, CodeBlock, Terminal } from './helpers'

import gametext from './gametext.svg'
import hamburger from './hamburger.svg'
import SVG from 'react-inlinesvg'

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

export function Hamburger () {
    const static_layout = true;
    const layouts = {
        xl: [
            {i: 'left', x: 0 , y:0 , w:2.5 , h:1 , static: static_layout},
            {i: 'center' , x:2.5 , y:0 , w:4.5 , h:1 , static: static_layout},
            {i: 'right' , x:4 , y:0 , w:0 , h:0 , static: static_layout},
        ],
        lg: [
            {i: 'left', x: 0 , y:0 , w:2.5 , h:1 , static: static_layout},
            {i: 'center' , x:2.5 , y:0 , w:4.5 , h:1 , static: static_layout},
            {i: 'right' , x:4 , y:0 , w:0 , h:0 , static: static_layout},
        ],
        md: [
            {i: 'left', x: 0 , y:0 , w:2.5 , h:1 , static: static_layout},
            {i: 'center' , x:2.5 , y:0 , w:4.5 , h:1 , static: static_layout},
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
            xl: [56, 0],
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


    return(<React.Fragment>
                <ResponsiveGridLayout {...gridParams} style={{minHeight:'100vh', minWidth:'100vw', overflow: 'hidden'}}>

                    <div
                        key='left'
                        style={{
                            position: 'absolute',
                            top: '0',
                            height: '100vh'
                        }}
                    >
                            <SVG style={{display: 'inline-block', position: 'absolute', marginTop: '25%', height: '50vh'}} src={hamburger} />
                    </div>

                    <div
                        key='center'
                        style={{
                            position: 'absolute',
                            top: '0',
                            height: '100vh'
                        }}
                    >
                            <SVG src={gametext} style={{display: 'block', height: '50vh', marginTop: '15%'}} />

                            <div style={{display: 'block', color: '#fff', fontSize: '2em', width: '100%', textAlign: 'center'}}>
                                SWIPE OR SCROLL TO CONTINUE
                            </div>

                    </div>

                </ResponsiveGridLayout>
    </React.Fragment>)
}
