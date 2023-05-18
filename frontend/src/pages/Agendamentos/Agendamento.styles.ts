import styled from 'styled-components'

import DatePicker from 'react-datepicker'

import { Colors } from '../../colors'

export const ProfessorSelect = styled.select`
z-index: 99;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

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
  z-index: 3;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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

export const CourseName = styled.h1`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${Colors.mainpurple};
`

export const DatePickWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
background: red;
  width: 85%;

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
  background-color:;
  white-space: nowrap;
  p {
  }
`
export const DatepickArrowsContainer = styled.div`
  display: flex;
`

export const CalendarWrapper = styled.div`
  display: flex;
  width: 15rem;
  align-items: center;
  gap: 1rem;
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

export const ClassesContainer = styled.div`
  z-index: 3;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 2rem;
  background-color: ${Colors.white};
  /* background-color: blue  ; */ // alternate color
  padding: 2rem;
  border-radius: 12px;
  width: 95%;
  height: 100%;
  gap: 2rem;
`

export const Laboratorios = styled.div`
  z-index: 3;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 2rem;
  background-color: ${Colors.white};
  /* background-color: blue  ; */ // alternate color
  padding: 2rem;
  border-radius: 12px;
  width: 95%;
  height: 100%;
  gap: 2rem;
`

export const CourseSemester = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${Colors.textcolor};
`

export const Semester = styled.div`
  font-size: 1.1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  height: 100%;
  width: 100%;
`

export const ClockContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 3rem;
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
    white-space: nowrap;
  }

  :hover {
    transform: scale(1.03);
    transition: 0.8s;

    background-color: ${Colors.lightgrayInput};
    p {
      color: ${Colors.white};
    }
  }

  //css for when i stop hovering
`

export const SchedulesContainer = styled.div`
  display: flex;
  padding: 0.5rem 0;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  width: 95%;
  height: 100%;
  background-color: ${Colors.lightgrayInput};
  border-radius: 8px;
`

export const Schedule = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.horariosCard};

  border-radius: 0px 0px 8px 8px;
  width: 95%;
  height: 100%;
  min-height: 4rem;
  padding: 0.4rem 0; // #TODO
  gap: 0.3rem;

  :hover {
    /* background-color: ${Colors.hoverCard}; */
    transition: 0.5s;
    /* p {
      color: ${Colors.white};
    } */
  }
  p {
    padding: 0 0.5rem;
    color: ${Colors.textcolor};
    text-align: center;
    text-align-last: center;
    font-size: 0.9rem;
  }
  div {
    display: flex
  }
`

interface IProps {
  selected: boolean
}

export const Laboratorio = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ selected }: IProps) =>
    selected ? Colors.hoverCard : Colors.horariosCard};
  border-radius: 0px 0px 8px 8px;
  width: 95%;
  height: 100%;
  min-height: 4rem;
  padding: 0.4rem 0; // #TODO
  gap: 0.3rem;

  :hover {
    background-color: ${Colors.hoverCard};
    transition: 0.5s;
    p {
      color: ${Colors.white};
    }
  }
  p {
    padding: 0 0.5rem;
    color: ${Colors.textcolor};
    text-align: center;
    text-align-last: center;
    font-size: 0.9rem;
  }
`
