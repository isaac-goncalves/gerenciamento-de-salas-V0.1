import styled from 'styled-components'

import { Colors } from '../../colors'

export const ContainerElement = styled.div`
  background-color: ${props => props.theme.primary};
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  /* background-color: red; */

  @media screen and (max-width: 875px) {
    display: none;
  }
`

export const RegisterLogo = styled.img`
  height: 60%;
  width: 100%;
  object-fit: cover;
`

export const ContentContainer = styled.div`
  height: 100%;
  width: 100%;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 99;
  /* border: 1px solid yellow; */
`
export const LoginContainer = styled.div`
box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  /* border: 1px solid yellow; */
  border-radius: 8px;
  border-radius: 1rem;
  height: 90%;
  width: 90%;
`

export const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 30px;
`

export const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 0.2rem;
  flex-direction: column;
  color: ${props => props.theme.textcolor};
`

export const InputVisibleEye = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

export const Input = styled.input`
  width: 100%;
  height: 2.5rem;
  /* /* padding: 10px; */
  padding-left: 20px; 
  font-size: 1rem;
  border-radius: 9999999px;
  border: 1px solid ${props => props.theme.mainpurple};
  position: relative; /* Add position relative */
  transition: border-color 0.3s ease; /* Add transition for border-color */
  :focus {
    outline: none;
    border-color: ${props => props.theme.mainpurple};
    border: 3px solid ${props => props.theme.mainpurple};
  }
`

export const EyeIcon = styled.span`
  /* Add your eye icon styles here */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  transition: color 0.3s ease; /* Add transition for color */
  margin-right: 8px; /* Add margin-right to create space between icon and input */
`

export const NameWrapper = styled.div`
  display: flex;
  width: 100%;
  
  /* border: 1px solid red; */
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

export const InitialName = styled.div`
display: flex;
flex-direction: column;
gap: 0.4rem;
width: 100%;
height: 100%;

`

export const SecondName = styled.div`
display: flex;
flex-direction: column;
gap: 0.4rem;
width: 100%;
height: 100%;
`

export const RadioWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100%;
  width: 100%;
  /* border: 1px solid red; */
  flex-direction: row;
`

export const Button = styled.button`
  width: 100%;
  background-color: ${props => props.theme.mainpurple};
  height: 4rem;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  /* min-height: 2rem; */
  border: none;
  border-radius: 4px;
  cursor: pointer;
`

export const Form = styled.form`
  display: flex;
  height: 100%;
  width: 100%;
  gap: 1rem;
  padding: 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border: 1px solid blue; */

  h1 {
    font-size: rem;
    padding: 2rem;
  }
  @media screen and (max-width: 875px) {
    padding: 1rem;
    h1 {
      font-size: 1.3rem;
      padding: .5rem;
    }
  }
`

export const PasswordContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 1rem;
  /* border: 1px solid red; */
`

export const LoginSugestionWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  /* align-items: center; */
  justify-content: center;
  gap: 1rem;
  /* border: 1px solid red; */
`

export const AddressWrapper = styled.div`
  display: flex;
`

export const ContactWrapper = styled.div`
  display: flex;
`

export const StyledSelect = styled.select`
  display: flex;
  width: 100%;
  padding: 0.5rem;
  padding-left: 1rem;
  border-radius: 9999999px;
  border: 1px solid ${props => props.theme.mainpurple};
  font-size: 1rem;
  cursor: pointer;
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.textcolor};
  appearance: none;
  transition: all 0.3s ease-in-out;

  &:hover {
    border-color: #999;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.mainpurple};
    border-color: ${props => props.theme.mainpurple};
  }

  &::placeholder {
    color: #999;
  }

  /* Dropdown styles */
  option {
    /* Add any additional styles for options here */
  }

  /* Dropdown container styles */
  select {
    max-height: 200px; /* Set the desired max height */
    overflow-y: auto; /* Add scrollbar when options exceed max height */
  }
`
