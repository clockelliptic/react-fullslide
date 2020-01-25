import React, { useRef, useMemo, useEffect } from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useChangePage, useButtonEvents ,useWheelEvent, useTouchEvent, useResize, styleApplicator } from './effects'
import { Slide } from './Section'
import { forceCheck } from 'react-lazyload'

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
 *  Touch event handling inspired by 'react-fully-scrolled', a vertical scrolling component
 *  written by an unaffiliated author @giladaya.
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
  *                           ------- IMPORTANT ---------
  * In this design, the `status` object of the top-most parent slider is shared with all
  * children, allowing them to coordinate when PARENT and CHILD sliders are allowed to
  * change their pages. Children also share their status objects with their parent.
  *
  *          THIS INTENTIONALLY VIOLATES REACT'S TOP-DOWN DATA FLOW RULES.
  *
  * This gives us control over the behavior of both parent and child sliders during
  * event handling so we can tune certain behaviors. For instance, we can control
  * wether or not child sliders react to touch input if the parent slider is in motion.
  *///////////////////////////////////////////////////////////////////////////////////////

export function Slider(props) {
  /* *************************************
    *           STATE & STATUS
    *//////////////////////////////////////
    let containerEl = useRef(null),
        setStyles = styleApplicator(containerEl);


    // `status` is similar to a STATE store, but (a) never causes re-render and (b) is used to share data between hooks, components, etc..
    let status = useRef({
      isAnimating: false, // page change css-transition is occurring
      isInSwipe: false, // touch movement is occurring

      curPage: props.initialPage,
      maxPage: props.children.length,

      //indices of children (in props.children) that contain additional slider components
      childSliderIndices: props.children.reduce((acc, child, i) => (child.type === SubSlider) ? acc.concat([i+1]) : acc
      , []),

      // allowNext and allowPrev are used to coordinate/negotiate nested parent-child page-turn behaviors
      allowNext: true,
      allowPrev: true,

      // shares its own css style-setter
      styleSetter: setStyles,

      // tracks most recent previous window size in order to correctly resize/ fit container during the latest window resize
      previousSize: [window.innerHeight, window.innerWidth],

      // shares its own resize-effect function
      resize: () => {},

      // shares its own resetLinearTranslate function
      resetLinearTranslate: () => {},

      // children automatically share their own status with parent slider
      childStatus: [],

      // shares the ref to its own container div
      containerEl: containerEl,

      // callback passed from default page navigation indicator dots, called at the end of page change handling
      updateNavDots: () => {}
    })


   /* *************************************
    *  PAGE-CHANGE & EVENT HANDLING HOOKS
    *//////////////////////////////////////

    function enableTransition(dur=props.transDuration, ea=props.easing){ setStyles({ transition: `transform ${dur}s ${ea}` }) }
    function disableTransition(){ setStyles({ transition: 'transform 0s' }) }


    const changePage = useChangePage(props, enableTransition, setStyles)
    status.current.resetLinearTranslate = useTouchEvent(props, status, changePage, setStyles)
    status.current.resize = useResize(props, status, setStyles)
    useWheelEvent(props, status, changePage)
    useButtonEvents(props, status, changePage)


    function handleTransitionEnd(){
      disableTransition();
      status.current.isAnimating=false;
      props.parentStatus.current.isAnimating = false;  // child mutates parent again
      props.onAfterScroll(status, props.layoutIndex)
      forceCheck() // force all lazy-loading Slides to load if they are currently in view
    }

  /* **************************************************************************
    *  DATA SHARING (between nested child and parent Slider components)
    *//////////////////////////////////////////////////////////////////////////
      /****************************************************************************
       * Child mutates (Array.push) parent's status.current.childStatus array
       *
       *          by pushing its own `status` ref object to the array
       *///////////////////////////////////////////////////////////////////////////
    props.parentStatus.current.childStatus.push(status)

      /****************************************************************************
       *                  Parent clones each member of props.children,
       *
       * sharing a its `status` ref object object with each of the child sliders (SubSlider components)
       *///////////////////////////////////////////////////////////////////////////
    let parentStatus = status;
    let activated_children =  React.Children.toArray(props.children).map((child, i) => {
      return !(child.type === SubSlider || child.props.className === 'SubSlider')
        ? child
        : React.cloneElement(child, {parentStatus: parentStatus, layoutIndex: i+1, status: status})
    })

      /****************************************************************************
       *                       Simultaneously does:
       *
       *  - memoize slider container to prevent unnecessary re-renders/constructions
       *  - mutate children again to adjust styling for horizontal sliders
       *///////////////////////////////////////////////////////////////////////////

          const Main = () => useMemo(() => {
              const children = activated_children.map((child, i) => {
                      let horizontalTranslate = { position:'absolute',  top:'0px',  transform:`translatex(${i*100}vw)` };
                      // only horizontally translate non-vertical slides
                      let transformedChild = (props.orientation===`y`)
                          ? child
                          : React.cloneElement(child, {
                              style: {
                                ...child.props.style,
                                ...horizontalTranslate
                              },
                            })
                      return transformedChild;
              });

              return (
                          <div>
                              <div
                                onTransitionEnd={ handleTransitionEnd }
                                ref={ containerEl }
                                style={{ width: '100%', height: `100%`, position: 'fixed', ...props.style }}
                              >
                                  {
                                    children
                                  }
                              </div>
                            <NavigationDots
                              layoutIndex={props.layoutIndex}
                              orientation={props.orientation}
                              initialPage={props.initialPage}
                              status={status}
                              shouldDisplay={props.showNavDots}
                              color={props.navDotColor}
                              pos={props.navDotPos}
                            />
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
    showNavDots: true,
    navDotColor: '#fff',
    navDotPos: 'primary', //or 'secondary' ....  passed to <NavigationDots />  then to  <NavDotContainer />
    initialPage: 1,
    buttonIds: [],
    layoutIndex: 0, // default page index of top-level parent Slider
    parentStatus: {
      current: {
        curPage: 0, // default page index of top-level parent Slider
        childSliderIndices: [0], // default page index of top-level parent Slider
        allowPrev: false,
        allowNext: false,
        isInSwipe: false,
        isAnimating: false,
        resize: () => {},
        childStatus: [],
        containerEl: {current:{focus:()=>{}}}
      }
    },
    children: [],
    easing: 'ease-out',
    initialPage: 1,        // 1-based !
    touchEnabled: true,
    wheelEnabled: true,
    onAfterScroll: function () {},
    onBeforeScroll: function () {},
    swipeSensitivity: 100, // how much Y movement there should be to be considered a scroll
    transDuration: 1,    // seconds
    orientation: 'y'
  }

  Slider.propTypes = {
    navDotColor: PropTypes.string,
    showNavDots: PropTypes.bool,
    navDotPos: PropTypes.string,
    initialPage: PropTypes.number,
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
    orientation: PropTypes.string
  }

  /*
   * **********************************************
   *     CHILD SLIDER - A slider that can be nested within a slider
   * **********************************************
   */

export function SubSlider(props) {
  const Buttons = props.buttons;
  return (
    <Slide style={{...props.style}}>
      {Buttons ? <Buttons show={props.showButtons} /> : null}
      <Slider
        {...props}
        orientation={`x`}
      >
        {props.children}
      </Slider>
    </Slide>
  )
}

  /*
   * **********************************************
   *     Navigation Dots
   * **********************************************
   */

export const NavigationDots = ({
  layoutIndex,
  initialPage,
  orientation,
  status,
  pos,
  shouldDisplay=true,
  color='#fff'
}) => {
  if (!shouldDisplay) return null;

  let navDotRefs = Array(status.current.maxPage).fill().map(_ => React.createRef()),
      navDotStyleSetters = navDotRefs.map(refObj => styleApplicator(refObj));

  let prevPage = status.current.curPage;

  const navCallback = (curPage) => {
    navDotStyleSetters[prevPage-1]({border: `0em solid ${color}`})
    navDotStyleSetters[curPage-1]({border: `0.04em solid ${color}`})
    prevPage = curPage;
  }

  // set nav dot update callback on parent's status object
  status.current.updateNavDots = navCallback;

  return (
    <NavDotContainer
      orientation={orientation}
      pos={pos}
    >
      {
        Array(status.current.maxPage).fill().map((_, i) =>
              <NavDot
                ref={navDotRefs[i]}
                key={`dot-${layoutIndex}-${i}`}
                active={initialPage === i+1}
                color={color}
              />
        )
      }
    </NavDotContainer>
  )
}

const Dot = styled.div`
  background: ${props => props.color};
  border: ${props => props.active ? '0.04em' : '0em'} solid ${props => props.color};
  border-radius: 50%;
  width: 0.06em;
  height: 0.06em;
  margin: ${props => props.active ? '0.05em' : '0.09em'};
  transition: all 0.2s ease-out;
  &:hover {
    /*
     *   "!important" *MUST* be set otherwise the styleApplicator/setStyles
     *    function will set inline styles that override these hover styles.
     */
    border: 0.04em solid ${props => props.color} !important;
    margin: 0.05em !important;
  }
`;

const NavDot = React.forwardRef(({active, color}, ref) => (
  <Dot
    ref={ref}
    active={active}
    color={color}
  />
));

const NavDotContainer = ({children, orientation, pos}) => {
  let baseStyle = {
    position: 'absolute',
    zIndex: '99999999999',
    fontSize: '5em',
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
  }

  let verticalStyle = {
    width: '0.14em',
    right: `${(pos===`primary`) ? '1%' : 'auto'}`,
    left: `${(pos===`secondary`) ? '1%' : 'auto'}`,
    top: '50%',
    transform: 'translateY(-50%)',
    flexDirection: 'column'
  }

  let horizontalStyle = {
    height: '0.14em',
    bottom: `${(pos===`primary`) ? '1%' : 'auto'}`,
    top: `${(pos===`secondary`) ? '1%' : 'auto'}`,
    left: '50%',
    transform: 'translateX(-50%)',
    flexDirection: 'row'
  }

  let style = (orientation==='y')
                    ? {...baseStyle, ...verticalStyle}
                    : {...baseStyle, ...horizontalStyle}

  return (
    <div style={style} >
        { children }
    </div>
  )
}