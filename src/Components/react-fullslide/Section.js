import React, { useMemo } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Fade } from './FadeContainer';
import LazyLoad from 'react-lazyload';
import { ExpandingLoadingSpinner as LoadingSpinner } from './LoadingSpinners'

export const Section = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ScrollSlide = styled(Section)`
    display: block;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`;

export const Slide = props => {
  const children = props.children,
        className = props.className,
        style = props.style;

  const Eager = () => (
    <ScrollSlide className={props.className} style={props.style}>
      {props.children}
    </ScrollSlide>
  );

  const Lazy = () => (
      <ScrollSlide className={className} style={{...style}}>
        <LazyLoad
          unmountIfInvisible={true}
          resize={true}
          overflow={true}
          placeholder={<Section><LoadingSpinner /></Section>}
          offset={-1}
          once={props.once}
        >
          <Fade>
              {
                children
              }
          </Fade>
        </LazyLoad>
      </ScrollSlide>
  )

  const Slide = useMemo(() => (props.lazy) ? Lazy : Eager)

  return (
      <Slide />
  );
}

Slide.defaultProps = {
  lazy: false,
  once: false,
}

Slide.propTypes = {
  lazy: PropTypes.bool,
  once: PropTypes.bool,
}