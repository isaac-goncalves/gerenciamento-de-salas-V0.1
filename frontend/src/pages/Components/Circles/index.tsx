// Circle.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Colors } from '../../../colors';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

interface CircleProps {
  x: number;
  y: number;
}

const Circle = styled.div<CircleProps>`
  position: absolute;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  width: 400px;
  height: 400px;
  border-radius: 200px;
  background-color: ${Colors.circleColor};
`;

type Ball = {
  x: number;
  y: number;
  dx: number;
  dy: number;
};

const generateBall = (width: number, height: number): Ball => ({
  x: Math.random() * (width - 400),
  y: Math.random() * (height - 400),
  dx: Math.random() * 4 - 2,
  dy: Math.random() * 4 - 2,
});

const useBouncingBalls = (count: number) => {
  const [balls, setBalls] = useState<Ball[]>([]);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const newBalls = Array(count)
      .fill(0)
      .map(() => generateBall(windowSize.width, windowSize.height));
    setBalls(newBalls);
  }, [count, windowSize.width, windowSize.height]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBalls((prevBalls) =>
        prevBalls.map((ball) => ({
          ...ball,
          x: ball.x + ball.dx,
          y: ball.y + ball.dy,
          dx:
            ball.x + ball.dx < 0 || ball.x + ball.dx > windowSize.width - 400 ? -ball.dx : ball.dx,
          dy:
            ball.y + ball.dy < 0 || ball.y + ball.dy > windowSize.height - 400 ? -ball.dy : ball.dy,
        }))
      );
    }, 16);

    return () => clearInterval(interval);
  }, [windowSize.width, windowSize.height]);

  return balls;
};

interface CirclesProps {
  ballCount: number;
}

export const Circles: React.FC<CirclesProps> = ({ ballCount }) => {
  const balls = useBouncingBalls(ballCount);

  return (
    <Container>
      {balls.map((ball, index) => (
        <>
          <Circle key={index} x={ball.x} y={ball.y} />
         
        </>
      ))}
    </Container>
  );
};