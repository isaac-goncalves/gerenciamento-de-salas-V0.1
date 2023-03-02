import styled from 'styled-components';

import { Colors } from '../../colors';

// export const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   background-color: #f8f8f8;
// `;

export const SideContainer = styled.div`
  width: 95%;
  height: 95%;
  margin: 1.5%;
  border-radius:  8rem 0 0 8rem;
  position: relative;
`
export const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(90%);
  filter: ;
  border-radius: 8px;
`
export const FatecImage = styled.img`
  position: absolute;
  bottom: 14%;
  left: 10%;
  width: 200px;
  object-fit: cover;
  `

export const Container = styled.div`
background-color: #F4F4F4;
height: 100vh;
width: 100vw;
overflow: hidden;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
`

export const LoginContainer = styled.div`
  width: 95%;
  height: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`

export const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 30px;
  `

export const Input = styled.input`
  width: 80%;
  height: 30px;
  margin-bottom: 20px;
  padding: 10px;
  font-size: 1.25rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  `

export const ButtonsWrapper = styled.div`
  display: flex;
    justify-content: space-between;
   `

export const Button = styled.button`
  width: 8rem;
  height: 3rem;
  background-color: ${Colors.mainpurple};
  color: #fff;
  font-size: 1.25rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.75rem;
  max-width: 42.5rem;
  margin: 1rem;
   `

export const Form = styled.form`
  display: flex;
  height: 95%;
  width: 90%;
  background-color: #fff;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.08);

  p {
      font-weight: 500;
  }

  input {  
    height: 3rem;
    width: 100%;
    box-sizing: border-box;
    color: ${Colors.textcolor};
    background-color: ${Colors.lightgray};
    border: none;

  }

  h1 {
    font-size: 2.25rem;
    font-weight: 900;
    color:${Colors.mainpurple};
  }
`

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
   `



