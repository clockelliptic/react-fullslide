import React, { useRef, useMemo } from 'react';
import PropTypes from 'prop-types'
import { useButtonEvents ,useWheelEvent, useTouchEvent, useResize, useStyleApplicator } from './effects'
import { Slide } from './Section'

// mobile compatibility
document.ontouchmove = function(ev) {
    ev.preventDefault();
}

export const SOURCES = {
  WHEEL: 'wheel',
  TOUCH: 'touch',
  BUTTON: 'button'
}

/*
 *  Uniquely classless implementation of a framework for "virtual scrolling" in the form
 *  of a sliding-pane layout that accepts mousewheel and touch events.
 *
 *  Touch event handling inspired by 'react-fully-scrolled',
 *  a simple vertical (virtual only) scrolling component written
 *  by an unaffiliated author @giladaya.
 *
 *  See 'react-fully-scrolled' here: https://github.com/giladaya/react-fully-scrolled
 */

 /* **************************************************************************************
  *                          THE STATUS-OBJECT DESIGN PATTERN
  ****************************************************************************************
  * The `status` object is simply a mutable JavaScript object that holds state-like
  * variables that should never cause re-render. It is implemented using the `useRef`
  * react hook.
  *
  * In this design, the `status` object of the top-most parent slider is shared with all
  * children, allowing them to coordinate when parent and child sliders are allowed to
  * change their pages.
  *///////////////////////////////////////////////////////////////////////////////////////

