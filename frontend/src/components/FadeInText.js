import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const FadeInText = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasEnteredViewport) {
          setIsVisible(true);
          setHasEnteredViewport(true);
        } else if (!entry.isIntersecting && hasEnteredViewport) {
          setIsVisible(false);
          setHasEnteredViewport(false);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(textRef.current);

    return () => {
      observer.unobserve(textRef.current);
    };
  }, [hasEnteredViewport]);

  return (
    <Wrapper ref={textRef} isVisible={isVisible}>
      {children}
    </Wrapper>
  );
};

FadeInText.propTypes = {
  children: PropTypes.node.isRequired,
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Wrapper = styled.span`
  display: inline-block;
  animation-name: ${({ isVisible }) => (isVisible ? fadeIn : 'none')};
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
`;

export default FadeInText;
