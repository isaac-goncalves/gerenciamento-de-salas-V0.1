import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';

import { Helmet } from 'react-helmet'

import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';
const apiUrl = String(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL);

import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import PacmanLoader from 'react-spinners/PacmanLoader';

import {
    Header, Separator,
    SearchBar, TableSelector, Wrapper, CounterWrapper, EditButton, DeleteButton, ButtonsWrapper, TableHeader, Table, TableData, TableBody, TableRowHeader, CenteredTableData, TableContainer, NowrapText, TableWrapper, SearchIcon, FilterIcon, ContainerElement
} from './Perfil.styles';

import { toast, ToastContainer } from 'react-toastify';

import ModalAgendamento from '../Components/ModalAgendamento';
import NewCourseModal from '../Components/ModalDelete';
import { BsWhatsapp } from 'react-icons/bs';
import ParticlesComponent from '../Components/ParticlesComponent';



const Gerenciamento: any = ({ theme }: any): any => {

    const [usersData, setUsersData] = React.useState<UsersData[]>([])
    const [appointmentData, setAppointmentData] = React.useState<AppointmentData[]>([])
    const [alunosData, setAlunosData] = React.useState<AlunosData[]>([])
    const [professoresData, setProfessoresData] = React.useState<ProfessoresData[]>([])

    //USERSESSIONDATA
    const [userData, setUserData] = useState<any>(
        {
            userData: {
                id: 0,
                name: "Selecione um professor",
            },
            token: ""
        }
    );

    const [editingModal, setEditingModal] = React.useState(false)
    const [deleteModal, setDeleteModal] = React.useState(false)

    const [isLoading, setIsLoading] = React.useState(false);
    const [Error, setError] = React.useState(true);

    const [selectedTable, setSelectedTable] = useState('agendamentos');
    const [selectedCategory, setSelectedCategory] = useState('Alunos');

    const [agendamentoId, setAgendamentoId] = useState<Number>(2);
    const [editedData, setEditedData] = useState<any>({});

    useLayoutEffect(() => {
        console.log('Starting to render stuff...');

        if (userData.token === '' || userData.userData.id === 0) {
            console.log('userData is null');

            const localUserData = localStorage.getItem('gerenciamento-de-salas@v1.2');
            const userDataJson = JSON.parse(localUserData || '{}');
            const { userData: storedUserData, token } = userDataJson;

            console.log(JSON.stringify(storedUserData));
            console.log('token' + token);

            if (token == null || localUserData == null) {
                toast.error('Você precisa estar logado para acessar essa página!');
                localStorage.removeItem('gerenciamento-de-salas@v1.2');
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else {
                // console.log('userDataJson: ' + JSON.stringify(userDataJson, null, 2));
                setUserData(userDataJson);
            }
        }
    }, [userData]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setIsLoading(false);
        try {
            const [
                appointmentDataResponse,
                usersDataResponse,
                alunosDataResponse,
                professoresDataResponse
            ] = await Promise.all([
                fetch(`${apiUrl}/agendamento`, {
                    method: 'post',
                }).then(res => res.json()),
                fetch(`${apiUrl}/usuarios`, {
                    method: 'post',
                }).then(res => res.json()),
                fetch(`${apiUrl}/alunos`, {
                    method: 'post',
                }).then(res => res.json()),
                fetch(`${apiUrl}/professores`, {
                    method: 'post',
                }).then(res => res.json())
            ]);

            setUsersData(usersDataResponse);
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
        if (userData.userData.role == 'aluno' || userData.userData.role == "guest") {
            toast.error('Usuário sem permissão para excluir agendamentos');
            return;
        }

        setEditedData(editedData);
        setDeleteModal(true);

    }

    interface AppointmentData {
        id: number;
        date: Date;
        nome: string;
        nome_professor: string;
        horario_inicio: string;
        horario_fim: string;
        id_professor: string;
        uuid_agendamento: string;
        id_grade: string;
        schedule_status: string;
        id_laboratorio: string;
        created_at: string;
        updated_at: string;
    }

    const AgendamentosTable = ({ data }: any) => {
        return (
            <TableWrapper>
                <Table>
                    <TableHeader>
                        <TableRowHeader>
                            <th>ID</th>
                            <th>Professor</th>
                            <th>Data</th>
                            <th>início</th>
                            <th>fim</th>
                            <th>UUID</th>
                            <th>Grade</th>
                            <th>Type</th>
                            <th>Laboratório</th>
                            <th>Criado</th>
                            <th>Atualizado</th>
                            <th>Ações</th>
                        </TableRowHeader>
                    </TableHeader>
                    <TableBody>
                        {data.map((appointment: AppointmentData) => (
                            <tr key={appointment.id}>
                                <CenteredTableData>{appointment.id_professor}</CenteredTableData>
                                <CenteredTableData>{appointment.nome_professor}</CenteredTableData>
                                <CenteredTableData>{format(new Date(appointment.date), 'dd/MM/yyyy', { locale: ptBR })}</CenteredTableData>
                                <CenteredTableData>{appointment.horario_inicio || "-"}</CenteredTableData>
                                <CenteredTableData>{appointment.horario_fim || "-"}</CenteredTableData>
                                <CenteredTableData>{appointment.uuid_agendamento}</CenteredTableData>
                                <CenteredTableData>{appointment.id_grade}</CenteredTableData>
                                <CenteredTableData>{appointment.schedule_status.toUpperCase()
                                }</CenteredTableData>
                                <CenteredTableData>{appointment.id_laboratorio}</CenteredTableData>
                                <CenteredTableData>{formatDistanceToNow(new Date(appointment.created_at), { locale: ptBR })} atrás</CenteredTableData>
                                <CenteredTableData>{formatDistanceToNow(new Date(appointment.updated_at), { locale: ptBR })} atrás</CenteredTableData>
                                <td>
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
                                </td>
                            </tr>
                        ))}
                    </TableBody>
                </Table>
            </  TableWrapper>
        )
    }

    // "id":1,"email":"isaac@gmail.com","password":"$2b$08$ehGz3Y/Tz24MkwvKuj9tz.Nry5TfJgbB22CHf85xeNPXYAPt5/16e","role":"professor","created_at":"2023-04-26T22:29:28.728Z","updated_at":"2023-04-26T22:29:28.728Z"}

    interface UsersData {
        id: number
        name: string
        email: string
        role: string
        created_at: string
        updated_at: string
    }

    const UsersTable = ({ data }: any) => {
        return (
            <TableWrapper>
                <Table>
                    <TableHeader>
                        <TableRowHeader>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Tipo</th>
                            <th>Criado</th>
                            <th>Atualizado</th>
                        </TableRowHeader>
                    </TableHeader>
                    <TableBody>
                        {data.map((user: UsersData) => (
                            <tr key={user.id}>
                                <CenteredTableData>{user.id}</CenteredTableData>
                                <CenteredTableData>{user.email}</CenteredTableData>
                                <CenteredTableData>{user.role}</CenteredTableData>
                                <CenteredTableData>{formatDistanceToNow(new Date(user.created_at), { locale: ptBR })} atrás</CenteredTableData>
                                <CenteredTableData>{formatDistanceToNow(new Date(user.updated_at), { locale: ptBR })} atrás</CenteredTableData>
                            </tr>
                        ))}
                    </TableBody>
                </Table>
            </TableWrapper>
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
            <TableWrapper>
                <Table>
                    <TableHeader>
                        <TableRowHeader>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Sobrenome</th>
                            <th>Email</th>
                            <th>Semestre</th>
                            <th>Criado</th>
                            <th>Atualizado</th>
                        </TableRowHeader>
                    </TableHeader>
                    <TableBody>
                        {data.map((aluno: AlunosData) => {
                            return (
                                <tr key={aluno.id}>
                                    <CenteredTableData>{aluno.id}</CenteredTableData>
                                    <CenteredTableData>{aluno.name}</CenteredTableData>
                                    <CenteredTableData>{aluno.surname}</CenteredTableData>
                                    <CenteredTableData>{aluno.email}</CenteredTableData>
                                    <CenteredTableData>{aluno.semester}1</CenteredTableData>
                                    <NowrapText>{formatDistanceToNow(new Date(aluno.created_at), { locale: ptBR })} atrás</NowrapText>
                                    <NowrapText>{formatDistanceToNow(new Date(aluno.updated_at), { locale: ptBR })} atrás</NowrapText>
                                </tr>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableWrapper>
        );
    }

    interface ProfessoresData {
        id: number
        name: string
        surname: string
        email: string
        course_name: string
        user_id: number
        disciplina: string
        created_at: string
    }

    const ProfessoresTable = ({ data }: any) => {
        return (
            <TableWrapper>
                <Table>
                    <TableHeader>
                        <TableRowHeader>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Sobrenome</th>
                            <th>Email</th>
                            <th>Disciplina</th>
                            <th>Curso</th>
                            <th>Criado em</th>
                        </TableRowHeader>
                    </TableHeader>
                    <TableBody>
                        {data.map((professor: ProfessoresData) => (
                            <tr key={professor.id}>
                                <CenteredTableData>{professor.id}</CenteredTableData>
                                <CenteredTableData>{professor.name}</CenteredTableData>
                                <CenteredTableData>{professor.surname}</CenteredTableData>
                                <CenteredTableData>{professor.email}</CenteredTableData>
                                <CenteredTableData>{professor.disciplina}</CenteredTableData>
                                <CenteredTableData>{professor.course_name}</CenteredTableData>
                                <CenteredTableData>{formatDistanceToNow(new Date(professor.created_at), { locale: ptBR })} atrás</CenteredTableData>
                            </tr>
                        ))}
                    </TableBody>
                </Table>
            </TableWrapper>
        )
    }

    const renderTable = () => {
        if (selectedTable === 'agendamentos') {
            return <AgendamentosTable data={appointmentData} />
        }
        else if (selectedTable === 'usuarios') {
            return <UsersTable data={usersData} />
        }
        else if (selectedTable === 'alunos') {
            return <AlunosTable data={alunosData} />
        }
        else if (selectedTable === 'professores') {
            return <ProfessoresTable data={professoresData} />
        }
    }

    const handleClick = () => {
        const whatsappLink =
            'whatsapp://send?text=Agende%20suas%20salas%20de%20aula%20e%20laborat%C3%B3rios%20de%20forma%20simples%20e%20eficiente%20com%20o%20Gerenciamento%20de%20Salas!%20%F0%9F%94%8D%F0%9F%92%A8%0AAcesse%20agora:%20gerenciamentodesalas.cloud%20%F0%9F%96%A5%F0%9F%94%92%0AFacilite%20sua%20vida%20acad%C3%AAmica!%20%F0%9F%93%9A%20%23FATEC';

        window.location.href = whatsappLink;
    };

    return (
        <>
           
            <ContainerElement>
                <Helmet>
                    <title>SGSA - Gerenciamento</title>
                </Helmet>
                <ToastContainer />
                <ParticlesComponent theme={theme} />
                <ModalAgendamento action={"EDIT"} idUserLogado={userData.userData.id} isVisible={editingModal} onClose={handleCloseModalEdit} initialData={editedData} daysIds={[1, 2, 3, 4]} />
                <NewCourseModal isVisible={deleteModal} onClose={handleCloseModalDelete} deleteData={editedData} />
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
                        <SearchIcon
                            size={25}
                        />
                        <input type="text" placeholder="Pesquisar" />
                        <button onClick={handleClick}>
                            <BsWhatsapp />
                            Convidar pelo Whatsapp
                        </button>
                    </SearchBar>
                    <TableSelector>
                        <FilterIcon
                            size={20}
                        />
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
                            (
                                <TableContainer>
                                    <PacmanLoader />
                                </TableContainer>
                            )
                    }
                </Wrapper>
            </ContainerElement>
        </>
    );
}

export default Gerenciamento;