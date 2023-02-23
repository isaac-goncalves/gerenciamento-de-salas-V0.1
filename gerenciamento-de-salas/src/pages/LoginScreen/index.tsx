import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Button, ButtonsWrapper, Container, Form, Input, LoginContainer } from "./Login.styles"

interface InputProps {
    hasError: boolean;
}

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   background-color: #f8f8f8;
// `;

// const Title = styled.h1`
//   font-size: 36px;
//   margin-bottom: 30px;
// `;

// const Input = styled.input<InputProps>`
//   width: 100%;
//   height: 40px;
//   margin-bottom: 20px;
//   padding: 10px;
//   font-size: 16px;
//   border: 1px solid ${(props) => (props.hasError ? "#ff0000" : "#ccc")};
//   border-radius: 4px;
// `;

// const Button = styled.button`
//   width: 100%;
//   height: 40px;
//   background-color: #333;
//   color: #fff;
//   font-size: 16px;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
// `;

const LoginScreen: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [registration, setRegistration] = useState(false);
    const [role, setRole] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // Handle login logic here
        }

    }, []);


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (username === "" || password === "") {
            setError(true);
        } else {
            setError(false);

            if (registration) {

                const response = await fetch("http://localhost:3333/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        password,
                        role: role,
                    }),
                });
                const data = await response.json();
                console.log(data);
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    // Handle login logic here
                }

            }
            else {
                const response = await fetch("http://localhost:3333/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                });
                const data = await response.json();
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    // Handle login logic here
                }
            }
        }
    };

    return (
        <Container>
            <LoginContainer>

                <div>
                    <h1>Sistema de agendamento de salas de aula</h1>
                    <p>
                        Sistema de agendamento e controle de salas de aula, desenvolvido para a disciplina de ######
                    </p>
                </div>
                {
                    registration ? (<>
                        <h1>Registrar novo Usuário</h1>
                        <Form onSubmit={handleSubmit} >
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
                            <label>Role:</label>
                            <select value={role} onChange={(event) => setRole(event.target.value)}>
                                <option value="">Select a role</option>
                                <option value="admin">Admin</option>
                                <option value="coordenador">Coordenador</option>
                                <option value="professor">Professor</option>
                            </select>
                            <ButtonsWrapper>
                                <Button type="submit">Entrar</Button>
                                <Button type="button" onClick={() => setRegistration(false)}>Register</Button>
                            </ButtonsWrapper>
                        </ Form>
                    </>
                    ) : (
                        <>
                            <h1>Entrar com usuário já existente</h1>
                            <Form onSubmit={handleSubmit}>
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
                                <ButtonsWrapper>
                                    <Button type="submit">Entrar</Button>
                                    <Button type="button" onClick={() => setRegistration(true)}>Login</Button>
                                </ButtonsWrapper>
                            </Form>
                        </>
                    )
                }
            </LoginContainer>
        </Container>
    );
};

export default LoginScreen;
