import styled from 'styled-components'

import DatePicker from 'react-datepicker'

import { Colors } from '../../colors'

export const Container = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${Colors.lightgray};
  /* background-color: yellow; */
  height: 100%;
  width: calc(100% - 5rem);
  margin-left: 5rem;
  animation: appear 1s;
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 3;
`

export const CoursesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  height: 100%;
  padding: 1rem 1rem;
`

export const ClassesContainer = styled.div`
  z-index: 3;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 2rem;
  background-color: ${Colors.white};
  /* background-color: blue  ;// alternate color */
  padding: 1rem;
  border-radius: 12px;
  width: 95%;
  height: 100%;
  gap: 0.5rem;
`

export const PageName = styled.h1`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${Colors.mainpurple};

  //hide when screen is small

  @media screen and (max-width: 1000px) {
    font-size: 1.2rem;
  }

`

export const CourseName = styled.h1`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${Colors.mainpurple};

  //hide when screen is small

  @media screen and (max-width: 1000px) {

    display: none;
  }

`
export const CourseSemester = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${Colors.textcolor};

  //hide when screen is small

  @media screen and (max-width: 1000px) {
    font-size: 1.2rem;
  }

`

export const FilterWrapper = styled.h2`
  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  width: 100%;

  select,
  option,
  span {
    font-size: 1.0rem;
    font-weight: 400;
  }

  /* select {
    margin-right: 0.5rem;
    color: ${Colors.mainpurple};
    border: 1px solid ${Colors.lightgrayborder};
    border-radius: 4px;
  }
  select:focus {
    border-color: #2980b9;
  } */
`


export const StyledSelect = styled.select`
  font-size: 1.0rem;
  background-color: ${Colors.white};
  color: ${Colors.textcolor};
  z-index: 99;
  padding: 8px 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  
  outline: none;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: ${Colors.mainpurple};
  }

  &:focus {
    border-color: ${Colors.mainpurple};
   
  }
`

export const DatePickWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  gap: 1rem;
  background-color: ${Colors.white};
  border-radius: 12px;

  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
`

export const DatepickContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  white-space: nowrap;
  p {
  }
`

export const DatepickArrowsContainer = styled.div`
  display: flex;
`

export const PularParaHojeText = styled.p`
  // hide when screen is small

  @media screen and (max-width: 715px) {
    
    display: none;
  
  }
`

export const CurrentMonth = styled.p`
  //hide when screen is small

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;


  @media screen and (max-width: 925px) {
    display: none;
  }
`


export const CalendarWrapper = styled.div`
  display: flex;
  width: 15rem;
  align-items: center;
  gap: 1rem;

  //hide when screen is small
  @media screen and (max-width: 1470px) {
    display: none;
  }

`
export const StyledDatePicker = styled(DatePicker)`
  z-index: 99;
  width: 6rem;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
 
`

export const DateIcon = styled.img`
  height: 1.5rem;
  width: 1.5rem;
  margin-right: 0.75rem;
  object-fit: cover;
`

export const ClockPaddingUp = styled.div`
  display: flex;
  height: 100%;
`
export const ClockPaddingDown = styled.div`
  height: 100%;
  height: 100%;
`

export const ClockContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 5.5rem;
  margin-bottom: 1rem;
  /* background-color: red; */
  width: 3rem;

  p {
    font-size: 1.125rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
    color: ${Colors.textcolor};
  }
`

export const WeekContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  /* background-color:red; */
  height: 100%;
  width: 100%;
`

export const WeekdayContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  /* background-color: cyan; //remove later */
  padding-bottom: 0.5rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
    text-transform: uppercase;
    color: ${Colors.textcolor};
  }

  :hover {
    transform: scale(1.03);
    transition: 0.1s;

    background-color: ${Colors.lightgrayInput};
    p {
      /* color: ${Colors.white}; */
    }
  }

  //css for when i stop hovering
`

// const StyledWeekdayContainer = styled.div<{ isCurrentDay: boolean }>`
//   background-color: ${({ isCurrentDay }) => (isCurrentDay ? 'lightblue' : 'white')};
//   // Add other styles as required
// `;

// const StyledSchedule = styled.div<{ isCurrentTime: boolean }>`
//   background-color: ${({ isCurrentTime }) => (isCurrentTime ? 'yellow' : 'white')};
//   // Add other styles as required
// `;

export const WeekDay = styled.p`
font-size: 1rem;
padding: 0.5rem 0;
color: ${Colors.mainpurple};
transition: color 0.3s ease-in-out; /* Add the transition property */
`

export const SchedulesContainer = styled.div<{ isCurrentDay: boolean }>`
  display: flex;
  padding: 0.5rem 0;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  width: 95%;
  background-color: ${Colors.lightgrayInput};
  border-radius: 8px;
  height: 100%;
`

export const Schedule = styled.div<{ isCurrentTime: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ isCurrentTime }) =>
    isCurrentTime ? 'yellow' : Colors.horariosCard};
  border-radius: 0px 0px 8px 8px;
  width: 95%;
  height: 100%;
  min-height: 4rem;
  padding: 0.4rem 0;
  gap: 0.1rem;

  &.hoverEffect:hover {
    background-color: ${Colors.hoverCard};
    transition: 0.5s;

    p {
      /* color: ${Colors.white}; */
    }
  }


  
  p {
    text-align: center;
    text-align-last: center;
    font-size: 0.8rem;
  }
`

export const Disciplina = styled.p`
font-weight: 500;
color: ${Colors.textcolor};
`

export const SemestreSalaWrapper = styled.p`
  display: flex;
  gap: 0.4rem;
`

export const Professor = styled.p`
font-style: italic;
color: ${Colors.textcolor};
`
export const Semestre = styled.p`
  font-style: italic;
  color: ${Colors.mainpurple};
`
interface StyledComponentProps {
  agendamento: boolean;
}

export const SalaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const Sala = styled.p<StyledComponentProps>`
  color: ${props => props.agendamento ? Colors.textColorDisabled : Colors.lighterGreen};
  font-weight: 600;
  font-weight: ${props => props.agendamento ? "500" : "600"};
  text-decoration: ${props => props.agendamento ? "line-through" : "none"};
  padding:0;
`;

export const SalaAgendada = styled.p`
  color: ${Colors.lighterGreen};
  font-weight: 600;
  padding:0;
`;