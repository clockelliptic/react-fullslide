import React from 'react'
import { Slider, SubSlider, Slide } from './react-full-page-slider';



/* !!! IMPORTANT !!! IMPORTANT !!! IMPORTANT !!! IMPORTANT !!! IMPORTANT !!!
 *
 * NOTES:
 *    - All `Slide` and `SubSlider` components  MUST  be the direct children
 *      of the parent `Slider`.
 *
 *    - A maximum nesting depth of 2 is currently supported and well-defined.
 *
 */ /* IMPORTANT !!! IMPORTANT !!! IMPORTANT !!! IMPORTANT !!! IMPORTANT */



export default function NestedSliderComponent (props) {
    return (
        <Slider
            initialPage={1}
            orientation={`y`}
            onBeforeScroll={(status, layoutIndex) => {}}
            onAfterScroll={(status, layoutIndex) => {}}
        >

            <Slide key={'slide-1'} />

            <Slide key={'slide-2'} />

            <SubSlider key={'slide-3'} initialPage={1} /* takes all the same props as parent Slider */>
                {
                    childSlides.map((Feature, i) => (
                        <Slide
                            key={`slide-3-${i}`}
                            lazy={[1,2,3].includes(i+1)}
                            once={[1,2,3].includes(i+1)}
                        >
                            <Feature />
                        </Slide>
                    ))
                }
            </SubSlider>

        </Slider>
    );
}