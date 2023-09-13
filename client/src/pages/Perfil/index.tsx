import React, { useEffect, useLayoutEffect, useState } from 'react';

import { Helmet } from 'react-helmet'

import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';
const apiUrl = String(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL);

import { format, formatDistanceToNow, set } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import PacmanLoader from 'react-spinners/PacmanLoader';

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

import {
    Avatar,
    Container, Header, Separator,
    SearchBar, TableSelector, Wrapper, CounterWrapper, EditButton, DeleteButton, ButtonsWrapper, TableHeader, Table, TableData, TableBody, TableRow, CenteredNumber, TableContainer, NowrapText, StyledButton, ContentWrapper, ButtonWrapper, ButtonWapper
} from './Perfil.styles';

import { toast, ToastContainer } from 'react-toastify';

import avatar from '../../../public/images/avatar.png';

import ModalEdit from '../Components/ModalEdit';
import ModalDelete from '../Components/ModalDelete'
import FileUploadButton from '../Components/FileUploadButton/inde';
import FileDownloadButton from '../Components/FileDownloadButton/inde';
import { BsWhatsapp } from 'react-icons/bs';
import { AvatarWrapper, UserInfo, UserName, UserWrapper } from '../Navbar/Navbar.styles';
import { InputWrapper, StyledSelect } from '../Register/Register.styles';

function Perfil() {

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

    const [fechedUserData, setFetchedUserData] = React.useState<UserData[]>([])
    const [appointmentData, setAppointmentData] = React.useState<AppointmentData[]>([])
    const [alunosData, setAlunosData] = React.useState<AlunosData[]>([])
    const [professoresData, setProfessoresData] = React.useState<ProfessoresData[]>([])

    const [semestre, setSemestre] = useState("");
    const [disciplina, setDisciplina] = useState("");

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

            const localUserData = localStorage.getItem('gerenciamento-de-salas@v1.1');
            const userDataJson = JSON.parse(localUserData || '{}');
            const { userData: storedUserData, token } = userDataJson;

            console.log(JSON.stringify(storedUserData));
            console.log('token' + token);

            if (token == null || localUserData == null) {
                toast.error('Você precisa estar logado para acessar essa página!');
                localStorage.removeItem('gerenciamento-de-salas@v1.1');
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else {
                // console.log('userDataJson: ' + JSON.stringify(userDataJson, null, 2));
                setUserData(userDataJson);
                setSemestre(userDataJson.userData.semestre);
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
                userDataResponse,
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

            setFetchedUserData(userDataResponse);
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

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSemestre(event.target.value);
    };

    const handleChangeDisciplina = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDisciplina(event.target.value);
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

    const renderContent = () => {
        return (
            <>
                <ContentWrapper>

                    <Avatar src={avatar} />
                    <UserWrapper>
                        {<UserName>{userData.userData.name}</UserName>}
                        {<UserInfo>{userData.userData.role == "aluno" ? `${userData.userData.semestre}º ADS` : userData.userData.role == "professor" ? "professor" : "guest"}</UserInfo>}
                        {<UserInfo>{userData.userData.role}</UserInfo>}
                    </UserWrapper>
                    <ButtonWapper>
                    <>
                        {
                            (userData.userData.role === "Aluno" || userData.userData.role === "guest") &&
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
                        {
                            userData.userData.role === "professor" &&
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
                  
                        <FileUploadButton action={"profilepic"} loggedUserRole={userData.userData.role} />
                        <StyledButton>Salvar</StyledButton>
                        <StyledButton onClick={handleClick}>
                            <BsWhatsapp />
                            Convidar pelo WhatsApp
                        </StyledButton>
                    </ButtonWapper>
                </ContentWrapper>
            </>
        )
    }

    const handleClick = () => {
        const whatsappLink =
            'whatsapp://send?text=Agende%20suas%20salas%20de%20aula%20e%20laborat%C3%B3rios%20de%20forma%20simples%20e%20eficiente%20com%20o%20Gerenciamento%20de%20Salas!%20%F0%9F%94%8D%F0%9F%92%A8%0AAcesse%20agora:%20gerenciamentodesalas.cloud%20%F0%9F%96%A5%F0%9F%94%92%0AFacilite%20sua%20vida%20acad%C3%AAmica!%20%F0%9F%93%9A%20%23FATEC';

        window.location.href = whatsappLink;
    };

    return (
        <Container>
            <Helmet>
                <title>SGSA - Perfil</title>
            </Helmet>
            <ToastContainer />
            {/* <ModalEdit isVisible={editingModal} onClose={handleCloseModalEdit} initialData={editedData} daysIds={[1,2,3,4]}/> */}
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
                {
                    isLoading ?
                        renderContent()
                        :
                        (<PacmanLoader />)
                }
            </Wrapper>
        </Container>
    );
}

export default Perfil;