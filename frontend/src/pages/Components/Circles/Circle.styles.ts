// Circles.styles.js
import styled from 'styled-components';

export const CircleWrapper = styled.div`
  position: absolute;
`;

export const CircleStyled = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: blue;
  position: absolute;
  animation-name: move-giant-circle;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-direction: alternate;

  //wait 3  seconds before starting appearing
  

  @keyframes move-giant-circle {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(calc(100vw - 200px), calc(100vh - 200px));
    }
  }
`;