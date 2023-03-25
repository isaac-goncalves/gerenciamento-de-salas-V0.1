import React, { useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import registerLogo from '../../../public/images/register/registerlogo.svg';

import { AddressWrapper, RegisterLogo, Button, ButtonsWrapper, ContactWrapper, Container, Form, ImageContainer, Input, LoginContainer, PasswordContainer, ContentContainer, InputWrapper } from "./Register.styles"

const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("submit");
}

const RegisterScreen: React.FC = () => {

    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Container>
            <ToastContainer />
            <ImageContainer>
                <RegisterLogo src={registerLogo} />
            </ImageContainer>
            <ContentContainer>
                <LoginContainer>
                    <Form onSubmit={handleSubmit}>
                        <h1>Preencha o Formulário para se Registrar!</h1>
                        <InputWrapper>
                            <label>Full name:</label>
                            <Input
                                type="text"
                                placeholder=""
                                value={email}
                                onChange={(event: any) => setemail(event.target.value)}
                            />
                        </InputWrapper>
                        <div>
                            <input type="radio" id="admin" name="role" value="admin" />
                            <label >Aluno</label>
                            <input type="radio" id="coordenador" name="role" value="coordenador" />

                            <label >Professor</label>
                            <input type="radio" id="professor" name="role" value="professor" />
                            <label >Coordenador</label>
                        </div>
                        <InputWrapper>
                            <label>Emai:</label>
                            <Input
                                type="text"
                                placeholder=""
                                value={email}
                                onChange={(event: any) => setemail(event.target.value)}
                            />
                        </InputWrapper>

                        <PasswordContainer>
                            <InputWrapper>
                                <label>Password:</label>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(event: any) => setPassword(event.target.value)}
                                />
                            </InputWrapper>
                            <InputWrapper>
                                <label>Confirmar senha:</label>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(event: any) => setPassword(event.target.value)}
                                />
                            </InputWrapper>
                        </PasswordContainer>
                        <ButtonsWrapper>
                            <Button type="submit">Registrar</Button>
                        </ButtonsWrapper>
                    </Form>
                </LoginContainer>
            </ContentContainer>
        </Container>
    )
}


export default RegisterScreen;
