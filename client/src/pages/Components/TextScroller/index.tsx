import React from 'react';
import styled, { keyframes } from 'styled-components';

const scroll = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const ScrollingTextContainer = styled.div`
  width: 100%;
  overflow: hidden;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ScrollingText = styled.div`
  white-space: nowrap; /* Allow the text to wrap */
  animation: ${scroll} 25s linear infinite;
`;

interface TextScrollerProps {
  text: string;
}

const TextScroller: React.FC<TextScrollerProps> = ({ text }) => {
  return (
    <ScrollingTextContainer>
      <ScrollingText>
        {text}
      </ScrollingText>
    </ScrollingTextContainer>
  );
};

export default TextScroller;