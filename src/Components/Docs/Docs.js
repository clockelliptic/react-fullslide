import React, { useRef, useEffect } from 'react';
import styled from 'styled-components'
import { Slider, SubSlider, Slide } from '../react-fullslide'

import { MinimalExample } from './slides/MinimalExample'
import { MinimalNested } from './slides/MinimalNested'
import { AddingSlideContent } from './slides/AddingSlideContent'

export default function DocSlides() {
    return (
          <Slider
            orientation={`y`}
            transDuration={0.5}
            initialPage={3}
            navDotColor={"#000"}
          >
              <Slide style={{backgroundColor:'rgba(255,255,255,1)'}}>
                <MinimalExample />
                <Num>1</Num>
              </Slide>

              <Slide style={{backgroundColor:'rgba(255,255,255,1)'}}>
                <MinimalNested />
                <Num>2</Num>
              </Slide>

              <SubSlider
                style={{backgroundColor:'rgba(255,255,255,1)'}}
                initialPage={1}
                transDuration={0.8}
                navDotColor={"#000"}
                navDotPos={'secondary'}
              >
                    <Slide style={{backgroundColor:'rgba(0,0,0,0.0)'}}>
                      <Num>3.1</Num>
                      <AddingSlideContent />
                    </Slide>
                    <Slide style={{backgroundColor:'rgba(0,0,0,0.1)'}}>
                      <Num>3.2</Num>
                    </Slide>
                    <Slide style={{backgroundColor:'rgba(0,0,0,0.2)'}}>
                      <Num>3.3</Num>
                    </Slide>
              </SubSlider>

              <Slide style={{backgroundColor:'rgba(255,255,255,1)'}}>
                <Num>4</Num>
              </Slide>

              <Slide style={{backgroundColor:'rgba(255,255,255,1)'}}>
                <Num>5</Num>
              </Slide>

              <Slide style={{backgroundColor:'rgba(255,255,255,1)'}}>
                <Num>6</Num>
              </Slide>

              <Slide style={{backgroundColor:'rgba(255,255,255,1)'}}>
                <Num>7</Num>
              </Slide>
          </Slider>
    )
}



/* *****************************************************
 *  Helper Components
 */ ////////////////////////////////////////////////////

const Num = styled.div`
    /* large numbers indicating page number */
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 2em;
    line-height: 0.8em;
    font-weight: 600;
    color: #000;
    position: absolute;
    border: 1px solid #000;
    border-radius: 50%;
    top: 1vh;
    right: 1vw;
    width: 1.5em;
    height: 1.5em;
    z-index: 99999999;
    /*transform: translatey(-50%) translatex(-50%);*/
`;

const NavButton = styled.div`
    font-size: 10em;
    font-family: Courier, monospace;
    top: 50%;
    transform: translatey(-50%);
    color: rgba(255,255,255,1);
    font-weight: 200;
    position: absolute;
    z-index: 101;
    display: flex;
    text-align: center;
    align-items: center;
    align-content: center;
    justify-content: center;
    transition: font-size 0.3s ease-out;
    /* hover effects etc. */
    &:hover {
        color: rgba(255,255,255,1.0);
        font-weight: 400;
        font-size: 11em;
    }
    &:active {
        font-size: 13em;
    }
`;

const PrevButton = styled(NavButton)`
    /* desired positioning on page */
    right: 94vw;
    left: 0;
`;

const NextButton = styled(NavButton)`
    /* desired positioning on page */
    left: 93vw;
    right: 0;
`;

const ButtonText = styled.div`
    /* IMPORTANT! disable touch-actions and pointer-events on all button components that to not contain the 'to' prop */
    touch-action: none;
    pointer-events: none;
    transform: scalex(0.5);
`;