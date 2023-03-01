import styled from 'styled-components';

// export const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   background-color: #f8f8f8;
// `;


export const SideContainer = styled.div`
 width: 100%;
 background-color: grey;
 height: 100%;
 margin: 0;
 border-radius:  1rem 0 0 1rem;
 position: relative;

 h1{
    font-size: 2rem;
    padding: 1rem;
    margin-bottom:450px;
    position: relative;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    color : #fff;
    /* other CSS proper ties */
 }

 p{
    font-size: 1.25rem;
    padding: 1rem;
    position: relative;
    color:rgb(204,204,204);
 }
 `

export const BackgroundImage = styled.img`
 position: absolute;
 top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(50%);
`

export const Container = styled.div`
background-color: rgb(0,55,105);
height: 100vh;
width: 100vw;
overflow: hidden;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
export const LoginContainer = styled.div`
  width: 60rem;
  height: 700px;
  background-color: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: space-around;
  border-radius: 1rem;
`;

export const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 30px;
  `;

export const Input = styled.input`
  width: 80%;
  height: 30px;
  margin-bottom: 20px;
  padding: 10px;
  font-size: 1.25rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  `;

export const ButtonsWrapper = styled.div`
  display: flex;
    justify-content: space-between;
   `

export const Button = styled.button`
  width: 8rem;
  height: 3rem;
  background-color: #333;
  color: #fff;
  font-size: 1.25rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const Form = styled.form`
  display: flex;
  height: 95%;
  width: 80%;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;

  input {  
    height: 3rem;
    width: 100%;
    box-sizing: border-box;
  }

  h1 {
    font-size: 2rem;
    padding: 1rem;
    width: 100%;
    text-align: center;
  }
`

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
   `

