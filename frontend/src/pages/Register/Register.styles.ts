import styled from 'styled-components'

import { Colors } from '../../colors'

export const Container = styled.div`
  background-color: ${Colors.primary};
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const ImageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: red; */
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
`
export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
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
  gap: 1rem;
  flex-direction: column;
`

export const NameWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 1rem;
`

export const Input = styled.input`
  width: 80%;
  height: 15px;
  margin-bottom: 20px;
  padding: 10px;
  font-size: 1rem;

  border-radius: 15px;
  border: 1px solid ${Colors.mainpurple};
  :focus {
    outline: none; /* or border: none; */
  }
`

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: row;
`

export const Button = styled.button`
  width: 90%;
  height: 4rem;
  margin: 1rem;
  background-color: ${Colors.mainpurple};
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const PasswordContainer = styled.div``

export const AddressWrapper = styled.div`
  display: flex;
`

export const ContactWrapper = styled.div`
  display: flex;
`

export const StyledSelect = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
  margin-bottom: 1rem;
  width: 90%;
`
