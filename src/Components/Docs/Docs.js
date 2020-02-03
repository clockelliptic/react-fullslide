import React, { useRef, useEffect } from 'react';
import styled from 'styled-components'
import { Slider, SubSlider, Slide } from '../react-fullslide'

import gametext from './slides/gametext.svg'
import hamburger from './slides/hamburger.svg'
import SVG from 'react-inlinesvg'

import { MinimalExample } from './slides/MinimalExample'
import { MinimalNested } from './slides/MinimalNested'
import { AddingSlideContent } from './slides/AddingSlideContent'
import { SliderProps } from './slides/SliderProps'
import { SlideProps } from './slides/SlideProps'
import { Hamburger } from './slides/Hamburger'

export default function DocSlides() {
    return (
          <Slider
            orientation={`x`}
            transDuration={0.5}
            initialPage={1}
            navDotColor={"rgb(25, 144, 184)"}
            navDotPos={'top'}
          >

              <Slide style={{backgroundColor:'#ffaada'}}>
                <Hamburger />
              </Slide>

              <Slide style={{backgroundColor:'rgba(255,255,255,1)'}}>
                <MinimalExample />
                <Num>1</Num>
              </Slide>

              <Slide style={{backgroundColor:'rgba(255,255,255,1)'}}>
                <MinimalNested />
                <Num>2</Num>
              </Slide>

              <Slide style={{backgroundColor:'rgba(0,0,0,0.0)'}}>
                <Num>3</Num>
                <AddingSlideContent />
              </Slide>

              <SubSlider
                style={{backgroundColor:'rgba(255,255,255,1)'}}
                initialPage={1}
                transDuration={0.8}
                navDotColor={"rgb(25, 144, 184)"}
              >
                    <Slide style={{backgroundColor:'rgba(0,0,0,0.0)'}}>
                      <SliderProps />
                      <Num>4.1</Num>
                    </Slide>
                    <Slide style={{backgroundColor:'rgba(0,0,0,0.1)'}}>
                      <SlideProps />
                      <Num>4.2</Num>
                    </Slide>
              </SubSlider>


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
    font-weight: 800;
    color: rgb(25, 144, 184);
    position: absolute;
    border: 4px solid rgb(25, 144, 184);
    border-radius: 50%;
    top: 1vh;
    right: 1vw;
    width: 1.6em;
    height: 1.6em;
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