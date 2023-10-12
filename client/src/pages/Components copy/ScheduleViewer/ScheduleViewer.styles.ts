import styled from 'styled-components'

import { Colors } from '../../../colors'

export const Container = styled.div`
  width: 100%;
  padding: 0.5rem;
  height: 100%;
  background-color: ${props => props.theme.lightwhitebackgroud};
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
  gap: 2.6rem;
  width: 30%;
  /* height: 100%; */

  padding-top: 3rem;
  padding-bottom: 0.6rem;

  p {
    font-size: 0.8rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.textcolor};
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
  background-color: ${props => props.theme.editmodalweekdaycontainer};

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
    text-transform: uppercase;
    color: ${props => props.theme.textcolor};
    white-space: nowrap;
  }

  :hover {
    transform: scale(1.03);
    transition: 0.1s;

    background-color: ${props => props.theme.editmodalweekdaycontainer};
    p {
      /* color: ${props => props.theme.white}; */
    }
  }

  //css for when i stop hovering
`

interface IProps {
  selected: boolean

  // ItemWasSelected: boolean
}

interface IProps2 {
 
  canceled: boolean
  // ItemWasSelected: boolean
}



export const ScheduleCell = styled.div`
  background-color: ${({selected}: IProps) =>{
    return selected ? (props) => props.theme.mainpurple : (props) => props.theme.horariosCard}
  };
  box-shadow: ${({ selected }: IProps) =>{
    return selected ? "6px 4px 12px rgba(0, 0, 0, 0.2)" : "none"}
    };
  /* border: ${({ selected }: IProps) => (selected ? "2px solid #7663ad" : "none")}; */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-color: ${props => props.theme.horariosCard}; */
  border-radius: 0px 0px 8px 8px;
  width: 95%;
  height: 100%;

  padding: 0.4rem 0; // #TODO
  gap: 0.3rem;

  :hover {
    background-color: ${props => props.theme.hoverCard};
    transition: 0.1s;
    p {
      color: ${props => props.theme.white};
    }
  }
  p {
    padding: 0 0.5rem;
    text-align: center;
    text-align-last: center;
    font-size: 0.9rem;
  }



`


export const UidLabel = styled.p`
  
  display: flex;
  font-weight: 400;
 
  color: ${({canceled}: IProps2) =>{
    return canceled ? "red" : (props) => props.theme.textcolor}
  };
  text-decoration: ${({canceled}: IProps2) =>{
    return canceled ? "line-through" : "none"}
  };
`

