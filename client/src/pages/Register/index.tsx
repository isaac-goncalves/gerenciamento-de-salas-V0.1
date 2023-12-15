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

import { AddressWrapper, RegisterLogo, Button, ButtonsWrapper, ContactWrapper, Form, ImageContainer, Input, LoginContainer, PasswordContainer, ContentContainer, InputWrapper, NameWrapper, StyledSelect, RadioWrapper, EyeIcon, InputVisibleEye, ContainerElement, InitialName, SecondName, LoginSugestionWrapper } from "./Register.styles"
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import Particles from "react-tsparticles";

import { loadSlim } from "tsparticles-slim";

import { Theme, type Container, type Engine } from "tsparticles-engine";

import "react-widgets/styles.css";

import Multiselect from "react-widgets/Multiselect";
import ParticlesComponent from '../Components/ParticlesComponent';

const semestresOptions = [
    { value: '1', label: '1º SEMESTRE' },
    { value: '2', label: '2º SEMESTRE' },
    { value: '3', label: '3º SEMESTRE' },
    { value: '4', label: '4º SEMESTRE' },
    { value: '5', label: '5º SEMESTRE' },
    { value: '6', label: '6º SEMESTRE' },
];

interface CourseProps {
    id: number;
    course_name: string;
}


const RegisterScreen: any = ({ theme }: any): any => {
    const [name, setName] = useState("");

    const [selectedValues, setSelectedValues] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);

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

    const [courses, setCourses] = useState<CourseProps[]>([
        {
            id: 0,
            course_name: "Selecione um Curso",
        },
    ]);

    const [selectedCourse, setSelectedCourse] = useState<CourseProps>(
        {
            id: 0,
            course_name: "Selecione um Curso",
        },
    );

    //FUNCTIONS

    useEffect(() => {

        console.log('Starting to render Register...');
        fetchDisciplinas()
        fetchCourses()

    }, [])

    //FETCH FUNCTION
    async function fetchDisciplinas() {
        console.log("Fetching fetchDisciplinas...")
        // console.log(process.env.REACT_APP_API_KEY)
        await fetch(`${apiUrl}/disciplinas`, {
            method: 'POST'

        }).then((response) => response.json()).then((data) => {
            console.log(data)

            let transformedData: any = []

            data.forEach((elemento: any) => {
                if (elemento.descricao !== "-") {


                    let dataObject = {
                        id: elemento.id,
                        disciplina: elemento.descricao
                    }

                    return transformedData.push(dataObject)
                }
            });

            transformedData.sort()

            console.log(transformedData)

            setDisciplinas(transformedData);

        }).catch((error) => {
            console.log(error)
        })
    }

    async function fetchCourses() {
        console.log("Fetching Courses...")
        fetch(`${apiUrl}/course`, {
            method: 'POST',
        }).then((response) => response.json()).then((data) => {
            return setCourses(data)
        }
        )
    }

    //AUXILIARY FUNCTIONS
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

    const handleSelectCourse = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // console.log(event.target.value)
        const courseObject: CourseProps = {
            id: parseInt(event.target.value),
            course_name: event.target.options[event.target.selectedIndex].text
        }

        setSelectedCourse(
            courseObject
        )

    }

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

        if (semestre === "" && role === "aluno") {
            toast.error("O campo Semestre não pode estar vazio!");
            return;
        }

        if (selectedValues.length < 1 && role === "professor") {
            toast.error("O campo Disciplina não pode estar vazio!");
            return;
        }

        if (email === "") {
            toast.error("O campo email não pode estar vazio!");
            return;
        }

        if (email.search("@") < 0) {
            toast.error("O campo email deve conter um @!");
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

        if (password.search(/[A-Z]/) < 0) {
            toast.error("A senha deve conter pelo menos uma letra maiúscula!");
            return;
        }

        if (password.search(/[a-z]/) < 0) {
            toast.error("A senha deve conter pelo menos uma letra minúscula!");
            return;
        }

        const IsProfessor = (role === "professor") ? true : false;

        try {

            const arrayOfDisciplineIds = selectedValues.map((item: any) => item.id)

            const params = {
                name: name,
                surname: surname,
                email: email,
                password: password,
                role: role,
                semester: IsProfessor ? "" : semestre,
                discipline: IsProfessor ? arrayOfDisciplineIds : "",
                course_id: selectedCourse.id
            }

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

                    if (data.error === "Professor not found") {
                        toast.error("Email de professor não encontrado na base de dados!🎲");
                        return;
                    }

                    if (data.error === "User already exists") {
                        toast.error("Email já cadastrado!🎲");
                        return;
                    }

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
                }, 3000);

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
            <ParticlesComponent theme={theme} />
            <ToastContainer />
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
            <ContainerElement>
                <ImageContainer>
                    <RegisterLogo src={registerLogo} />
                </ImageContainer>
                <ContentContainer>
                    <LoginContainer>
                        <Form onSubmit={handleSubmit}>
                            <h1>Preencha o Formulário para se Registrar!</h1>
                            <NameWrapper>
                                <InitialName>
                                    <label>Nome:</label>
                                    <Input
                                        type="text"
                                        placeholder=""
                                        value={name}
                                        onChange={(event: any) => setName(event.target.value)}
                                    />
                                </InitialName>
                                <SecondName>
                                    <label>Sobrenome:</label>
                                    <Input
                                        type="text"
                                        placeholder=""
                                        value={surname}
                                        onChange={(event: any) => setSurname(event.target.value)}
                                    />
                                </SecondName>
                            </NameWrapper>
                            <RadioWrapper>
                                <label>
                                    Função:
                                </label>
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
                                    <>
                                        <InputWrapper>
                                            <label>
                                                Disciplinas:
                                            </label>
                                            {/* //styled muyltiselect */}
                                            <Multiselect
                                                dataKey="id"
                                                textField="disciplina"
                                                placeholder='Selecione a disciplinas'
                                                data={disciplinas}
                                                value={selectedValues}
                                                onChange={value => {
                                                    console.log(value)
                                                    setSelectedValues(value)
                                                }
                                                }
                                            />
                                        </InputWrapper>
                                    </>
                                }
                            </>
                            <InputWrapper>
                                <label>
                                    Curso:
                                </label>
                                <StyledSelect value={selectedCourse.id} onChange={handleSelectCourse}>
                                    {courses && courses.length > 0 ? (
                                        courses.map((course) => {
                                            return (
                                                <option key={course.id} value={course.id}>
                                                    {course.course_name}
                                                </option>
                                            );
                                        })
                                    ) : (
                                        <option value="">No professors available</option>
                                    )}
                                </StyledSelect>
                            </InputWrapper>
                            <InputWrapper>
                                <label>Email:</label>
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
                            <LoginSugestionWrapper>
                                Já tem uma conta? <a href="/">Entrar</a>
                            </LoginSugestionWrapper>
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
