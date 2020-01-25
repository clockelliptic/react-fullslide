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

/***************************************************************
 * Update Slider container when user resizes the window
 *////////////////////////////////////////////////////////////

export function useResize(props, status, setStyles) {
    function disableTransition(){ setStyles({ transition: 'transform 0s' }) }
    let orientation = props.orientation;

    let windowMeasure = (orientation===`y`) ? window.innerHeight : window.innerWidth,
        dim = (orientation===`y`) ? `height` : `width`;

    const resize = () => {
        let sideSize = (orientation===`y`) ? status.current.previousSize[0] : status.current.previousSize[1],
            sideDisplacement = windowMeasure - sideSize;

        status.current.previousSize = [window.innerHeight, window.innerWidth];

        let translateStr = `translate${orientation}(-${(windowMeasure - sideDisplacement) * (status.current.curPage - 1)}px)`;

        disableTransition() // disable transition so resize effects are instantaneous
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

/***************************************************************
 *           "used to create all live CSS effects" (scrolling etc.)
 *
 * function-generator, similar to a react hook.
 *
 * hooks into a style-setter that sets styles directly on a ref's
 * current object.
 *
 * ref object should be a react component
 *
 * setStyles is used to create all live CSS effects
 *////////////////////////////////////////////////////////////

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
    /*
     *  `lethargy` checks for inertia/momentum scrolling
     *
     *  Without this there are hundreds of trailing scroll events
     *  that cause additional page changes.
     *
     *  Huge thank-you to the creators of lethargy.
     *
     *  An alternative method to preventing momentum scrolling
     *  is to detect negative acceleration in scroll movements
     *  and to block page changes when acceleration is negative.
     */
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
        reqAnim: null,  // stores requested animation frame
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
            isInSwipe = (touchSwipePhase==='start') ? status.current.isInSwipe : !status.current.isInSwipe, // this line works but is confusing, requires understanding of touch handlers below
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



export const useChangePage = (props, enableTransition, setStyles) => function changePage(pageSelector, status, source, duration, easing){

    let p_S = props.parentStatus.current,
        s = status.current,
        nextPage = pageSelector(s.curPage);

    const turning = {
        to_firstPage: () => (nextPage===1),
        to_lastPage: () => (nextPage===s.maxPage),
        to_a_middlePage: () => (nextPage>1 && nextPage<s.maxPage),
        beyond_pageRange: () => (nextPage<1 || nextPage>s.maxPage),
        decreasing: () => (nextPage < s.curPage),
        increasing: () => (nextPage > s.curPage)
    }

    const is = {
      a_parentSlider: () => props.layoutIndex === 0,
      a_childSlider: () => props.layoutIndex > 0
    }

  /*  PARENT SLIDER's RULES
   */
    const prevent_NextPage = _ => {
        // forces wheel navigation to browse incrementally through all slides from low pages to high pages, including slides that contain child sliders
        let increaseNotAllowed = !s.allowNext,
            stopPageTurn = (turning.increasing() && increaseNotAllowed);

        let childSliderInView = s.childSliderIndices.includes(s.curPage),
            childSliderAnimating = s.childStatus.map(childStatus => childStatus.current.isAnimating).includes(true),
            childSliderActive = childSliderInView || childSliderAnimating;

        return (childSliderActive && stopPageTurn && source===SOURCES.WHEEL)
    }
    const prevent_PrevPage = _ => {
        // forces wheel navigation to browse incrementally through all slides from low pages to high pages, including slides that contain child sliders
        let decreaseNotAllowed = !s.allowPrev,
            stopPageTurn = (turning.decreasing() && decreaseNotAllowed);

        let childSliderInView = s.childSliderIndices.includes(s.curPage),
            childSliderAnimating = s.childStatus.map(childStatus => childStatus.current.isAnimating).includes(true),
            childSliderActive = childSliderInView || childSliderAnimating;

        return (childSliderActive && stopPageTurn && source===SOURCES.WHEEL)
    }

    const prevent_parent_PageChange = () => (is.a_parentSlider() && (prevent_NextPage() || prevent_PrevPage()) )

    /*  CHILD-SPECIFIC SLIDER's RULES
   */
    const prevent_child_PageChange = _ => {
        // prevents child sliders from changing pages when out of view or when parent is animating
        let inView = (props.layoutIndex === p_S.curPage),
            parentAnimating = p_S.isAnimating;
        return (is.a_childSlider() && ( !inView || parentAnimating ));
    }

  /***************************************************************
     * Page-change behavior is negotiated between parent and child
     *
     * Child slider mutates parent slider's `status` objects in order
     * to coordinate ordered, well-defined page turns
     *////////////////////////////////////////////////////////////

    // child gives priority to parent if parent is already animating by returning early
    if (prevent_child_PageChange()) return;

    // if the child is allowed to continue they inform the parent of their behavior
    if (turning.beyond_pageRange()) {
      p_S.allowPrev = true;
      p_S.allowNext = true;
    }
    if (turning.to_firstPage()) {
      p_S.allowPrev = true;
      p_S.allowNext = false;
    }
    if (turning.to_a_middlePage()) {
      p_S.allowPrev = false;
    }
    if (turning.to_lastPage()) {
      p_S.allowNext = true;
      p_S.allowPrev = false;
    }
    // parent makes decisions in response to child's behavior
    if (prevent_parent_PageChange()) return;


  /***************************************************************
     * Typical page-change behavior is resumed following parent-child negotiations
     *////////////////////////////////////////////////////////////
    if (turning.beyond_pageRange()) return;

    props.onBeforeScroll(status, props.layoutIndex)

    s.curPage = nextPage;

    // all sliders are informed that an animation is occurring (sibling sliders are informed via the parent's status)
    s.isAnimating = true;
    p_S.isAnimating = true;

    enableTransition(duration, easing);
    setStyles({
        transform: `translate${props.orientation}(-${100*(s.curPage - 1)}${(props.orientation===`y`)?`vh`:`vw`} )`,
    })
    s.updateNavDots(s.curPage)
}