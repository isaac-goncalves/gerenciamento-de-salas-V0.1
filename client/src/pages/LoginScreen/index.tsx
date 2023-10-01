import React, { useCallback, useEffect, useState } from "react";

import { Helmet } from 'react-helmet'

const apiUrl = String(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL);

console.log(String(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL))

import { useWindowSize } from 'react-use';

import Confetti from 'react-confetti';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { SideContainer, Button, ButtonsWrapper, Form, Input, LoginContainer, BackgroundImage, InputWrapper, FatecImage, ContentWrapper, TitleWrapper, TeamsLogo, TeamsWrapper, InputsWrapper, MailIcon, PasswordIcon, Separator, FormInputsWrapper, MantenhaMeConectadoWrapper, EsqueceuSenha, EyePassword, SGSALogo, EyeIcon, InputInternalWrapper, InputColumnWrapper, ButtonWrapper, NãoPossuiContaText, EmailWrapper, ContainerElement } from "./Login.styles"

import background from '../../../public/images/background.jpg';
import fatec from '../../../public/images/fatec.svg';
import sgsa_logo from '../../../public/images/SGSA-logo.svg';

import teamsLogo from '../../../public/images/teamsIcon.svg';
import mailIcon from '../../../public/images/emaiIcon.svg';
import passwordIcon from '../../../public/images/passwordIcon.svg';
import eyePassword from '../../../public/images/eyepassword.svg';
import { Link, Navigate } from "react-router-dom";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { InteractionManager, Particle } from "tsparticles-engine";
import Particles from "react-tsparticles";

import { loadSlim } from "tsparticles-slim";

import { Theme, type Container, type Engine } from "tsparticles-engine";

interface InputProps {
    hasError: boolean;
}

interface props {
    theme: Theme;
}

const LoginScreen: any = ({ theme }: any) : any => {
    const [email, setEmail] = useState(""); //isaac@gmail.com
    const [password, setPassword] = useState(""); //Password123$
    const [form, setForm] = useState("login");
    const [role, setRole] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const { width, height } = useWindowSize()

    const [confetti, setConfetti] = useState(false);

    const [error, setError] = useState(false);

    const [firstLoad, setFirstLoad] = useState(false);

    //PARTICLES FUNCTIONS
    const particlesInit = useCallback(async (engine: Engine) => {
        console.log(engine);

        // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        //await loadFull(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        await console.log(container);
    }, []);


    useEffect(() => {
        const localStorageData = localStorage.getItem("gerenciamento-de-salas@v1.2");

        if (localStorageData) {
            const data = JSON.parse(localStorageData);
            if (data.token && !firstLoad) {
                console.log("token exists");
                toast.success("Você já está logado!");
                setFirstLoad(true);
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

                    localStorage.setItem("gerenciamento-de-salas@v1.2", JSON.stringify(obj));

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

    const handleGuestLogin = (event: React.FormEvent) => {
        event.preventDefault();
        const guestRandomNumber = Math.floor(Math.random() * 1000000);

        const guestCreationObject =
        {
            name: "Guest",
            surname: "guest",
            email: `${guestRandomNumber}_guest@mail.com`,
            password: "Password123$",
            role: "guest",
            semestre: 1
        }

        fetch(`${apiUrl}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(guestCreationObject),
        })

            .then((response) => response.json())
            .then((data) => {

                const obj = {
                    userData: data.userData,
                    token: data.token
                }
                console.log(JSON.stringify(obj));

                localStorage.setItem("gerenciamento-de-salas@v1.2", JSON.stringify(obj));

                setConfetti(true);
                toast.success("Usuário guest criado com sucesso!");

                setTimeout(() => {
                    console.log("redirecting")
                    window.location.href = "/dashboard";
                }
                    , 4000);
            }
            )

    }
    return (
        <>
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    // background: {
                    //   color: {
                    //     // value: "#ffffff",
                    //   },
                    // },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: theme.mainpurple,
                        },
                        links: {
                            color: theme.mainpurple,
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 6,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 80,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 5 },
                        },
                    },
                    detectRetina: true,
                }}
            />
            <ContainerElement>
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
                    <Form>
                        <TitleWrapper>
                            <p>Bem vindo ao</p>
                            <div>
                                <SGSALogo src={sgsa_logo} />
                            </div>
                        </TitleWrapper>
                        <ContentWrapper>
                            <TeamsWrapper onClick={() => toast.info("Em breve disponivel 😅💻")}>
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
                                    <EmailWrapper>
                                        <p>Email</p>
                                        <Input
                                            type="text"
                                            placeholder="Digite seu email"
                                            value={email}
                                            onChange={(event: any) => setEmail(event.target.value)}
                                        />
                                    </EmailWrapper>
                                </InputWrapper>
                                <InputWrapper>
                                    <PasswordIcon src={passwordIcon} />
                                    <InputColumnWrapper>
                                        <p>Password</p>
                                        <InputInternalWrapper>
                                            <Input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="**********"
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
                                <ButtonWrapper>
                                    <Button onClick={handleGuestLogin} >Guest</Button>
                                    <Button onClick={handleSubmit}>Login</Button>
                                </ButtonWrapper>
                                    <NãoPossuiContaText>
                              
                                        Não possui uma conta?
                                        <Link to="/register" >
                                            <span> Registre-se</span>
                                        </Link>
                               
                                    </NãoPossuiContaText>
                            </ButtonsWrapper>
                        </FormInputsWrapper>
                    </Form>
                </LoginContainer>
            </ContainerElement>
        </>
    );
};

export default LoginScreen;


