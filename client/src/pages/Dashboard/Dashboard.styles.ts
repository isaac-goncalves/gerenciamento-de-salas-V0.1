import styled, { keyframes } from 'styled-components'

import DatePicker from 'react-datepicker'

import { Colors } from '../../colors'
import PacmanLoader from 'react-spinners/PacmanLoader'
import { MdChevronLeft, MdChevronRight, MdToday } from 'react-icons/md'
import { TbChevronDown } from 'react-icons/tb'
import { FaFilter } from 'react-icons/fa'

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

export const MainContainer = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.lightgray};
  /* background-color: yellow; */
  height: 100vh;
  width: calc(100% - 5rem);
  margin-left: 5rem;
  animation: appear 1s;
  overflow: hidden;
  height: 100%;

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
  /* overflow-y: auto;
  overflow: auto; */
  z-index: 2;
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
    padding: 0.4rem;
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
  display: flex;
  align-items: center;
  justify-content: center;

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
  display: flex;
  width: 100%;
  height: 100%;

  max-width: 10rem;
  padding: 8px 20px;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media screen and (max-width: 500px) {
    padding: 0.5rem;

    option {
      font-size: 0.8rem;
    }
  }

  option {
    font-size: 0.8rem;
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

export const StyledSelectValue = styled.select`
  font-size: 0.4rem;
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.textcolor};
  z-index: 99;
  display: flex;
  width: 100%;
  height: 100%;
  text-overflow: ellipsis;
  max-width: 3.5rem;
  padding: 8px 5px;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media screen and (max-width: 500px) {
    padding: 0.5rem;

    option {
      font-size: 0.8rem;
    }
  }

  option {
    font-size: 0.8rem;
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
  @media screen and (max-width: 570px) {
    gap: 0rem;
  }
  background-color: ${props => props.theme.white};
  border-radius: 12px;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  /* padding: 1rem 1rem; */

  @media screen and (max-width: 750px) {
    width: 98%;
    padding: 0.25rem 0.8rem;
  }
`

export const DatepickContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* border: 1px solid ${props => props.theme.lightgrayborder}; */
  gap: 1rem;
  align-items: center;
  white-space: nowrap;

  @media screen and (max-width: 570px) {
    gap: 0rem;
  }

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
    background-color: ${props => props.theme.hoverbuttonColor};
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
  //pointer click
  cursor: pointer;

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
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.textcolor};
  font-size: 1rem;

  width: 7rem;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const TodayContainer = styled(MdToday)`
  margin-right: 0.5rem;
  color: ${props => props.theme.mainpurple};
`

export const LeftArrow = styled(MdChevronLeft)`
  margin-right: 0.5rem;
  color: ${props => props.theme.mainpurple};
`

export const RightArrow = styled(MdChevronRight)`
  margin-right: 0.5rem;
  color: ${props => props.theme.mainpurple};
`

export const DownArrow = styled(TbChevronDown)`
  margin-right: 0.5rem;
  color: ${props => props.theme.mainpurple};
`

export const FilterIcon = styled(FaFilter)`
  margin-right: 0.5rem;
  color: white;

  color: ${props => props.theme.mainpurple};
`

export const DateIcon = styled.img`
  height: 1.5rem;
  width: 1.5rem;
  margin-right: 0.75rem;
  object-fit: cover;

  @media screen and (max-width: 570px) {
    height: 2rem;
    width: 2rem;
    margin-right: 0.2rem;
  }
`

const bounceAnimation = keyframes`
0%, 20%, 50%, 80%, 100% {
  transform: translateY(0);
}
40% {
  transform: translateY(-20px);
}
60% {
  transform: translateY(-10px);
}
`

export const StyledImageButton = styled.button`
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  /* Define the bounce animation */
  &:active {
    animation: ${bounceAnimation} 0.5s; /* Apply the bounce animation */
    transform-origin: center bottom;
  }

  &:hover {
    transform: scale(1.05);
  }

  /* Apply the bounce animation when the button is clicked */
  &:active {
    animation: bounce 0.5s;
    transform-origin: center bottom;
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
  overflow-x: auto;
  overflow-y: hidden;

  @media screen and (max-width: 570px) {
    gap: 0.5rem;
    /* min-width: 80rem; */
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
  @media screen and (max-width: 570px) {
    min-width: 20rem;
  }
  h2 {
    @media screen and (max-width: 570px) {
      font-size: 1rem;
    }

    font-weight: 500;
    text-transform: uppercase;
    color: ${props => props.theme.textcolor};
  }

  :hover {
    /* transform: scale(1.01);
    transition: 0.1s; */

    // add soft shadow

    /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); */

    background-color: ${props => props.theme.lightgrayInput};
    p {
      /* color: ${props => props.theme.white}; */
    }
  }

  //css for when i stop hovering
`

export const WeekDay = styled.p`
  font-size: 1rem;
  padding: 0.5rem 0;
  color: ${props => props.theme.mainpurple};
  transition: color 0.3s ease-in-out; /* Add the transition property */

  @media screen and (max-width: 570px) {
    font-size: 1.1rem;
  }
`

export const PacmanLoaderWrapper = styled(PacmanLoader)`
  color: red;
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
  font-size: 0.7rem;

  @media screen and (max-width: 570px) {
    h2 {
      font-size: 1.2rem;
    }
  }
`

export const Schedule = styled.div<{ isCurrentTime: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ isCurrentTime }) =>
    isCurrentTime ? 'yellow' : props => props.theme.horariosCard};
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
      font-size: 0.9rem;
      min-width: 2rem;
    }
  }
`

// export const PacmanWrapper = styled(PacmanLoader){

// }

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
    props.agendamento
      ? props => props.theme.textColorDisabled
      : props => props.theme.lighterGreen};
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
