import React, { useEffect, useState } from 'react';

import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import {
    Container, Header, Separator,
    SearchBar, TableSelector, TableContainer, Wrapper, CounterWrapper
} from './Perfil.styles';

function Perfil() {

    const [userData, setUserData] = React.useState<UserData[]>([])
    const [appointmentData, setAppointmentData] = React.useState<AppointmentData[]>([])

    const [selectedCategory, setSelectedCategory] = useState('Usuários');
    const [selectedTable, setSelectedTable] = useState('alunos');

    useEffect(() => {
        fetch('http://localhost:3333/users')
            .then(response => response.json())
            .then(data => setUserData(data))
    }, [])

    useEffect(() => {
        fetch('http://localhost:3333/agendamento')
            .then(response => response.json())
            .then(data => setAppointmentData(data))
    }, [])


    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    }

    const handleTableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTable(event.target.value);
    }


    interface UserData {
        id: number;
        name: string;
        email: string
        semester: string;
        course: string;
    }

    const UsersTable = ({ data }: any) => {
        return (
            <TableContainer>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Semestre</th>
                        <th>Curso</th>

                    </tr>
                </thead>
                <tbody>

                    {data.map((user: UserData) => (
                        <tr key={user.id}>

                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.semester}</td>

                            <td>{user.course}</td>

                        </tr>
                    ))}
                </tbody>
            </TableContainer>
        )
    }

    // "id": 362,
    // "date": "2023-04-01",
    // "horario_inicio": "22:15",
    // "horario_fim": "23:05",
    // "id_professor": "1234",
    // "id_grade": "5",
    // "id_laboratorio": "9012",
    // "created_at": "2023-04-02T02:21:57.071Z",
    // "updated_at": "2023-04-02T02:21:57.071Z"

    interface AppointmentData {
        id: number;
        date: Date;
        horario_inicio: string;
        horario_fim: string;
        id_professor: string;
        id_grade: string;
        id_laboratorio: string;
        created_at: string;
        updated_at: string;
    }

    const AppointmentTable = ({ data }: any) => {
        return (
            <TableContainer>
                <thead>
                    <tr>
                        <th>Professor</th>
                        <th>Data</th>
                        <th>Horário de início</th>
                        <th>Horário de fim</th>
                        <th>Grade</th>
                        <th>Laboratório</th>
                        <th>Criado em</th>
                        <th>Atualizado em</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>

                    {data.map((appointment: AppointmentData) => (
                        <tr key={appointment.id}>
                            <td>{appointment.id_professor}</td>
                            <td>{format(new Date(appointment.date), 'dd/MM/yyyy', { locale: ptBR })}</td>
                            <td>{appointment.horario_inicio}</td>
                            <td>{appointment.horario_fim}</td>
                            <td>{appointment.id_grade}</td>
                            <td>{appointment.id_laboratorio}</td>
                            <td>{formatDistanceToNow(new Date(appointment.created_at), { locale: ptBR })} atrás</td>
                            <td>{formatDistanceToNow(new Date(appointment.updated_at), { locale: ptBR })} atrás</td>
                            <td>
                                <button type="button">Editar</button>
                                <button type="button">Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </TableContainer>
        )
    }

    const renderTable = () => {
        if (selectedCategory === 'Usuários') {
            return <UsersTable data={userData} />
        } else if (selectedCategory === 'Agendamentos') {
            return <AppointmentTable data={appointmentData} />
        }
    }

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
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="Agendamentos">Agendamentos</option>
                        <option value="Usuários">Usuários</option>
                    </select>
                    <select name="table" id="table" value={selectedTable} onChange={handleTableChange}>
                        <option value="alunos">Alunos</option>
                        <option value="professores">Professores</option>
                        <option value="administradores">Administradores</option>
                    </select>
                </TableSelector>
                <TableContainer>
                    {renderTable()}
                </TableContainer>
            </Wrapper>
        </Container>
    );
}

export default Perfil;