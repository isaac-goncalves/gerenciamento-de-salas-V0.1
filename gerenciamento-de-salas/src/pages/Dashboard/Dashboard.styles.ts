import styled from 'styled-components';

import { Colors } from '../../colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${Colors.lightgray};
  height: 100vh;
  
  `;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;

  div{
    display: flex;
    flex-direction: row;
    gap: 8rem;
    align-items: center; 
    height: 100%;
  }

`;

export const CourseSemester = styled.div`
 margin-top: 4 rem;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${Colors.textcolor};
`  ;


export const CourseName = styled.h1`
  margin-top: 4 rem;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${Colors.mainpurple};

`;

export const Semester = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  display: flex;

  p, span{
    font-size: 2rem;
    font-weight: 400;
  }

  p{
    margin-right: 0.5rem;
    color: ${Colors.mainpurple};
  }
  span{
  
  }

`;

export const ClassesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 2rem;
  background-color: ${Colors.white};
  padding: 1rem;
  border-radius: 12px;
`;

export const ClockContainer = styled.div`
  padding-top: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4.3rem;
  margin: 0 1rem;

  p {
    font-size: 1.125rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
    color: ${Colors.textcolor};
  }
`;

export const WeekContainer = styled.div`
  display: flex;
  gap: 3rem;
  height: 70%;
  padding: 1rem;
`;


export const WeekdayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;


  h2 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 2rem;
    text-transform: uppercase;
    color: ${Colors.textcolor};
  }

  :hover {
  
    transform: scale(1.03);
    transition: 0.8s;

    background-color: ${Colors.hoverCard};
    p {
    color: ${Colors.white};
    }

  }
  
  //css for when i stop hovering
  `;

export const SchedulesContainer = styled.div`
  display: flex;
  padding: 0.5rem 0 ;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  width: 15.5rem;
  background-color: ${Colors.lightgrayInput};
  border-radius: 8px;
`;

export const Schedule = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.horariosCard};
  border-radius: 0px 0px 8px 8px;
  width: 14.5rem;
  height: 6rem;
  
  :hover {
    
    background-color: ${Colors.hoverCard};
    transition: 0.5s;
    p {
    color: ${Colors.white}; 
  }
  }
  
  p {
    color: ${Colors.textcolor};
  }
`;
