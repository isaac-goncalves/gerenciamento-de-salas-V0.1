import styled from 'styled-components'

import DatePicker from 'react-datepicker'

import { Colors } from '../../colors'

interface CalltoActionButtonProps {
  backgroundColor: boolean
}

export const CalltoActionButton = styled.button<CalltoActionButtonProps>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.white};
  background-color: ${props =>
    props.backgroundColor ? 'gray' : props.theme.mainpurple};
  border: none;
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;

  transform: scale(1);
  transition: 0.3s;
`

export const Container = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.lightgray};
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

  @media screen and (max-width: 570px) {
    width: calc(100% - 3rem);
    margin-left: 3rem;
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
  padding: 0.2rem 1rem;

  @media screen and (max-width: 570px) {
    padding: 0.4rem 1rem;
  }
`

export const ClassesContainer = styled.div`
  min-width: 98%;
  overflow-y: auto;
  z-index: 3;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 2rem;
  background-color: ${props => props.theme.white};
  /* background-color: blue  ;// alternate color */
  padding: 1rem;
  border-radius: 12px;
  width: 95%;
  height: 100%;
  gap: 0.5rem;

  @media screen and (max-width: 570px) {
    margin-bottom: 1rem;
  }
`

export const PageName = styled.h1`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${props => props.theme.mainpurple};

  //hide when screen is small

  @media screen and (max-width: 1000px) {
    font-size: 1.2rem;
  }
`

export const CourseName = styled.h1`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${props => props.theme.mainpurple};

  //hide when screen is small

  @media screen and (max-width: 1000px) {
    display: none;
  }
`
export const CourseSemester = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${props => props.theme.textcolor};

  //hide when screen is small

  @media screen and (max-width: 1000px) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 570px) {
    display: none;
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
    font-size: 1rem;
    font-weight: 400;

    @media screen and (max-width: 570px) {
      font-size: 0.8rem;
    }
  }
`
export const FilterIconWrapper = styled.div`
  @media screen and (max-width: 570px) {
    display: none;
  }
`

/* select {
    margin-right: 0.5rem;
    color: ${props => props.theme.mainpurple};
    border: 1px solid ${props => props.theme.lightgrayborder};
    border-radius: 4px;
  }
  select:focus {
    border-color: #2980b9;
  } */

export const StyledSelect = styled.select`
  font-size: 0.4rem;
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.textcolor};
  z-index: 99;
  padding: 8px 20px;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media screen and (max-width: 500px) {
    padding: 0.5rem;
  }

  option {
    font-size: 1rem;
  }

  outline: none;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.mainpurple};
  }

  &:focus {
    border-color: ${props => props.theme.mainpurple};
  }
`

export const DatePickWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  gap: 1rem;
  background-color: ${props => props.theme.white};
  border-radius: 12px;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;

  @media screen and (max-width: 750px) {
    width: 100%;
    padding: 0.25rem 0rem;
  }
`

export const DatepickContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  white-space: nowrap;
  p {
  }
`

export const ButtonConfimarAgendamento = styled.button`
  font-size: 1rem;
  white-space: nowrap;
  background-color: ${props => props.theme.mainpurple};
  color: #ffffff;
  border: none;
  padding: 8px 20px;
  border-radius: 4px;

  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #663399;
  }

  @media screen and (max-width: 570px) {
    display: none;
  }
`

export const DatepickArrowsContainer = styled.div`
  display: flex;
`

export const PularParaHojeText = styled.p`
  // hide when screen is small

  color: ${props => props.theme.textcolor};

  @media screen and (max-width: 715px) {
    display: none;
  }
`

export const CurrentMonth = styled.p`
  //hide when screen is small
  color: ${props => props.theme.textcolor};
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

  color: ${props => props.theme.textcolor};

  //hide when screen is small
  @media screen and (max-width: 1640px) {
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

  @media screen and (max-width: 570px) {
    height: 1rem;
    width: 1rem;
  }
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

  @media screen and (max-width: 570px) {
    display: none;
  }

  p {
    font-size: 1.125rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.textcolor};
  }
`

export const WeekContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  /* background-color:red; */
  height: 100%;
  width: 100%;

  @media screen and (max-width: 570px) {
    gap: 0.5rem;
  }
`

export const WeekdayContainer = styled.div`
  min-width: 10rem;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  user-select: none;
  /* background-color: cyan; //remove later */
  padding-bottom: 0.1rem;

  h2 {
    @media screen and (max-width: 570px) {
      font-size: 1rem;
    }
    font-size: 1.5rem;
    font-weight: 500;
    text-transform: uppercase;
    color: ${props => props.theme.textcolor};
  }

  :hover {
    transform: scale(1.03);
    transition: 0.1s;

    background-color: ${props => props.theme.lightgrayInput};
    p {
      /* color: ${props => props.theme.white}; */
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
  color: ${props => props.theme.mainpurple};
  transition: color 0.3s ease-in-out; /* Add the transition property */

  @media screen and (max-width: 570px) {
    font-size: 0.6rem;
  }
`

export const SchedulesContainer = styled.div<{ isCurrentDay: boolean }>`
  display: flex;
  padding: 0.5rem 0;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  width: 95%;
  background-color: ${props => props.theme.lightgrayInput};
  border-radius: 8px;
  height: 100%;

  @media screen and (max-width: 570px) {
    /* min-width: ; */
  }
`

export const Schedule = styled.div<{ isCurrentTime: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ isCurrentTime }) =>
    isCurrentTime ? 'yellow' : (props) => props.theme.horariosCard};
  border-radius: 0px 0px 8px 8px;
  width: 95%;
  height: 100%;
  min-height: 4rem;
  padding: 0.4rem 0;
  gap: 0.1rem;
  user-select: none;

  @media screen and (max-width: 570px) {
  }

  &.hoverEffect:hover {
    background-color: ${props => props.theme.hoverCard};
    transition: 0.5s;

    p {
      /* color: ${props => props.theme.white}; */
      user-select: none;
    }
  }

  p {
    text-align: center;
    text-align-last: center;
    font-size: 0.8rem;

    @media screen and (max-width: 570px) {
      font-size: 0.6rem;
    }
  }
`

export const Disciplina = styled.p`
  font-weight: 500;
  color: ${props => props.theme.textcolor};
`

export const SemestreSalaWrapper = styled.p`
  display: flex;
  gap: 0.4rem;
`

export const Professor = styled.p`
  font-style: italic;
  color: ${props => props.theme.textcolor};
`
export const Semestre = styled.p`
  font-style: italic;
  color: ${props => props.theme.mainpurple};
`
interface StyledComponentProps {
  agendamento: boolean
}

export const SalaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`

export const Sala = styled.p<StyledComponentProps>`
  color: ${props =>
    props.agendamento ? (props) => props.theme.textColorDisabled : (props) => props.theme.lighterGreen};
  font-weight: 600;
  font-weight: ${props => (props.agendamento ? '500' : '600')};
  text-decoration: ${props => (props.agendamento ? 'line-through' : 'none')};
  padding: 0;
`

export const SalaAgendada = styled.p`
  color: ${props => props.theme.lighterGreen};
  font-weight: 600;
  padding: 0;
`
