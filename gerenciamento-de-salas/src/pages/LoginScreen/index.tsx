import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { SideContainer, Button, ButtonsWrapper, Container, Form, Input, LoginContainer, BackgroundImage, InputWrapper, FatecImage, ContentWrapper, TitleWrapper, TeamsLogo, TeamsWrapper, InputsWrapper, MailIcon, PasswordIcon, Separator, FormInputsWrapper, MantenhaMeConectadoWrapper, EsqueceuSenha, EyePassword } from "./Login.styles"

import background from '../../../public/images/background.jpg';
import fatec from '../../../public/images/fatec.svg';
import teamsLogo from '../../../public/images/teamsIcon.svg';
import mailIcon from '../../../public/images/emaiIcon.svg';
import passwordIcon from '../../../public/images/passwordIcon.svg';
import eyePassword from '../../../public/images/eyePassword.svg';

interface InputProps {
    hasError: boolean;
}

const LoginScreen: React.FC = () => {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [form, setForm] = useState("login");
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
        console.log("submit");
        if (email === "" || password === "") {
            toast.error("Preencha todos os campos");
        } else {

            if (form == "register") {

                try {

                    const response = await fetch("http://localhost:3333/verify", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email,
                            password,
                            role: role,
                        }),
                    });
                    const data = await response.json();
                    console.log(data);

                    if (data.message === "User does not exists") {
                        // localStorage.setItem("token", data.token);
                        toast.success("Usuário criado com sucesso!");
                        setForm("registration");
                    } else
                        if (data.error == "User already exists") {
                            toast.error("Usuário já existe");
                        }
                        else {
                            toast.error("Erro ao criar usuário!");
                        }
                }
                catch (error) {
                    toast.error("Erro ao fazer registrar nova conta");
                }
            }
            else if (form == "login") {
                console.log("login")
                try {
                    const response = await fetch("http://localhost:3333/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email,
                            password,
                        }),
                    });
                    const data = await response.json();

                    if (data) {
                        console.log("received data");

                        console.log(data);

                        localStorage.setItem("gerenciamento-de-salas@v1.1", JSON.stringify(data));
                        toast.success("Login realizado com sucesso!");
                        // window.location.href = "/calendar";
                    }
                    else {
                        toast.error("Erro ao fazer login!");
                    }

                }
                catch (error) {
                    console.log(error)
                    toast.error("Erro ao fazer login!");
                }
            }
        }
    };

    return (
        <Container>
            <ToastContainer />

            <LoginContainer>
                <SideContainer>
                    <BackgroundImage src={background} />
                    <FatecImage src={fatec} />
                </SideContainer>
                {

                    form == "login" ?
                        <>
                            <Form onSubmit={handleSubmit}>
                                <TitleWrapper>
                                    <p>Bem vindo ao
                                    </p>
                                    <h1>
                                        Sistema de Gerenciamento de Salas de Aula
                                    </h1>
                                </TitleWrapper>
                                <ContentWrapper>
                                    <TeamsWrapper>
                                        <TeamsLogo src={teamsLogo} />
                                        <p>Entrar com o Teams</p>
                                    </TeamsWrapper>
                                    <Separator   >
                                        <div></div>
                                        <div>ou</div>
                                        <div></div>
                                    </Separator>
                                </ContentWrapper>
                                <FormInputsWrapper>
                                    <InputsWrapper>
                                        <InputWrapper>
                                            <MailIcon src={mailIcon} />
                                            <div>
                                                <p>Email</p>
                                                <Input
                                                    type="text"
                                                    placeholder="Digite seu email"
                                                    value={email}
                                                    onChange={(event: any) => setemail(event.target.value)}
                                                />
                                            </div>
                                        </InputWrapper>
                                        <InputWrapper>
                                            <PasswordIcon src={passwordIcon} />
                                            <div>
                                                <p>Password</p>
                                                <span>
                                                    <Input
                                                        type="password"
                                                        placeholder="********"
                                                        value={password}
                                                        onChange={(event: any) => setPassword(event.target.value)}
                                                    />
                                                    <EyePassword src={eyePassword} />
                                                </span>
                                            </div>
                                        </InputWrapper>
                                    </InputsWrapper>
                                    <MantenhaMeConectadoWrapper>
                                        <div>
                                            <input type="checkbox" />
                                            <p>Mantenha-me conectado</p>
                                        </div>
                                        <EsqueceuSenha>Esqueceu sua senha?</EsqueceuSenha>
                                    </MantenhaMeConectadoWrapper>
                                    <ButtonsWrapper>
                                        <Button type="submit">Login</Button>
                                        <div>
                                            <p>
                                                Não possui uma conta?
                                                <span onClick={() => setForm("registration")}> Registre-se</span>
                                            </p>
                                        </div>
                                    </ButtonsWrapper>
                                </FormInputsWrapper>
                            </Form>
                        </>
                        :
                        <>
                            <Form onSubmit={handleSubmit} >
                                <h1>Registrar novo Usuário</h1>
                                <div>
                                    <InputWrapper>
                                        <Input
                                            type="text"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(event: any) => setemail(event.target.value)}

                                        />
                                        <Input
                                            type="password"
                                            placeholder="Digite sua senha"
                                            value={password}
                                            onChange={(event: any) => setPassword(event.target.value)}
                                        />
                                        <Input
                                            type="password"
                                            placeholder="Confirme sua senha"
                                            value={password}
                                            onChange={(event: any) => setPassword(event.target.value)}
                                        />
                                        <label>Role:</label>
                                        <select value={role} onChange={(event) => setRole(event.target.value)}>
                                            <option value="">Select a role</option>
                                            <option value="admin">Admin</option>
                                            <option value="coordenador">Coordenador</option>
                                            <option value="professor">Professor</option>
                                        </select>
                                    </InputWrapper>
                                    <ButtonsWrapper>
                                        <Button type="submit">Criar Usuário</Button>
                                        <Button type="button" onClick={() => setForm("login")}>Login</Button>
                                    </ButtonsWrapper>
                                </div>
                            </ Form>
                        </>
                }
            </LoginContainer>

        </Container>
    );
};

export default LoginScreen;


