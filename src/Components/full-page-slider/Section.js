import React, { useMemo } from 'react';
import styled from 'styled-components'

export const Section = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Slide = props => {
  const ScrollSlide = useMemo(() => styled(Section)`
    display: block;
    height: 100vh;
    width: 100vw;
  `)

  return (
    <ScrollSlide className={props.className} style={props.style}>
      {props.children}
    </ScrollSlide>
  );
}