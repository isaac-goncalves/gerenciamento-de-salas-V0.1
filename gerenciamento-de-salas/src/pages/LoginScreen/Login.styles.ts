import styled from 'styled-components';

// export const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   background-color: #f8f8f8;
// `;


export const Side_container = styled.div`
 width: 100%;
 background-color: grey;
  height: 100%;
 margin: 0;
 border-radius:  1rem 0 0 1rem;
 h1{
    font-size: 36px;
    padding: 1rem;
    margin-bottom: 200px;

 }
 p{
    font-size: 24px;
    padding: 1rem;
 }
 `

export const Container = styled.div`
background-color: rgb(0,55,105);
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
export const LoginContainer = styled.div`
  width: 60rem;
  height: 700px;
  background-color: #fff;
  
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

export const Button = styled.button`
  width: 8rem;
  height: 4rem;
  margin: 1rem;
  background-color: #333;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const Form = styled.form`
  display: flex;
  border: 1px solid #ccc;
  height: 90%;
  width: 100%;
  margin-right: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 36px;
    padding: 1rem;
    margin-bottom: 200px;
  }

`

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
 `


