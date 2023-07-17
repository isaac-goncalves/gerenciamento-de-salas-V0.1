import styled from 'styled-components'

import { Colors } from '../../../colors'

export const ModalOverlay = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  animation: appear 0.8s;
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

export const BackgroundImage = styled.img`
   width: 100%;
  height: auto;
  max-height: 100vh;
  object-fit: cover;
  filter: brightness(90%);
  mix-blend-mode: normal;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 8px;
`

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  display: flex;
  width: 70%;
  height: 80%;
`

export const ImageWrapper = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
`

export const FormWrapper = styled.div`
  width: 100%;
  height: 100%;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 0.8rem;
`

export const StyledTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${Colors.mainpurple};
`

export const ProfessorWrapper = styled.div`
 background-color: ${Colors.lightwhitebackgroud};
  border-radius: 8px;
  padding: 0.8rem;
`

export const StyledSelect = styled.select`
  z-index: 0;
  padding: 8px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const DateTimeWrapper = styled.div`
  display: flex;
  padding: 0.8rem;
  gap: 1rem;
  background-color: ${Colors.lightwhitebackgroud};
  border-radius: 8px;
`

export const DateTimeDiv = styled.div`
  display: flex;
  flex-direction: column;
`


export const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  padding: 0.8rem;
  background-color: ${Colors.lightwhitebackgroud};
  border-radius: 8px;
 
`
export const DetailsText = styled.p`
font-weight: 500;
font-size: 1.0 rem;
color: ${Colors.mainpurple};

span{
 
  font-weight: 400;
  color: ${Colors.textcolor};
  /* font-size: 0.8rem; */
}

  div{
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    
  }

  p{
    font-size: 2rem;
    
  }


`

export const StyledText = styled.span`
white-space: nowrap;
font-size: 1.0rem;
`

export const StyledDates = styled.span`
white-space: nowrap;
font-size: 0.8rem;
`

export const ClockTimeWrapper = styled.div`
display: flex;
flex-direction: column;
width: 100%;
height: 100%;


`

export const SideBysideContainer = styled.div`
display: flex;
width: 100%;
height: 100%;
gap: 1rem;
border-radius: 8px;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  justify-content: flex-end;
`
export const StyledButton = styled.button`
font-size: 1.0rem;
background-color: ${Colors.mainpurple};
  color: #ffffff;
  border: none;
  height: 40px;
  width: 100%;
  padding: 4px 10px;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #663399;
  
  }

`

export const ClocktimeAndButoonsWrapper = styled.div`
display: flex;
flex-direction: column;
height: 100%;
width: 100%;
gap: 0.5rem;
`