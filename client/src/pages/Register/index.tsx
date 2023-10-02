import React, { useCallback, useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'

const apiUrl = String(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL);

console.log(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL)

import { useWindowSize } from 'react-use';

import Confetti from 'react-confetti';

import { ToastContainer, toast } from 'react-toastify';

import { FiEye, FiEyeOff } from 'react-icons/fi';

import 'react-toastify/dist/ReactToastify.css';

import registerLogo from '../../../public/images/register/registerlogo.svg';

import { AddressWrapper, RegisterLogo, Button, ButtonsWrapper, ContactWrapper, Form, ImageContainer, Input, LoginContainer, PasswordContainer, ContentContainer, InputWrapper, NameWrapper, StyledSelect, RadioWrapper, EyeIcon, InputVisibleEye, ContainerElement } from "./Register.styles"
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import Particles from "react-tsparticles";

import { loadSlim } from "tsparticles-slim";

import { Theme, type Container, type Engine } from "tsparticles-engine";

const semestresOptions = [
    { value: '1', label: '1º SEMESTRE ADS - 2023' },
    { value: '2', label: '2º SEMESTRE ADS - 2023' },
    { value: '3', label: '3º SEMESTRE ADS - 2023' },
    { value: '4', label: '4º SEMESTRE ADS - 2023' },
    { value: '5', label: '5º SEMESTRE ADS - 2023' },
    { value: '6', label: '6º SEMESTRE ADS - 2023' },
];

const disciplinaOptions = [
    { value: "1", label: "Administração Geral" },
    { value: "2", label: "Algoritmos e Lógica de Programação" },
    { value: "3", label: "Arquitetura e Organização de Computadores" },
    { value: "4", label: "Banco de Dados" },
    { value: "5", label: "Cálculo" },
    { value: "6", label: "Comunicação e Expressão" },
    { value: "7", label: "Contabilidade" },
    { value: "8", label: "Economia e Finanças" },
    { value: "9", label: "Eletiva - Programação para Dispositivos Móveis" },
    { value: "10", label: "Engenharia de Software I" },
    { value: "11", label: "Engenharia de Software II" },
    { value: "12", label: "Engenharia de Software III" },
    { value: "13", label: "Estatística Aplicada" },
    { value: "14", label: "Estruturas de Dados" },
    { value: "15", label: "Inglês I" },
    { value: "16", label: "Inglês II" },
    { value: "17", label: "Inglês III" },
    { value: "18", label: "Inglês IV" },
    { value: "19", label: "Interação Humano Computador" },
    { value: "20", label: "Laboratório de Hardware" },
    { value: "21", label: "Linguagem de Programação" },
    { value: "22", label: "Matemática Discreta" },
    { value: "23", label: "Metodologia da Pesquisa Científico-Tecnológica" },
    { value: "24", label: "Programação em Microinformática" },
    { value: "25", label: "Programação Orientada a Objetos" },
    { value: "26", label: "Sistemas de Informação" },
    { value: "27", label: "Sistemas Operacionais I" },
    { value: "28", label: "Sistemas Operacionais II" },
    { value: "29", label: "Sociedade e Tecnologia" }
];

const RegisterScreen:any = ({ theme }: any) : any  => {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [semestre, setSemestre] = useState("");
    const [disciplina, setDisciplina] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [confetti, setConfetti] = useState(false);

    const { width, height } = useWindowSize()

    const [role, setRole] = useState("aluno");

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };


    const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRole(event.target.value);
    };

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSemestre(event.target.value);
    };

    const handleChangeDisciplina = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDisciplina(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        console.log("Register")

        if (password !== confirmPassword) {
            toast.error("As senhas não conferem!");
            return;
        }

        if (name === "") {
            toast.error("O campo nome não pode estar vazio!");
            return;
        }

        if (surname === "") {
            toast.error("O campo sobrenome não pode estar vazio!");
            return;
        }

        if (email === "") {
            toast.error("O campo email não pode estar vazio!");
            return;
        }
        //password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character
        if (password === "") {
            toast.error("O campo senha não pode estar vazio!");
            return;
        }

        if (password.length < 8) {
            toast.error("A senha deve ter no mínimo 8 caracteres!");
            return;
        }

        if (password.search(/[a-z]/i) < 0) {
            toast.error("A senha deve conter pelo menos uma letra!");
            return;
        }

        if (password.search(/[0-9]/) < 0) {
            toast.error("A senha deve conter pelo menos um número!");
            return;
        }

        if (password.search(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) < 0) {
            toast.error("A senha deve conter pelo menos um caractere especial!");
            return;
        }

        if (password.search(/[A-Z]/) < 0) {
            toast.error("A senha deve conter pelo menos uma letra maiúscula!");
            return;
        }

        if (password.search(/[a-z]/) < 0) {

            toast.error("A senha deve conter pelo menos uma letra minúscula!");
            return;
        }

        if (semestre === "" && role === "aluno") {
            toast.error("O campo Semestre não pode estar vazio!");
            return;
        }

        if (disciplina === "" && role === "professor") {
            toast.error("O campo Disciplina não pode estar vazio!");
            return;
        }



        const IsProfessor = (role === "professor") ? true : false;

        try {

            const params = {
                name: name,
                surname: surname,
                email: email,
                password: password,
                role: role,
                semester: IsProfessor ? "" : semestre,
                discipline: IsProfessor ? disciplina : ""
            }

            console.log(params);

            const response = await fetch(`${apiUrl}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(params),
            });
            const data = await response.json();

            if (data) {
                console.log("received data");
                if (data.error) {
                    toast.error(data.error);
                    return;
                }
                console.log("data received!")
                console.log(data);

                const obj = {
                    userData: data.userData,
                    token: data.token
                }
                console.log(JSON.stringify(obj));


                localStorage.setItem("gerenciamento-de-salas@v1.2", JSON.stringify(obj));
                toast.success("Registro realizado com sucesso!");
                setConfetti(true);
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 4000);

            }
            else {
                toast.error("Erro ao fazer Registro!");
            }
        }
        catch (err) {
            console.log(err);
            toast.error("Erro ao fazer Registro!");
        }

        console.log("submit");
    }

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
            <ToastContainer />
            <ContainerElement>
                <Helmet>
                    <title>SGSA - Registrar</title>
                </Helmet>
                {
                    confetti &&
                    <Confetti
                        width={width}
                        height={height}
                        colors={["#A29EC7", "#6358DC", "#6c38e7"]}

                    />
                }
                <ToastContainer />
                <ImageContainer>
                    <RegisterLogo src={registerLogo} />
                </ImageContainer>
                <ContentContainer>
                    <LoginContainer>
                        <Form onSubmit={handleSubmit}>
                            <h1>Preencha o Formulário para se Registrar!</h1>
                            <NameWrapper>
                                <div>
                                    <label>Nome</label>
                                    <Input
                                        type="text"
                                        placeholder=""
                                        value={name}
                                        onChange={(event: any) => setName(event.target.value)}
                                    />
                                </div>
                                <div>
                                    <label>Sobrenome</label>
                                    <Input
                                        type="text"
                                        placeholder=""
                                        value={surname}
                                        onChange={(event: any) => setSurname(event.target.value)}
                                    />
                                </div>
                            </NameWrapper>
                            <RadioWrapper>
                                <input
                                    type="radio"
                                    id="aluno"
                                    name="role"
                                    value="aluno"
                                    checked={role === 'aluno'}
                                    onChange={handleRoleChange}
                                />
                                <p>Aluno</p>
                                <input
                                    type="radio"
                                    id="professor"
                                    name="role"
                                    value="professor"
                                    checked={role === 'professor'}
                                    onChange={handleRoleChange}
                                />
                                <label>Professor</label>
                                {/* <input
                                type="radio"
                                id="professor"
                                name="role"
                                value="coordenador"
                                checked={role === 'coordenador'}
                                onChange={handleRoleChange}
                            />
                            <label>Coordenador</label> */}
                            </RadioWrapper>
                            <>
                                {role === "aluno" &&
                                    <InputWrapper>
                                        <label>Semestre:</label>
                                        <StyledSelect value={semestre} onChange={handleChange}>
                                            <option disabled value="">
                                                Selecione o semestre
                                            </option>
                                            {semestresOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </StyledSelect>
                                    </InputWrapper>
                                }
                                {role === "professor" &&
                                    <InputWrapper>
                                        <label>Disciplina</label>
                                        <StyledSelect value={disciplina} onChange={handleChangeDisciplina}>
                                            <option disabled value="">
                                                Selecione a disciplina
                                            </option>
                                            {disciplinaOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </StyledSelect>
                                    </InputWrapper>
                                }
                            </>
                            <InputWrapper>
                                <label>Email</label>
                                <Input
                                    type="text"
                                    placeholder=""
                                    value={email}
                                    onChange={(event: any) => setEmail(event.target.value)}
                                />
                            </InputWrapper>

                            <PasswordContainer>
                                <InputWrapper>
                                    <label>Password</label>
                                    <InputVisibleEye>
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Password"
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                        />
                                        <EyeIcon onClick={toggleShowPassword}>
                                            {showPassword ? <BsEyeSlashFill size={20} /> : <BsEyeFill size={20} />}
                                        </EyeIcon>
                                    </InputVisibleEye>
                                </InputWrapper>
                                <InputWrapper>
                                    <label>Confirmar senha</label>
                                    <InputVisibleEye>
                                        <Input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="Password"
                                            value={confirmPassword}
                                            onChange={(event) => setConfirmPassword(event.target.value)}
                                        />
                                        <EyeIcon onClick={toggleShowConfirmPassword}>
                                            {showConfirmPassword ? <BsEyeSlashFill size={220} /> : <BsEyeFill size={20} />}
                                        </EyeIcon>
                                    </InputVisibleEye>
                                </InputWrapper>
                            </PasswordContainer>
                            <ButtonsWrapper>
                                <Button type="submit">Registrar</Button>
                            </ButtonsWrapper>
                        </Form>
                    </LoginContainer>
                </ContentContainer>
            </ContainerElement>
        </>
    )
}

export default RegisterScreen;
