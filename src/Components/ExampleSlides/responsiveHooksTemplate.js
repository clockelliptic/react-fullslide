import React, { useRef, useEffect } from 'react';

/*
 * **************************************************
 *  (Advanced) Slide CONTENT
 *
 *    This should be rendered as the direct child of a
 *    'react-sliding-panes.Slide' node/component.
 * **************************************************
 */

export const ExampleSlideContent = props => {
    /* ----  UI EFFECTS, et al  ---- */
    const containerRef = useRef(null),
          setStyles = useStyleApplicator(containerRef);

    let /* named effect */ responsiveBorderStyle = useResponsiveStyle(setStyles, 400);

    return(
        <div
            style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center'
            }}
        >
            <div
                ref={containerRef}
                style={{
                    padding: '1em 2em',
                    maxWidth: '40em',
                    border: '1px solid #fff',
                    color: '#fff',
                    borderRadius: '0.4em',
                    margin: '1vh',
                }}
            >
                    <h1>  react-sliding-panes </h1>

                    <h4>
                        A React component for nestable, full-page, touchscreen-enabled virtual scrolling
                        with optional lazy-loading, lifecycle callbacks, and transition control.
                    </h4>

                    <p>
                        This classless implementation relies on mutability, scoping, and closures to
                        tightly couple parent and child sliders. This tight, automatic coupling allows
                        for data-sharing and well-defined controller behavior. To understand the time-bound
                        dimension of the source code, look at how the code handles user touch/scroll events
                        as well as the slider container's <code>onTransitionEnd</code> callback.
                    </p>

                    <p>
                        Nested sliders automatically <em>couple</em> with each other to share data and
                        coordinate slide transitions; slider props can override default sliding behavior for
                        more refined or restricted user controls.
                    </p>

                    <hr style={{color: 'rgba(0,0,0,0.7)', border: '2px solid rgba(255,255,255,0.9)'}} />

                    <h1>  This project needs help! </h1>

                    <p>
                        This is currently a one-of-a-kind in terms of being a <em><strong>free</strong> and open</em> React-based implementation.
                    </p>

                    <p>
                        Join in on GitHub issues. Non-breaking pull requests are welcome for review.
                    </p>

            </div>
        </div>
    )
}


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

function useResponsiveStyle (setStyles, proportionalityConstant = 200) {
    /*
     * As the window becomes narrower in size, rgba alpha-level increases in background color.
     * Larger proportionality constant => greater opacity.
     */
    const styleObjectGenerator = () => {
        let value = proportionalityConstant/window.innerWidth;
        return ({
            //background: `rgba(${255 - Math.floor(105*value*value*value)},${255 - Math.floor(105*value*value*value)},${255 - Math.floor(105*value*value*value)},1.0)`,
            border: `1px solid rgba(0,0,0,${0.8 - value})`
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