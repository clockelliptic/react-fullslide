# react-fullslide

__What is the best use case for this component?__ Sequential information, or a simple sliding dashboard interface.

View example here: https://clockelliptic.github.io/react-fullslide/

![App Example](https://github.com/clockelliptic/react-fullslide/blob/master/portfolio/vid.gif)

This is a classless React.js implementation of a full-page virtual scrolling component. Vertical and Horizontal sliders can be nested for an advanced layout. Intelligent wheel-handling and touch-handling give users a linear experience, guiding them frame-by-frame through a presentation layout.

Nested slider components have a maximum supported depth of two, such nesting a horizontal slider within a top-most vertical slider. Parent and child sliders couple intelligently and tightly, sharing mutable objects in order to coordinate motion.

The event handling, react hooks, and mutable objects are the essence of this component.

-----------------------------------------------------------------------------------

# Basic Usage


## Minimal Example

`Slide` (and `SubSlider` --- but more on that later ) components should be the __only__ *immediate*  children of `Slider` components.

`Slide` components should __always__ be the *immediate* children of either `Slider` or `SubSlider` components.

```

export default function App (props) {
    return (
        <Slider>

            <Slide> 1 </Slide>

            <Slide> 2 </Slide>

            <Slide> 3 </Slide>

        </Slider>
    );
}
```


## Minimal Nested Slider Example


`SubSlider` and `Slider` components should be the *__only__ immediate* children of `Slider` components.

A maximum (1-indexed) nesting depth of 2 is supported. That means a single ancestor, with any number of second-generation children. In other words, the parent `Slider` can have mulitple *direct* `SubSlider` children.

Why? Because this component exists on a real 2-dimensional plane. Each additional layer of nesting requires either (a) an additional dimension of motion or (b) a different imlementation.

*In the future, various built-in methods of adding addition scroll dimensionality will be supported.*

```
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
```


## Adding Slide Content


```
import {
    // these are all React.Fragments containing slide content
    SlideContent_1,
    SlideContent_2,
    array_of_slideContent
} from './mySlides'

export default function SliderApp (props) {
    return (
        <Slider>

            <Slide>
                <SlideContent_1 />
            </Slide>

            <Slide>
                <SlideContent_2 />
            </Slide>

            <SubSlider key={'slide-3'}>
                {
                    array_of_slideContent.map((SlideContent, i) => (
                        <Slide key={\`slide-3-\${i}\`}>
                            <SlideContent />
                        </Slide>
                    ))
                }
            </SubSlider>

        </Slider>
    );
}
```

```
export const SlideContent = (props) => (
    <React.Fragment>
        {\/*
          * Your slide content goes here.
          *\/}
    </React.Fragment>
);
```



-----------------------------------------------------------------------------------

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
