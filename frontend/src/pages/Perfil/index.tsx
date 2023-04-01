import React from 'react';

import {
    Container, Header, Separator,
    SearchBar, TableSelector, TableContainer, Wrapper, CounterWrapper
} from './Perfil.styles';

function Perfil() {

    return (
        <Container>
            <Wrapper>
                <Header>
                    <CounterWrapper>
                        <h1>176</h1>
                        <p>Alunos</p>
                    </CounterWrapper>
                    <Separator></Separator>
                    <CounterWrapper>
                        <h1>16</h1>
                        <p>Professores</p>
                    </CounterWrapper>
                    <Separator></Separator>
                    <CounterWrapper>
                        <h1>5 </h1>
                        <p>Coordenadores</p>
                    </CounterWrapper>
                </Header>

                <SearchBar>
                    <input type="text" placeholder="Pesquisar" />
                    <button type="submit">Convidar</button>
                </SearchBar>

                <TableSelector>
                    <select>
                        <option value="Usuários">Usuários</option>
                        <option value="Agendamentos">Agendamentos</option>
                    </select>
                    <select name="table" id="table">
                        <option value="alunos">Alunos</option>
                        <option value="professores">Professores</option>
                        <option value="administradores">Administradores</option>
                    </select>
                </TableSelector>
                <TableContainer>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Semestre</th>
                            <th>Curso</th>
                            <th>Activity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nome</td>
                            <td>Email</td>
                            <td>Semestre</td>
                            <td>Curso</td>
                            <td>Activity</td>
                        </tr>
                        <tr>
                            <td>Nome</td>
                            <td>Email</td>
                            <td>Semestre</td>
                            <td>Curso</td>
                            <td>Activity</td>
                        </tr>
                        <tr>
                            <td>Nome</td>
                            <td>Email</td>
                            <td>Semestre</td>
                            <td>Curso</td>
                            <td>Activity</td>
                        </tr>
                        <tr>
                            <td>Nome</td>
                            <td>Email</td>
                            <td>Semestre</td>
                            <td>Curso</td>
                            <td>Activity</td>
                        </tr>
                        <tr>
                            <td>Nome</td>
                            <td>Email</td>
                            <td>Semestre</td>
                            <td>Curso</td>
                            <td>Activity</td>
                        </tr>
                        <tr>
                            <td>Nome</td>
                            <td>Email</td>
                            <td>Semestre</td>
                            <td>Curso</td>
                            <td>Activity</td>
                        </tr>
                        <tr>
                            <td>Nome</td>
                            <td>Email</td>
                            <td>Semestre</td>
                            <td>Curso</td>
                            <td>Activity</td>
                        </tr>
                        <tr>
                            <td>Nome</td>
                            <td>Email</td>
                            <td>Semestre</td>
                            <td>Curso</td>
                            <td>Activity</td>
                        </tr>
                        <tr>
                            <td>Nome</td>
                            <td>Email</td>
                            <td>Semestre</td>
                            <td>Curso</td>
                            <td>Activity</td>
                        </tr> <tr>
                            <td>Nome</td>
                            <td>Email</td>
                            <td>Semestre</td>
                            <td>Curso</td>
                            <td>Activity</td>
                        </tr>
                        <tr>
                            <td>Nome</td>
                            <td>Email</td>
                            <td>Semestre</td>
                            <td>Curso</td>
                            <td>Activity</td>
                        </tr>
                        <tr>
                            <td>Nome</td>
                            <td>Email</td>
                            <td>Semestre</td>
                            <td>Curso</td>
                            <td>Activity</td>
                        </tr>
                    </tbody>
                </TableContainer>
            </Wrapper>
        </Container>
    );
}

export default Perfil;