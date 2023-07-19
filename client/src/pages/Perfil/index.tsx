import React, { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet'

import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';
const apiUrl = 'http://localhost:3333';

import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import PacmanLoader from 'react-spinners/PacmanLoader';

import {
    Container, Header, Separator,
    SearchBar, TableSelector, Wrapper, CounterWrapper, EditButton, DeleteButton, ButtonsWrapper, TableHeader, Table, TableData, TableBody, TableRow, CenteredNumber, TableContainer, NowrapText
} from './Perfil.styles';

import { toast, ToastContainer } from 'react-toastify';

import ModalEdit from '../Components/ModalEdit';
import ModalDelete from '../Components/ModalDelete'
import FileUploadButton from '../Components/FileUploadButton/inde';
import FileDownloadButton from '../Components/FileDownloadButton/inde';

function Perfil() {

    const [userData, setUserData] = React.useState<UserData[]>([])
    const [appointmentData, setAppointmentData] = React.useState<AppointmentData[]>([])
    const [alunosData, setAlunosData] = React.useState<AlunosData[]>([])
    const [professoresData, setProfessoresData] = React.useState<ProfessoresData[]>([])

    const [editingModal, setEditingModal] = React.useState(false)
    const [deleteModal, setDeleteModal] = React.useState(false)

    const [isLoading, setIsLoading] = React.useState(false);
    const [Error, setError] = React.useState(true);

    const [selectedTable, setSelectedTable] = useState('agendamentos');
    const [selectedCategory, setSelectedCategory] = useState('Alunos');

    const [agendamentoId, setAgendamentoId] = useState<Number>(2);
    const [editedData, setEditedData] = useState<any>({});


    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setIsLoading(false);
        try {
            const [
                appointmentDataResponse,
                userDataResponse,
                alunosDataResponse,
                professoresDataResponse
            ] = await Promise.all([
                fetch(`${apiUrl}/agendamento`).then(res => res.json()),
                fetch(`${apiUrl}/usuarios`).then(res => res.json()),
                fetch(`${apiUrl}/alunos`).then(res => res.json()),
                fetch(`${apiUrl}/professores`).then(res => res.json())
            ]);

            setUserData(userDataResponse);
            setAppointmentData(appointmentDataResponse);
            setAlunosData(alunosDataResponse);

            const ProfessorWithOutFirstElement = professoresDataResponse.slice(1);

            setProfessoresData(ProfessorWithOutFirstElement);

            setTimeout(() => {
                setIsLoading(true);
            }, 0);

        } catch (error) {
            console.error(error);
            toast.error('Erro ao carregar dados da tabela. Tente novamente mais tarde.')
            setError(true);
        }
    }

    const handleCloseModalEdit = (resetParams: boolean) => {
        setEditingModal(false);
        if (resetParams) fetchData();
    };

    const handleCloseModalDelete = (resetParams: boolean) => {
        setDeleteModal(false);
        if (resetParams) fetchData();
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    }

    const handleTableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTable(event.target.value);
    }

    const handleEditClick = (editedData: any) => {
        setEditedData(editedData);
        setEditingModal(true);
    };

    const handleDeleteClick = (editedData: any) => {
        setEditedData(editedData);
        setDeleteModal(true);

    }

    interface AppointmentData {
        id: number;
        date: Date;
        nome: string;
        horario_inicio: string;
        horario_fim: string;
        id_professor: string;
        uuid_agendamento: string;
        id_grade: string;
        id_laboratorio: string;
        created_at: string;
        updated_at: string;
    }

    const AppointmentTable = ({ data }: any) => {
        return (
            <TableContainer>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <th>Professor</th>
                            <th>Data</th>
                            <th>início</th>
                            <th>fim</th>
                            <th>ID</th>
                            <th>Grade</th>
                            <th>Laboratório</th>
                            <th>Criado</th>
                            <th>Atualizado</th>
                            <th>Ações</th>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((appointment: AppointmentData) => (
                            <tr key={appointment.id}>
                                <CenteredNumber>{appointment.id_professor}</CenteredNumber>
                                <CenteredNumber>{format(new Date(appointment.date), 'dd/MM/yyyy', { locale: ptBR })}</CenteredNumber>
                                <CenteredNumber>{appointment.horario_inicio}</CenteredNumber>
                                <CenteredNumber>{appointment.horario_fim}</CenteredNumber>
                                <CenteredNumber>{appointment.uuid_agendamento}</CenteredNumber>
                                <CenteredNumber>{appointment.id_grade}</CenteredNumber>
                                <CenteredNumber>{appointment.id_laboratorio}</CenteredNumber>
                                <NowrapText>{formatDistanceToNow(new Date(appointment.created_at), { locale: ptBR })} atrás</NowrapText>
                                <NowrapText>{formatDistanceToNow(new Date(appointment.updated_at), { locale: ptBR })} atrás</NowrapText>
                                <ButtonsWrapper>
                                    <EditButton type="button" onClick={() => handleEditClick(appointment)}><RiPencilLine />
                                        <p>
                                            Editar
                                        </p>
                                    </EditButton>
                                    <DeleteButton type="button" onClick={() => handleDeleteClick(appointment)}><RiDeleteBinLine />
                                        <p>
                                            Excluir
                                        </p>
                                    </DeleteButton>
                                </ButtonsWrapper>
                            </tr>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    // "id":1,"email":"isaac@gmail.com","password":"$2b$08$ehGz3Y/Tz24MkwvKuj9tz.Nry5TfJgbB22CHf85xeNPXYAPt5/16e","role":"professor","created_at":"2023-04-26T22:29:28.728Z","updated_at":"2023-04-26T22:29:28.728Z"}

    interface UserData {
        id: number
        name: string
        email: string
        role: string
        created_at: string
        updated_at: string
    }

    const UsersTable = ({ data }: any) => {
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Tipo</th>
                        <th>Criado</th>
                        <th>Atualizado</th>
                    </TableRow>
                </TableHeader>
                <tbody>
                    {data.map((user: UserData) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <NowrapText>{formatDistanceToNow(new Date(user.created_at), { locale: ptBR })} atrás</NowrapText>
                            <NowrapText>{formatDistanceToNow(new Date(user.updated_at), { locale: ptBR })} atrás</NowrapText>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
    }

    interface AlunosData {
        id: number
        name: string
        surname: string
        email: string
        user_id: number
        semester: number
        created_at: Date
        updated_at: Date
    }

    const AlunosTable = ({ data }: any) => {
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Email</th>
                        <th>Semestre</th>
                        <th>Criado</th>
                        <th>Atualizado</th>
                    </TableRow>
                </TableHeader>
                <tbody>
                    {data.map((aluno: AlunosData) => {
                        return (
                            <tr key={aluno.id}>
                                <td>{aluno.id}</td>
                                <td>{aluno.name}</td>
                                <td>{aluno.surname}</td>
                                <td>{aluno.email}</td>
                                <CenteredNumber>{aluno.semester}1</CenteredNumber>
                                <NowrapText>{formatDistanceToNow(new Date(aluno.created_at), { locale: ptBR })} atrás</NowrapText>
                                <NowrapText>{formatDistanceToNow(new Date(aluno.updated_at), { locale: ptBR })} atrás</NowrapText>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }

    interface ProfessoresData {
        id: number
        name: string
        surname: string
        email: string
        user_id: number
        disciplina: string
        created_at: string
    }

    const ProfessoresTable = ({ data }: any) => {
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Email</th>
                        <th>Disciplina</th>
                        <th>Criado em</th>
                    </TableRow>
                </TableHeader>
                <tbody>
                    {data.map((professor: ProfessoresData) => (
                        <tr key={professor.id}>
                            <td>{professor.id}</td>
                            <td>{professor.name}</td>
                            <td>{professor.surname}</td>
                            <td>{professor.email}</td>
                            <td>{professor.disciplina}</td>
                            <td>{formatDistanceToNow(new Date(professor.created_at), { locale: ptBR })} atrás</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
    }

    const renderTable = () => {
        if (selectedTable === 'agendamentos') {
            return <AppointmentTable data={appointmentData} />
        }
        else if (selectedTable === 'usuarios') {
            return <UsersTable data={userData} />
        }
        else if (selectedTable === 'alunos') {
            return <AlunosTable data={alunosData} />
        }
        else if (selectedTable === 'professores') {
            return <ProfessoresTable data={professoresData} />
        }
    }

    return (
        <Container>
            <Helmet>
                <title>SGSA - Perfil</title>
            </Helmet>
            <ToastContainer />
            <ModalEdit isVisible={editingModal} onClose={handleCloseModalEdit} editedData={editedData} />
            <ModalDelete isVisible={deleteModal} onClose={handleCloseModalDelete} deleteData={editedData} />
            <Wrapper>
                <Header>
                    <CounterWrapper>
                        {
                            isLoading ?
                                (<h1>{alunosData.length}</h1>)
                                :
                                (<PacmanLoader />)
                        }
                        <p>Alunos</p>
                    </CounterWrapper>
                    <Separator></Separator>
                    <CounterWrapper>
                        {
                            isLoading ?
                                (<h1>{professoresData.length}</h1>)
                                :
                                (<PacmanLoader />)
                        }
                        <p>Professores</p>
                    </CounterWrapper>
                    <Separator></Separator>
                    <CounterWrapper>
                        {
                            isLoading ?
                                (<h1>{professoresData.length}</h1>)
                                :
                                (<PacmanLoader />)
                        }
                        <p>Coordenadores</p>
                    </CounterWrapper>
                </Header>
                <SearchBar>
                    <input type="text" placeholder="Pesquisar" />
                    <button type="submit">Convidar</button>
                </SearchBar>
                <TableSelector>
                    <select value={selectedTable} onChange={handleTableChange}>
                        <option value="agendamentos">Agendamentos</option>
                        <option value="usuarios">Usuários</option>
                        <option value="alunos">Alunos</option>
                        <option value="professores">Professores</option>
                    </select>
                    {
                        selectedTable == "usuarios" &&
                        <select name="table" id="table" value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="alunos">Alunos</option>
                            <option value="professores">Professores</option>
                            <option value="administradores">Administradores</option>
                        </select>
                    }
                </TableSelector>
                {
                    isLoading ?
                        renderTable()
                        :
                        (<PacmanLoader />)
                }
            </Wrapper>
        </Container>
    );
}

export default Perfil;