import styled from 'styled-components';

// export const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   background-color: #f8f8f8;
// `;

export const Container = styled.div`
background-color: rgb(0,55,105);
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
export const LoginContainer = styled.div`
  width: 800px;
  height: 700px;
  background-color: #fff;
  
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
`;

export const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 30px;
`;

export const Input = styled.input<InputProps>`
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${(props) => (props.hasError ? "#ff0000" : "#ccc")};
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
  width: 18rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;

`

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
 `


