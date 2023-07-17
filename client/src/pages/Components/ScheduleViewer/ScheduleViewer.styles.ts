import styled from 'styled-components'

import { Colors } from '../../../colors'

export const Container = styled.div`
  width: 100%;
  padding: 0.5rem;
  height: 100%;
  background-color: ${Colors.lightwhitebackgroud};
  display: flex;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  animation: appear 1s;
`

export const ClockContainer = styled.div`
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 0.5rem;
  width: 30%;
  height: 100%;

  padding-top: 3rem;
  padding-bottom: 0.6rem;

  p {
    font-size: 0.8rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
    color: ${Colors.textcolor};
  }
`

export const WeekdayContainer = styled.div`
  display: flex;
  width: 80%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  border-radius: 8px;
  /* background-color: cyan; //remove later */
  padding-bottom: 0.5rem;
  background-color: ${Colors.lightgrayInput};

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
    text-transform: uppercase;
    color: ${Colors.textcolor};
    white-space: nowrap;
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

interface IProps {
  selected: boolean
  ItemWasSelected: boolean
}



export const ScheduleCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-color: ${Colors.horariosCard}; */
  background-color: ${({ selected, ItemWasSelected }: IProps) =>{
    if(ItemWasSelected) return Colors.mainpurple
    return !selected ? Colors.mainpurple : Colors.horariosCard}
  }
  ;
  border-radius: 0px 0px 8px 8px;
  width: 95%;
  height: 100%;

  padding: 0.4rem 0; // #TODO
  gap: 0.3rem;

  :hover {
    background-color: ${Colors.hoverCard};
    transition: 0.1s;
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