export default function Slider(props) {
    /* *************************************
     *           STATE & STATUS
     *//////////////////////////////////////
    let containerEl = useRef(null),
        setStyles = useStyleApplicator(containerEl);


    // PASSIVE store. NEVER causes re-render.
    let status = useRef({
      isAnimating: false,
      isInSwipe: false,
      curPage: props.initialPage,
      maxPage: props.children.length,
      //indices of children (in props.children) that contain additional slider components
      childSliderIndices: props.children.reduce((acc, child, i) => (child.type === SubSlider) ? acc.concat([i+1]) : acc
      , []),
      allowNext: true,
      allowPrev: true
    })

    /* *************************************
     *               HOOKS
     *//////////////////////////////////////
    useResize(props, status, setStyles)
    useWheelEvent(props, status, changePage)
    useTouchEvent(props, status, changePage, setStyles)
    useButtonEvents(props, status, changePage)

    /* *************************************
     *           PAGE-CHANGE LOGIC
     *//////////////////////////////////////

    function enableTransition(dur=props.transDuration, ea=props.easing){ setStyles({ transition: `transform ${dur}s ${ea}` }) }
    function disableTransition(){ setStyles({ transition: 'transform 0s' }) }

    function changePage(pageSelector, status, source, duration, easing){
      let p_S = props.parentStatus.current,
          s = status.current,
          n = pageSelector(s.curPage);

      const preventNext = _ => {
        // forces wheel navigation to browse incrementally through all slides
        // from low pages to high pages, including slides that contain child sliders
        let increasing = n>s.curPage,
            increaseNotAllowed = !s.allowNext,
            stopPageTurn = (increasing && increaseNotAllowed),
            focusOnChildSlider = s.childSliderIndices.includes(s.curPage);
        return (focusOnChildSlider && stopPageTurn && source===SOURCES.WHEEL)
      }
      const preventPrev = _ => {
        // forces wheel navigation to browse incrementally through all slides
        // from low pages to high pages, including slides that contain child sliders
        let decreasing = n<s.curPage,
            decreaseNotAllowed = !s.allowPrev,
            stopPageTurn = (decreasing && decreaseNotAllowed && source===SOURCES.WHEEL),
            focusOnChildSlider = s.childSliderIndices.includes(s.curPage);
        return (focusOnChildSlider && stopPageTurn)
      }
      const preventPageChange = _ => {
        // prevents child sliders from changing pages when not in focus or when parent is animating
        let outOfFocus = (props.layoutIndex !== p_S.curPage),
            parentAnimating = p_S.isAnimating;
        return (outOfFocus || parentAnimating);
      }

      if (props.layoutIndex && preventPageChange()) return;
       // Child slider mutates parent slider's `status` objects in order to coordinate ordered page turns
        if (n<1 || n>s.maxPage) {
          console.log("hmmmm", n)
          p_S.allowPrev = true;
          p_S.allowNext = true;
          return;
        } else {
            if (n===1) {
              p_S.allowPrev = true;
              p_S.allowNext = false;
            }
            if (n>1) {
              p_S.allowPrev = false;
            }
            if (n<s.maxPage) {
              p_S.allowNext = false;
            }
            if (n===s.maxPage) {
              p_S.allowNext = true;
              p_S.allowPrev = false;
            }

            // perform the actual page change AFTER child mutates parent
            s.curPage = n;
            if (preventPrev()) return;
            if (preventNext()) return;
            enableTransition(duration, easing);
            setStyles({
                transform: `translate${props.orientation}(-${100*(s.curPage - 1)}${(props.orientation===`y`)?`vh`:`vw`} )`,
            })
            s.isAnimating = true;
            p_S.isAnimating = true; // child mutates parent again
        }
    }

    function handleTransitionEnd(){
      disableTransition();
      status.current.isAnimating=false;
      props.parentStatus.current.isAnimating = false;  // child mutates parent again
      props.onAfterScroll(status)
      console.log("transition end");
    }

    /****************************************************************************
     * Parent clones children, sharing its own `status` object with each of the
     * child sliders (SubSlider components)
     *///////////////////////////////////////////////////////////////////////////
    let parentStatus = status;
    let activated_children =  React.Children.toArray(props.children).map((child, i) => {
      return !(child.type === SubSlider)
        ? child
        : React.cloneElement(child, {parentStatus: parentStatus, layoutIndex: i+1, status: status})
    })



    /****************************************************************************
     * Memoize slider container to prevent re-renders & adjust styling for horizontal sliders
     *///////////////////////////////////////////////////////////////////////////

    const Main = () => useMemo(() => {
      const children = activated_children.map(
        (child, i) => {
          let transformedChild = (props.orientation===`y`)
          ? child
          : React.cloneElement(child, {
              style: {
                ...child.props.style,
                position: 'absolute',
                top: '0px',
                left: `${i*100}vw`
              },
            })
            return transformedChild;
      });
      return (
        <div
          onTransitionEnd={ handleTransitionEnd }
          ref={ containerEl }
          style={{ width: '100%', height: `100%`, position: 'fixed', ...props.style }}
        >
        {children}
        </div>
      );
    });

    return <Main />
  };

  /*
   * **********************************************
   *         DEFAULT PROPS & PROPTYPES
   * **********************************************
   */

  Slider.defaultProps = {
    buttonIds: [],
    layoutIndex: 0, // default page index of top-level parent Slider
    parentStatus: {
      current: {
        curPage: 0, // default page index of top-level parent Slider
        childSliderIndices: [0], // default page index of top-level parent Slider
        allowPrev: false,
        allowNext: false,
        isInSwipe: false,
        isAnimating: false
      }
    },
    children: [],
    easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
    initialPage: 1,        // 1-based !
    touchEnabled: true,
    wheelEnabled: true,
    onAfterScroll: function () {console.log("after scroll")},
    onBeforeScroll: function () {console.log("before scroll")},
    swipeSensitivity: 100, // how much Y movement there should be to be considered a scroll
    transDuration: 1,    // seconds
    orientation: 'y',
    setButtonStatus: () => {}
  }

  Slider.propTypes = {
    buttonIds: PropTypes.array,
    layoutIndex: PropTypes.number,
    parentStatus: PropTypes.object,
    children: PropTypes.node,
    easing: PropTypes.string,
    initialPage: PropTypes.number,
    touchEnabled: PropTypes.bool,
    wheelEnabled: PropTypes.bool,
    onAfterScroll: PropTypes.func,
    onBeforeScroll: PropTypes.func,
    swipeSensitivity: PropTypes.number,
    transDuration: PropTypes.number, // seconds
    orientation: PropTypes.string,
    setButtonStatus: PropTypes.func
  }



  /*
   * **********************************************
   *     CHILD SLIDER - A slider within a slider
   * **********************************************
   */

export function SubSlider(props) {
  const Buttons = props.buttons;
  return (
    <Slide style={{...props.style}}>
      <Buttons show={props.showButtons} />
      <Slider
        parentStatus={props.parentStatus}
        layoutIndex={props.layoutIndex}
        orientation={`x`}
        touchEnabled={true}
        wheelEnabled={true}
        buttonIds={props.buttonIds}
      >
        {props.children}
      </Slider>
    </Slide>
  )
}