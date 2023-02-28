import React, { useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { AddressWrapper, Button, ButtonsWrapper, ContactWrapper, Container, Form, Input, LoginContainer, PasswordContainer } from "./Register.styles"

const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("submit");
}

const RegisterScreen: React.FC = () => {

    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    const [degree, setDegree] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [zip, setZip] = useState("");

    return (
        <Container>
            <ToastContainer />
            <LoginContainer>
                <Form onSubmit={handleSubmit}>
                    <h1>Registrar novo Usuário</h1>
                    <Input
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(event: any) => setemail(event.target.value)}

                    />
                    <PasswordContainer>
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event: any) => setPassword(event.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event: any) => setPassword(event.target.value)}
                        />
                    </PasswordContainer>
                    <ContactWrapper>

                        <Input
                            type="text"
                            placeholder="Nome"
                            value={name}
                            onChange={(event: any) => setName(event.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="Telefone"
                            value={phone}
                            onChange={(event: any) => setPhone(event.target.value)}
                        />
                    </ContactWrapper>
                    <Input
                        type="text"
                        placeholder="Formação"
                        value={degree}
                        onChange={(event: any) => setDegree(event.target.value)}
                    />
                    <AddressWrapper>
                        
                        <Input
                            type="text"
                            placeholder="Endereço"
                            value={address}
                            onChange={(event: any) => setAddress(event.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="State"
                            value={state}
                            onChange={(event: any) => setAddress(event.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="Cidade"
                            value={city}
                            onChange={(event: any) => setCity(event.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="País"
                            value={country}
                            onChange={(event: any) => setCountry(event.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="CEP"
                            value={zip}
                            onChange={(event: any) => setZip(event.target.value)}
                        />
                    </AddressWrapper>
                    <label>Role:</label>
                    <select value={role} onChange={(event) => setRole(event.target.value)}>
                        <option value="">Select a role</option>
                        <option value="admin">Admin</option>
                        <option value="coordenador">Coordenador</option>
                        <option value="professor">Professor</option>
                    </select>
                    <ButtonsWrapper>
                        <Button type="submit">Registrar</Button>
                    </ButtonsWrapper>
                </Form>
            </LoginContainer>
        </Container>
    )
}


export default RegisterScreen;
