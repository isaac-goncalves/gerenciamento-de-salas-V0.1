// Circle.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
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
  border-radius: 50%;
  background-color: red;
`;

type Ball = {
  x: number;
  y: number;
  dx: number;
  dy: number;
};

const generateBall = (width: number, height: number): Ball => ({
  x: Math.random() * (width - 50),
  y: Math.random() * (height - 50),
  dx: Math.random() * 4 - 2,
  dy: Math.random() * 4 - 2,
});

const areBallsColliding = (ball1: Ball, ball2: Ball): boolean => {
  const dx = ball1.x - ball2.x;
  const dy = ball1.y - ball2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < 400;
};
const handleBallCollision = (ball1: Ball, ball2: Ball) => {
  const dx = ball1.x - ball2.x;
  const dy = ball1.y - ball2.y;
  const collisionAngle = Math.atan2(dy, dx);

  const speed1 = Math.sqrt(ball1.dx * ball1.dx + ball1.dy * ball1.dy);
  const speed2 = Math.sqrt(ball2.dx * ball2.dx + ball2.dy * ball2.dy);

  const direction1 = Math.atan2(ball1.dy, ball1.dx);
  const direction2 = Math.atan2(ball2.dy, ball2.dx);

  const newSpeed1x = speed1 * Math.cos(direction1 - collisionAngle);
  const newSpeed1y = speed1 * Math.sin(direction1 - collisionAngle);
  const newSpeed2x = speed2 * Math.cos(direction2 - collisionAngle);
  const newSpeed2y = speed2 * Math.sin(direction2 - collisionAngle);

  const finalSpeed1x = ((ball1.dx * (50 - 50) + 2 * 50 * ball2.dx) / (50 + 50)) * Math.cos(collisionAngle) + newSpeed1x * Math.cos(collisionAngle + Math.PI / 2);
  const finalSpeed1y = ((ball1.dy * (50 - 50) + 2 * 50 * ball2.dy) / (50 + 50)) * Math.sin(collisionAngle) + newSpeed1y * Math.sin(collisionAngle + Math.PI / 2);
  const finalSpeed2x = ((ball2.dx * (50 - 50) + 2 * 50 * ball1.dx) / (50 + 50)) * Math.cos(collisionAngle) + newSpeed2x * Math.cos(collisionAngle + Math.PI / 2);
  const finalSpeed2y = ((ball2.dy * (50 - 50) + 2 * 50 * ball1.dy) / (50 + 50)) * Math.sin(collisionAngle) + newSpeed2y * Math.sin(collisionAngle + Math.PI / 2);

  ball1.dx = finalSpeed1x;
  ball1.dy = finalSpeed1y;
  ball2.dx = finalSpeed2x;
  ball2.dy = finalSpeed2y;
};

export const BouncingBalls: React.FC = () => {
  const [balls, setBalls] = useState<Ball[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const newBalls = [
      generateBall(windowWidth, windowHeight),
      generateBall(windowWidth, windowHeight),
    ];
    setBalls(newBalls);
  }, [windowWidth, windowHeight]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBalls((prevBalls) =>
        prevBalls.map((ball) => {
          let newX = ball.x + ball.dx;
          let newY = ball.y + ball.dy;

          if (newX < 0 || newX > windowWidth - 50) {
            ball.dx = -ball.dx;
          }

          if (newY < 0 || newY > windowHeight - 50) {
            ball.dy = -ball.dy;
          }

          ball.x += ball.dx;
          ball.y += ball.dy;

          for (let i = 0; i < prevBalls.length; i++) {
            for (let j = i + 1; j < prevBalls.length; j++) {
              if (areBallsColliding(prevBalls[i], prevBalls[j])) {
                handleBallCollision(prevBalls[i], prevBalls[j]);
              }
            }
          }

          return ball;
        }),
      );
    }, 1000 / 60);

    return () => clearInterval(intervalId);
  }, [balls, windowHeight, windowWidth]);

  return (
    <Container>
      {balls.map((ball, index) => (
        <Circle key={index} x={ball.x} y={ball.y} />
      ))}
    </Container>
  );
};