import styled from 'styled-components'


export const Container = styled.div`
  background-color: ${props => props.theme.lightgrayInput};
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const SideContainer = styled.div`
  width: 95%;
  height: 95%;
  margin: 1.5%;
  border-radius: 8rem 0 0 8rem;
  position: relative;

  @media screen and (max-width: 500px) {
    
    display:none
  
  }

`
export const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(90%);
  mix-blend-mode: normal;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 8px;
`
export const FatecImage = styled.img`
  position: absolute;
  bottom: 10%;
  left: 10%;
  width: 300px;
  object-fit: cover;
`

export const SGSALogo = styled.img`
  /* position: absolute;
bottom: 14%;
left: 10%;
object-fit: cover; */
  width: 500px;

  @media screen and (max-width: 500px) {
    width: 300px;
  }

`

export const ContentWrapper = styled.div`
  width: 90%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const LoginContainer = styled.div`
  width: 95%;
  height: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  z-index: 99;
`

export const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 30px;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;


  div {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    P {
      span {
        color: ${props => props.theme.mainpurple};
        cursor: pointer;
      }
    }
  }
`

export const Button = styled.button`
  width: 100%;
  height: 5rem;
  background-color: ${props => props.theme.mainpurple};
  color: ${props => props.theme.realwhite};
  font-size: 1rem;
  border: none;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;

  //beaultifull  genious css effect for hover

  :hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  @media screen and (max-width: 500px) {
    font-size: 1.4rem;

  }

`

export const ButtonWrapper = styled.div`
display: flex;
justify-content: center;
width: 100%;
gap:1rem;
font-size: 1rem;
`

export const NãoPossuiContaText = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.textcolor};
  margin-bottom: 1rem;
`

export const TitleWrapper = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  width: 100%;

  margin-top: 2.75rem;
  max-width: 45rem;
  margin: 1rem;

  p {
    font-size: 1.25rem;
    font-weight: 400;
    color: ${props => props.theme.textcolor};
    margin-bottom: 1rem;
  }

  div {
    display: flex;
    justify-content: center;
   
  }
`

export const Separator = styled.div`
  margin: 1rem 0;
  width: 100%;
  display: flex;
  align-items: center;

  div:nth-child(1),
  div:nth-child(3) {
    background: ${props => props.theme.separator};
    width: 100%;
    height: 1px;
  }

  div:nth-child(2) {
    color: var(--grey-blue);
    font-family: 'Poppins', sans-serif;
    padding: 0 rem;
    color: ${props => props.theme.textcolor};
    margin: 0 1rem;
  }
`

export const Form = styled.form`
  display: flex;
  height: 95%;
  width: 90%;
  background-color: ${props => props.theme.lightgray};
  
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.08);

  input {
    height: 2.5rem;
    width: 100%;
    box-sizing: border-box;
    color: ${props => props.theme.textcolor};
    border: none;
  }

  h1 {
    font-size: 2.25rem;
    font-weight: 900;
    color: ${props => props.theme.mainpurple};
  }
`

export const FormInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  margin-bottom: 1rem;
`

export const MantenhaMeConectadoWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;

    p {
      font-size: 1rem;
      color: ${props => props.theme.textcolor};
    }

    input {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      width: 1.25rem;
      height: 1.25rem;
      min-width: 1.25rem;
      min-height: 1.25rem;
      border-radius: 4px;
      background-color: ${props => props.theme.lightgrayInput};
      border: none;
      margin-right: 1rem;
      cursor: pointer;

      :checked {
        background-color: ${props => props.theme.mainpurple};
      }
    }

    p {
      font-size: 1rem;
    }
  }
`

export const EsqueceuSenha = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${props => props.theme.mainpurple};
  cursor: pointer;
`

export const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 5rem;
  border-radius: 8px;
  align-items: center;
  padding-right: 1rem;
  background-color: ${props => props.theme.white};

  p {
    font-size: 0.85rem;
    color: ${props => props.theme.textcolor};

  }

  

`

export const InputColumnWrapper = styled.div `
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  `

export const InputInternalWrapper = styled.div`
 display: flex;
  justify-content: space-between;
  height: 100%;
  /* width: 100%; */
  background-color: ${props => props.theme.white};
`

export const Input = styled.input`
  display: flex;
  width: 90%;
  height: 30px;
  border: none; 
  padding: 0 1rem;
  outline: none;
  background-color: ${props => props.theme.white};
  font-weight: 700;
  font-size: 1.25rem;
  border-radius: 4px;
  ::placeholder {
    color: #bfbfbf;
  }
`

export const EyePassword = styled.img`
  display: flex;
  width: 10px;
  height: 24px;
  margin: 0 1rem;
`

export const EyeIcon = styled.div`
  display: flex;
  width: 10%;
  /* width: 10px; */
  background-color: ${props => props.theme.white};
  align-items: center;
  justify-content: center;
`

export const TeamsWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  height: 4rem;
  background: #ffffff;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.11);
  border-radius: 8px;
`

export const TeamsLogo = styled.img`
  width: 74px;
  height: 73px;
`

export const MailIcon = styled.img`
  width: 30px;
  height: 24px;
  margin: 1rem;
`

export const EmailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 8px;
`

export const PasswordIcon = styled.img`
  width: 30px;
  height: 24px;
  margin: 1rem;
`
