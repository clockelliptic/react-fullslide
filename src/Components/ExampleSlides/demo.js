import React, { useRef, useEffect } from 'react';
import styled from 'styled-components'
import { Slider, SubSlider, Slide } from '../react-fullslide'

/* CUSTOM COMPONENTS */
import { ExampleSlideContent } from './responsiveHooksTemplate'

function SliderDemo() {

    const slide3_buttonIds = ['Slide3_Next', 'Slide3_Prev']

    return (
          <Slider
            orientation={`y`}
            touchEnabled={true}
            wheelEnabled={true}
            transDuration={0.8}
            initialPage={3}
          >
              <Slide style={{backgroundColor:'rgba(155,55,255,1)'}}>
                <Num>1</Num>
              </Slide>

              <Slide style={{backgroundColor:'rgba(55,155,255,1)'}}>
                <Num>2</Num>
              </Slide>

              <SubSlider
                style={{backgroundColor:'rgba(55,255,155,1)'}}
                buttons={Slide_3_Buttons}
                buttonIds={slide3_buttonIds}
                showButtons={true}
                initialPage={1}
              >
                    <Slide style={{backgroundColor:'rgba(0,0,0,0.0)'}}>
                      <Num>3.1</Num>
                    </Slide>
                    <Slide style={{backgroundColor:'rgba(0,0,0,0.1)'}}>
                      <Num>3.2</Num>
                    </Slide>
                    <Slide style={{backgroundColor:'rgba(0,0,0,0.2)'}}>
                      <Num>3.3</Num>
                    </Slide>
              </SubSlider>

              <Slide style={{backgroundColor:'rgba(255,255,155,1)'}}>
                <Num>4</Num>
              </Slide>

              <Slide style={{backgroundColor:'rgba(255,155,55,1)'}}>
                <Num>5</Num>
              </Slide>

              <Slide style={{backgroundColor:'rgba(255,55,55,1)'}}>
                <Num>6</Num>
              </Slide>

              <Slide style={{backgroundColor:'rgba(255,55,155,1)'}}>
                <Num>7</Num>
              </Slide>
          </Slider>
    )
}

export default SliderDemo;


/* *****************************************************
 *  Custom navigation buttons
 */ ////////////////////////////////////////////////////

const Slide_3_Buttons = (props) => {
    /* ----  UI EFFECTS, et al  ---- */
    const containerRef = useRef(null),
          setStyles = useStyleApplicator(containerRef);
    let /* named effect */ responsiveBorderStyle = useResponsiveStyle(setStyles, 400);
  /*
   * Buttons currently can only be added/connected to `SubSlider` components.
   *
   * Custom navigation buttons are required by default to have a very specific configuration:
   *
   * A single absolute-positioned component containing all buttons and controls. They
   * should be styled to "float" in front of the   SubSlider   components and all of
   * its contents.
   *
   * See below for an example of implementing such buttons with `styled-components`.
   */

    return (
        <div ref={containerRef}>
            <NextButton id={"Slide3_Next"} to={'next'} style={{display: `${(props.show)?'auto':'none'}`}}>
                <ButtonText>{">"}</ButtonText>
            </NextButton>

            <PrevButton id={"Slide3_Prev"} to={'prev'} style={{display: `${(props.show)?'auto':'none'}`}}>
                <ButtonText>{"<"}</ButtonText>
            </PrevButton>
        </div>
    )
}


/* *****************************************************
 *  Helper Components
 */ ////////////////////////////////////////////////////

const Num = styled.div`
    /* large numbers indicating page number */
    width: 100%;
    text-align: center;
    font-size: 10em;
    font-weight: 600;
    color: white;
    position: absolute;
    top: 50%;
    transform: translatey(-50%);
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



/*
 * **************************************************
 *  HOOKS
 *
 *   ---------------BUILT-IN REACT HOOKS ----------------
 *
 * >>> useEffect()
 *
 * >>> useRef(your_componentContainerRef)
 *         => returns [ object containerRef ]
 *
 *
 *   ------------------ CUSTOM HOOKS --------------------
 *
 * >>> useStyleApplicator( [object containerRef] )
 *         => returns [ func setStyles ]
 *
 *                      func setStyles( [object style] )
 *                           => (performs side-effect: sets css [object style] on [ object containerRef ])
 *                           => returns nothing
 *
 * >>> useResponsiveBackgroundOpacity( [func setStyles], [number proportionalityConstant] )
 *         => (performs side-effect:  calls useResize() hook)
 *         => returns nothing
 *
 * >>> useResize( [func setStyles], [func styleObjectGenerator] )
 *         => (performs side-effect: window resize event listener & handler)
 *         => returns nothing
 *
 * **************************************************
 */

function useStyleApplicator(ref) {
    /* must pass in React.useRef object */
    const setStyles = (style) => {
      Object.keys(style).forEach((key) => {
        if (ref.current) ref.current.style[key] = style[key]
      })
    }
    return setStyles
}

function useResponsiveStyle (setStyles) {
    /*
     * As the window becomes narrower in size, rgba alpha-level increases in background color.
     * Larger proportionality constant => greater opacity.
     */
    const styleObjectGenerator = () => {
        return ({
            display: (window.innerWidth < 800) ? 'none' : 'block',
        })
    }

    return useResize(setStyles, styleObjectGenerator)
}

function useResize(setStyles, styleObjectGenerator) {
    const resize = () => {
        setStyles(styleObjectGenerator());
    }

    useEffect(() => {
      window.addEventListener('resize', resize, false);
      document.addEventListener('resize', resize, false);

      resize()

      return (() => {
        window.removeEventListener('resize', resize, false);
        document.removeEventListener('resize', resize, false);
      });
    })
}