import React, { useEffect, useState } from "react";

import { Helmet } from 'react-helmet'

const apiUrl = "http://localhost";

console.log(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL)

import { useWindowSize } from 'react-use';

import Confetti from 'react-confetti';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { SideContainer, Button, ButtonsWrapper, Container, Form, Input, LoginContainer, BackgroundImage, InputWrapper, FatecImage, ContentWrapper, TitleWrapper, TeamsLogo, TeamsWrapper, InputsWrapper, MailIcon, PasswordIcon, Separator, FormInputsWrapper, MantenhaMeConectadoWrapper, EsqueceuSenha, EyePassword, SGSALogo, EyeIcon, InputInternalWrapper, InputColumnWrapper } from "./Login.styles"

import background from '../../../public/images/background.jpg';
import fatec from '../../../public/images/fatec.svg';
import sgsa_logo from '../../../public/images/SGSA-logo.svg';

import teamsLogo from '../../../public/images/teamsIcon.svg';
import mailIcon from '../../../public/images/emaiIcon.svg';
import passwordIcon from '../../../public/images/passwordIcon.svg';
import eyePassword from '../../../public/images/eyepassword.svg';
import { Link, Navigate } from "react-router-dom";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

interface InputProps {
    hasError: boolean;
}

const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState("isaac@gmail.com");
    const [password, setPassword] = useState("Password123$");
    const [form, setForm] = useState("login");
    const [role, setRole] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const { width, height } = useWindowSize()

    const [confetti, setConfetti] = useState(false);

    const [error, setError] = useState(false);

    useEffect(() => {
        const localStorageData = localStorage.getItem("gerenciamento-de-salas@v1.1");

        if (localStorageData) {
            const data = JSON.parse(localStorageData);
            if (data.token) {
                console.log("token exists");
                toast.success("Você já está logado!");
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 2000);
            }
        }

        console.log("token does not exists");
    }, []);


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log("submit");
        if (email === "" || password === "") {
            toast.error("Preencha todos os campos");
        } else {
            console.log("login")
            try {
                const response = await fetch(`${apiUrl}/login`, {
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

                if (data.error) return toast.error(data.error);

                if (data) {
                    console.log("received data");

                    console.log(data);

                    setConfetti(true);

                    const obj = {
                        userData: data.userData,
                        token: data.token
                    }
                    console.log(JSON.stringify(obj));

                    localStorage.setItem("gerenciamento-de-salas@v1.1", JSON.stringify(obj));

                    setConfetti(true);
                    toast.success("Login realizado com sucesso!");

                    setTimeout(() => {
                        console.log("redirecting")
                        window.location.href = "/dashboard";
                    }
                        , 4000);
                }
                else {
                    toast.error("Erro ao fazer login!");
                }
            }
            catch (err) {
                console.log(err);
                toast.error("Erro ao fazer login!");
            }

        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    return (
        <Container>
            <Helmet>
                <title>SGSA - login</title>
            </Helmet>
            <ToastContainer />
            {
                confetti &&
                <Confetti
                    width={width}
                    height={height}
                    colors={["#A29EC7", "#6358DC", "#6c38e7"]}
                />
            }
            <LoginContainer>
                <SideContainer>
                    <BackgroundImage src={background} />
                    <FatecImage src={fatec} />
                </SideContainer>
                <Form onSubmit={handleSubmit}>
                    <TitleWrapper>
                        <p>Bem vindo ao</p>
                        <div>
                            <SGSALogo src={sgsa_logo} />
                        </div>
                    </TitleWrapper>
                    <ContentWrapper>
                        <TeamsWrapper>
                            <TeamsLogo src={teamsLogo} />
                            <p>Entrar com o Teams</p>
                        </TeamsWrapper>
                        <Separator>
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
                                        onChange={(event: any) => setEmail(event.target.value)}
                                    />
                                </div>
                            </InputWrapper>
                            <InputWrapper>
                                <PasswordIcon src={passwordIcon} />
                                <InputColumnWrapper>
                                    <p>Password</p>
                                    <InputInternalWrapper>
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="********"
                                            value={password}
                                            onChange={(event: any) => setPassword(event.target.value)}
                                        />
                                        <EyeIcon onClick={toggleShowPassword}>
                                            {showPassword ? <BsEyeSlashFill size={20} /> : <BsEyeFill size={20} />}
                                        </EyeIcon>
                                    </InputInternalWrapper>
                                </InputColumnWrapper>
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
                                    <Link to="/register" >
                                        <span> Registre-se</span>
                                    </Link>
                                </p>
                            </div>
                        </ButtonsWrapper>
                    </FormInputsWrapper>
                </Form>
            </LoginContainer>

        </Container>
    );
};

export default LoginScreen;


