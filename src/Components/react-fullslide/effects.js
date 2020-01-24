import React, { useEffect } from 'react';
import Lethargy from './lethargy'
import { SOURCES } from './Slider'
import { forceCheck } from 'react-lazyload'

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

    let windowMeasure = (orientation===`y`) ? window.innerHeight : window.innerWidth,
        dim = (orientation===`y`) ? `height` : `width`;

    const resize = () => {
        let sideSize = (orientation===`y`) ? status.current.previousSize[0] : status.current.previousSize[1],
            sideDisplacement = windowMeasure - sideSize;

        status.current.previousSize = [window.innerHeight, window.innerWidth];

        let translateStr = `translate${orientation}(-${(windowMeasure - sideDisplacement) * (status.current.curPage - 1)}px)`;

        setStyles({
            transform: translateStr,
            [dim]: `${windowMeasure}px`,
        });
        status.current.resetLinearTranslate()
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

    return resize;
}

export function styleApplicator(containerRef) {
    const setStyles = (style) => {
      Object.keys(style).forEach((key) => {
        if (containerRef.current) containerRef.current.style[key] = style[key];
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
    // `lethargy` checks for inertia/momentum scrolling... without this there are hundreds of trailing scroll events that cause additional page changes
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
        touchStartPos: 0,  // X or Y position of touch start
        touchMoveDelta: 0,  // delta moved from start of swipe
    }

    let orientation = props.orientation,
        swipeSensitivity = props.swipeSensitivity,
        windowMeasure = _ => (orientation===`y`) ? window.innerHeight : window.innerWidth

    /* ***************************************************************************
       * Behavior control
       *  - children give touchswipe priority to parent
       *//////////////////////////////////////////////////////////////////////////

    const preventSwipe = (touchSwipePhase, e) => {
        let disabled = !props.touchEnabled,
            isAnimating = status.current.isAnimating,
            isInSwipe = (touchSwipePhase==='start') ? status.current.isInSwipe : !status.current.isInSwipe,
            parentAnimating = props.parentStatus.current.isAnimating;
        return (disabled || isAnimating || isInSwipe || parentAnimating)
    };

    /* ***************************************************************************
       * page change logic & effects
       *//////////////////////////////////////////////////////////////////////////

    const resetLinearTranslate = (animate) => {
        const translate = -(windowMeasure() * (status.current.curPage - 1));
        const translateStr = `translate${orientation}(${translate}px)`;
        if (animate) status.current.isAnimating = true;
        setStyles({ transform: translateStr });
        forceCheck() // force lazy-loading sliders to check if slide visibility has changed
    }

    const handleSwipeEnd = (delta) => {
        if (Math.abs(delta) > swipeSensitivity) {
            let duration = (1.0 - (Math.abs(delta) / windowMeasure())) * props.transDuration

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
        // reset linear translation of all children
        status.current.childStatus.forEach(status => status.current.resetLinearTranslate())
    }

    const updateTouchMove = () => {
        let translate = -((windowMeasure() * (status.current.curPage - 1)) - localstatus.touchMoveDelta),
            translateStr = `translate${orientation}(${translate}px)`;
        setStyles({ transform: translateStr })
        localstatus.reqAnim = requestAnimationFrame(updateTouchMove)
    }

    /* ***************************************************************************
       * touch event (touchstart, touchmove, touchend) handlers
       *//////////////////////////////////////////////////////////////////////////

    const onTouchStart = (e) => {
        if (preventSwipe("start")) {
            resetLinearTranslate();
            return;
        }
        status.current.isInSwipe = true
        localstatus.reqAnim = requestAnimationFrame(updateTouchMove)
        localstatus.touchStartPos = (props.orientation===`y`) ? e.touches[0].clientY : e.touches[0].clientX
    }

    const onTouchMove = (e) => {
        if (preventSwipe("move")) {
            resetLinearTranslate();
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

        if (props.parentStatus.current.isAnimating) {
            console.log(e.changedTouches)//, e.changedTouches);
            resetLinearTranslate();
            return;
        }

        handleSwipeEnd(delta)
    }

    /* ***************************************************************************
       * touch event (touchstart, touchmove, touchend) listeners & cleanup
       */////////////////////////////////////////////////////////////////////////

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

    return resetLinearTranslate;
}