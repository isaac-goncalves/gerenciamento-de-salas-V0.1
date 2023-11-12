import styled from 'styled-components'

import { Colors } from '../../../colors'

const boxShadow =
  'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;'

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

  @media screen and (max-width: 875px) {
    /* overflow: auto; */
  }

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

export const ModalContent = styled.div`
  background: ${props => props.theme.lightgrayInput};
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  gap: 1rem;
  /* justify-content: center; */
  align-items: center;
  width: 30%;
  height: 45%;

  @media screen and (max-width: 875px) {
    flex-direction: column;
    padding: 0rem;
    overflow-y: auto;
    /* justify-content: flex-start; */

    width: 90%;
    height: 50%;
  }
`

export const ModalContentSize = styled.div`
  /* display: flex;

width: 100%;
height: 100%;
gap: 1rem; */
`

export const BackgroundImage = styled.img`
  height: auto;
  @media screen and (max-width: 875px) {
    width: 100%;
  }
  /* max-height: 100vh; */
  object-fit: cover;
  filter: brightness(90%);
  mix-blend-mode: normal;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 8px;
`

export const ImageWrapper = styled.div`
  /* height: 100%; */
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 875px) {
    /* height: 200px;
    height: 100%; */
    display: none;
  }
`

export const SecondImageWrapper = styled.div`
  /* width: 50%;
  height: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;
  margin-bottom: 1rem;

  @media screen and (max-width: 875px) {
    height: auto;
    width: 100%;
    display: block;
  }
`

export const FormWrapper = styled.div`
  height: 100%;

  background-color: ${props => props.theme.lightgray};
  /* border: 1px solid red; */
  box-shadow: ${boxShadow};
  border-radius: 8px;
  width: 100%;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;

  @media screen and (max-width: 875px) {
    gap: 0.5rem;
  }
`

export const StyledTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${props => props.theme.mainpurple};
  display: flex;
  width: 100%;
`

export const ProfessorWrapper = styled.div`
  background-color: ${props => props.theme.lightwhitebackgroud};
  border-radius: 8px;
  padding: 0.8rem;
  display: flex;
  box-shadow: ${boxShadow};
  height:100%;
  width:100%;
  gap: 0.4rem;
  /* border: 1px solid red; */
  flex-direction: column;
  /* margin-bottom: 1rem; */
  @media screen and (max-width: 875px) {
    margin-bottom: 1rem;
  }
`

interface StyledSelectProps {
  value: any // Add the value prop with the appropriate type
}

export const StyledSelect = styled.select<StyledSelectProps>`
  z-index: 0;
  padding: 8px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: ${props => props.theme.textcolor};

  &:disabled {
    background-color: ${props => props.theme.white};
    color: ${props => props.theme.textcolor};
    background-color: none;
  }

  //border color is mainpurple when focused

  &:focus {
    outline: none;
    border: 2px solid ${props => props.theme.mainpurple};
  }

  @media screen and (max-width: 875px) {
    font-size: 1rem;
  }
`

export const DateTimeWrapper = styled.div`
  display: flex;

  padding: 0.8rem;

  background-color: ${props => props.theme.lightwhitebackgroud};
  border-radius: 8px;
  box-shadow: ${boxShadow};

  @media screen and (max-width: 875px) {
    flex-direction: column;
  }
`

export const DateTimeDiv = styled.div`
  display: flex;
  flex-direction: column;

  input {
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`

export const DateTimeDayDiv = styled.div`
  display: flex;
  flex-direction: column;
`

export const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  padding: 1rem;
  background-color: ${props => props.theme.lightwhitebackgroud};
  border-radius: 8px;
  box-shadow: ${boxShadow};
  @media screen and (max-width: 875px) {
    padding: 1rem;
  }
`

export const DetailsText = styled.p`
  font-weight: 500;
  font-size: 1 rem;
  margin-bottom: 0.2rem;
  color: ${props => props.theme.mainpurple};

  span {
    font-weight: 400;
    color: ${props => props.theme.textcolor};
    /* font-size: 0.8rem; */
  }

  div {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
  }

  p {
    font-size: 2rem;
  }
`

export const StyledText = styled.span`
  margin-left: 0.3rem;
  color: ${props => props.theme.textcolor};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
`

export const StyledDates = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.8rem;
`

export const ClockTimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: ${boxShadow};
`

export const SideBysideContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 1rem;
  flex-direction: column;
  @media screen and (max-width: 875px) {
  }
`

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  /* margin-top: 1rem; */
  width: 100%;
  justify-content: flex-end;
`

export const StyledButton = styled.button`
  font-size: 1rem;
  background-color: ${props => props.theme.mainpurple};
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
    background-color: ${props => props.theme.hoverbuttonColor};
  }
`

export const ClocktimeAndButoonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
