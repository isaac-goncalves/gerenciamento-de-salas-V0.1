import React, { useState } from "react";
import styled from "styled-components";

interface InputProps {
    hasError: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f8f8;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 30px;
`;

const Input = styled.input<InputProps>`
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${(props) => (props.hasError ? "#ff0000" : "#ccc")};
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  background-color: #333;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const LoginScreen: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [registration, setRegistration] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (username === "" || password === "") {
            setError(true);
        } else {
            setError(false);
            // Handle login logic here
        }
    };

    return (
        <>
            {
                registration ? (
                    <form onSubmit={handleSubmit} >
                        <Input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            hasError={error}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            hasError={error}
                        />
                        <Button type="submit">Login</Button>
                        <Button type="button" onClick={() => setRegistration(false)}>Login</Button>
                    </form >
                ) : (
                    <form onSubmit={handleSubmit}>
                        <Input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            hasError={error}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            hasError={error}
                        />
                        <Button type="submit">Login</Button>
                        <Button type="button" onClick={() => setRegistration(true)}>Register</Button>
                    </form>
                )
            }
        </>
    );
};

export default LoginScreen;
