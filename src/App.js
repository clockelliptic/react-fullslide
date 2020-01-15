import React from 'react';
import styled from 'styled-components'
import { Slider, SubSlider, Slide } from './Components/full-page-slider'

function App() {

    const slide3_buttonIds = ['Slide3_Next', 'Slide3_Prev']

    return (
          <Slider
            orientation={`y`}
            touchEnabled={true}
            wheelEnabled={true}
          >
              <Slide style={{backgroundColor:'rgba(155,55,255,1)'}}>
                <Num>1</Num>
              </Slide>

              <Slide style={{backgroundColor:'rgba(55,155,255,1)'}}>
                <Num>2</Num>
              </Slide>

              <SubSlider buttons={Slide_3_Buttons} buttonIds={slide3_buttonIds} showButtons={true} style={{backgroundColor:'rgba(55,255,155,1)'}}>
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

export default App;


/* *****************************************************
 *  Custom navigation buttons
 */ ////////////////////////////////////////////////////

const Slide_3_Buttons = (props) => {
  /*
   * Custom navigation buttons are required by default to have a very specific form:
   *
   * A single absolute-positioned component containing all buttons and controls. They
   * should be styled to "float" in front of the   SubSlider   components and all of
   * its contents.
   *
   * See below for an example of implementing such buttons with `styled-components`.
   */
  return (
  <React.Fragment>
    <NextButton id={"Slide3_Next"} to={'next'} style={{display: `${(props.show)?'auto':'none'}`}}>
      <ButtonText>{">"}</ButtonText>
    </NextButton>

    <PrevButton id={"Slide3_Prev"} to={'prev'} style={{display: `${(props.show)?'auto':'none'}`}}>
      <ButtonText>{"<"}</ButtonText>
    </PrevButton>
  </React.Fragment>)
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

const PrevButton = styled.div`
  width: 50px;
  height: 70px;
  /* absolute positioning */
  position: absolute;
  /* z-index set so buttons are above all content */
  z-index: 101;
  /* desired positioning on page */
  left: 1vw;
  top: 50%;
  transform: translatey(-50%);
  /* hover effects etc. */
  &:hover {
    background: rgba(255,255,255,0.0);
  }
`;

const NextButton = styled.div`
    width: 50px;
    height: 70px;
    /* absolute positioning */
    position: absolute;
    /* z-index set so buttons are above all content */
    z-index: 101;
    /* desired positioning on page */
    right: 1vw;
    top: 50%;
    transform: translatey(-50%);
    /* hover effects etc. */
    &:hover {
      background: rgba(255,255,255,0.0);
    }
`;

const ButtonText = styled.div`
    /* IMPORTANT! disable touch-actions and pointer-events on all button components that to not contain the 'to' prop */
    touch-action: none;
    pointer-events: none;
    /* position the '<' and '>' text in the next/previous buttons */
    line-height: 0;
    width: 100%;
    font-size: 7em;
    color: rgba(255,255,255,0.7);
    position: absolute;
    top: 50%;
    transform: translatey(-10px) scalex(0.5);
    /* hover effects etc. */
    &:hover {
      color: rgba(255,255,255,1.0);
    }
`;