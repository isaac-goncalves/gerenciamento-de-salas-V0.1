import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button, ButtonsWrapper, Container, Form, Input, LoginContainer } from "./Login.styles"

interface InputProps {
    hasError: boolean;
}

const LoginScreen: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [registration, setRegistration] = useState(false);
    const [role, setRole] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            console.log("token exists");
            window.location.href = "/calendar";
        }
        console.log("token does not exists");
    }, []);


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (username === "" || password === "") {
            setError(true);
        } else {
            setError(false);

            if (registration) {
                const response = await fetch("http://localhost:3333/register", {
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

                if (data.message === "User created") {
                    // localStorage.setItem("token", data.token);
                    toast.success("Usuário criado com sucesso!");   
                    setRegistration(false);
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
                    window.location.href = "/calendar";
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
                                <Button type="button" onClick={() => setRegistration(false)}>Login</Button>
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
                                    <Button type="button" onClick={() => setRegistration(true)}>Register</Button>
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


