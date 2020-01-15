import React, { useEffect } from 'react';
import Lethargy from './lethargy'
import { SOURCES } from './Slider'

const checkSupportsPassive = () => {
    try {
      let opts = Object.defineProperty({}, 'passive', { get: () => {} } );
      window.addEventListener('test', null, opts);
    } catch (e) {
      console.error(e)
      return false;
    }
    return true;
}

const PASSIVE_SUPPORTED = checkSupportsPassive();  // whether the browser supports passive events, for older browsers
const ROOT_SLIDER_INDEX = 0;

/*
 * **********************************************
 *                CUSTOM HOOKS
 * **********************************************
 */

     /******************
      * PAGE TRANSITION & STYLES
      */////////////////

export function useResize(props, status, setStyles) {
    let orientation = props.orientation;

    let windowMeasure = (orientation===`y`) ? window.innerHeight : window.innerWidth;
    let dim = (orientation===`y`) ? `height` : `width`;

    const resize = () => {
      let translateStr = `translate${orientation}(-${windowMeasure * (status.current.curPage - 1)}px)`;

      setStyles({
        transform: translateStr,
        [dim]: `${windowMeasure}px`,
      });

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

export function useStyleApplicator(containerRef) {
    const setStyles = (style) => {
      Object.keys(style).forEach((key) => {
        if (containerRef.current) containerRef.current.style[key] = style[key]
      })
    }

    return setStyles
}


/******************
 * NAVIGATION EVENTS
 */////////////////

export function useButtonEvents(props, status, changePage) {
    let buttonIds = props.buttonIds;


    const onButtonClick = (e) => {
        if (status.current.isAnimating) return;
        console.log("e", e.target.attributes.to.value)
        let to;
        try {
            to = e.target.attributes.to.value
        } catch (e) {
            console.error(e)
        }

        if (to === 'next') changePage((curPage) => curPage+1, status, SOURCES.BUTTON)
        if (to === 'prev') changePage((curPage) => curPage-1, status, SOURCES.BUTTON)
        if (!isNaN(parseInt(to))) changePage(_ => parseInt(to), status, SOURCES.BUTTON)
    }

    useEffect(() => {
        buttonIds.map(button => {
                    try{
                        document.getElementById(button).addEventListener('click', onButtonClick)
                    } catch (e) {
                        console.error(button, e)
                    }

        });
        return (() => {
        try {
            buttonIds.map(button => {
                document.getElementById(button.id).removeEventListener('click', onButtonClick)
            });
        } catch (e){ console.error(e) }
        });
    })
}

export function useWheelEvent(props, status, changePage) {
    // checks for inertia/momentum scrolling
    let lethargy = new Lethargy()

    let prevTime = new Date().getTime(),
        scrollings = [];

    const avg = arr => arr.reduce((a, scrolling) => a+scrolling, 0)/arr.length;

    function onWheel (e) {
        e.stopPropagation();
        let momentumScrolling = !lethargy.check(e) // prevent inertia/momentum scrolling on most track pads
        if( momentumScrolling || !props.wheelEnabled || status.current.isAnimating) return;

        let curTime = new Date().getTime(),
            dt = curTime - prevTime,
            value = -e.wheelDelta || e.deltaY || e.detail;

        if (dt > 200) scrollings = [];
        prevTime = curTime;
        scrollings = scrollings.slice(-30).concat([ value ]);

        const pageSelector = (curPage => (avg(scrollings) > 0) ? curPage+1 : curPage-1)
        changePage(pageSelector, status, SOURCES.WHEEL);
    }

    useEffect(() => {
        window.addEventListener('wheel', onWheel, PASSIVE_SUPPORTED ? { passive: true } : false);
        return (() => {
        window.removeEventListener('wheel', onWheel, PASSIVE_SUPPORTED ? { passive: true } : false);
        });
    })

}

export function useTouchEvent(props, status, changePage, setStyles) {
    let localstatus = {
        reqAnim: null,
        touchStartPos: 0,  // Y position of touch start
        touchMoveDelta: 0,  // delta moved from start of swipe
    }

    let orientation = props.orientation,
        swipeSensitivity = props.swipeSensitivity;

    const preventSwipe = phase => {
        let isChildSlider = false,//props.layoutIndex !== ROOT_SLIDER_INDEX,
            disabled = !props.touchEnabled,
            isAnimating = status.current.isAnimating,
            isInSwipe = (phase==='start') ? status.current.isInSwipe : !status.current.isInSwipe,

            // OPTIONAL: disable this to allow parent and child sliders to move at the same time
            parentInMotion = props.parentStatus.current.isInSwipe || props.parentStatus.current.isAnimating;


        return (isChildSlider || disabled || isAnimating || isInSwipe || parentInMotion)
    };

    const resetLinearTranslate = (animate) => {
        const windowMeasure = (orientation===`y`) ? window.innerHeight : window.innerWidth
        const translate = -(windowMeasure * (status.current.curPage - 1));
        const translateStr = `translate${orientation}(${translate}px)`;

        if (animate) status.current.isAnimating = true;
        setStyles({ transform: translateStr });
    }

    const handleSwipeEnd = (delta) => {
        const windowMeasure = (orientation===`y`) ? window.innerHeight : window.innerWidth
        if (Math.abs(delta) > swipeSensitivity) {
            let duration = (1.0 - (Math.abs(delta) / windowMeasure)) * props.transDuration

            if (delta < 0) {
                if (status.current.curPage < status.current.maxPage) {
                    const pageSelector = curPage => curPage+1
                    changePage(pageSelector, status, SOURCES.TOUCH, duration);
                } else {
                    resetLinearTranslate()
                }
            } else {
                if (status.current.curPage > 1) {
                    const pageSelector = curPage => curPage-1
                    changePage(pageSelector, status, SOURCES.TOUCH, duration);
                } else {
                    resetLinearTranslate()
                }
            }
        } else {
            resetLinearTranslate()
        }
    }

    const updateTouchMove = () => {
        const windowMeasure = (orientation===`y`) ? window.innerHeight : window.innerWidth
        let translate = -((windowMeasure * (status.current.curPage - 1)) - localstatus.touchMoveDelta),
            translateStr = `translate${orientation}(${translate}px)`;
        setStyles({ transform: translateStr })
        localstatus.reqAnim = requestAnimationFrame(updateTouchMove)
    }

    const onTouchStart = (e) => {
        if (preventSwipe("start")) {
            return;
        }
        status.current.isInSwipe = true
        localstatus.reqAnim = requestAnimationFrame(updateTouchMove)
        localstatus.touchStartPos = (props.orientation===`y`) ? e.touches[0].clientY : e.touches[0].clientX
    }

    const onTouchMove = (e) => {
        if (preventSwipe("move")) {
            return;
        }

        const touchPos = (props.orientation===`y`) ? e.changedTouches[0].clientY : e.changedTouches[0].clientX;
        const newDelta = touchPos - localstatus.touchStartPos;

        localstatus.touchMoveDelta = newDelta;
    }

    const onTouchEnd = (e) => {
        cancelAnimationFrame(localstatus.reqAnim)
        localstatus.touchMoveDelta = 0

        status.current.isInSwipe = false

        let touchEnd = (props.orientation===`y`) ? e.changedTouches[0].clientY : e.changedTouches[0].clientX,
            delta = touchEnd - localstatus.touchStartPos;

        handleSwipeEnd(delta)
    }

    useEffect(() => {
        document.addEventListener('touchstart', onTouchStart, PASSIVE_SUPPORTED ? { passive: true } : false);
        document.addEventListener('touchmove', onTouchMove, PASSIVE_SUPPORTED ? { passive: true } : false);
        document.addEventListener('touchend', onTouchEnd, PASSIVE_SUPPORTED ? { passive: true } : false);
        return (() => {
            document.removeEventListener('touchstart', onTouchStart, PASSIVE_SUPPORTED ? { passive: true } : false);
            document.removeEventListener('touchmove', onTouchMove, PASSIVE_SUPPORTED ? { passive: true } : false);
            document.removeEventListener('touchend', onTouchEnd, PASSIVE_SUPPORTED ? { passive: true } : false);
        });
    })
}