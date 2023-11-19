import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';

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

import {
    Avatar,
    Header, Separator,
    SearchBar,
    TableSelector,
    Wrapper, UserName,
    CounterWrapper,
    EditButton,
    DeleteButton,
    ButtonsWrapper,
    TableHeader,
    Table,
    TableData,
    TableBody,
    TableRow,
    CenteredNumber,
    TableContainer,
    NowrapText,
    StyledButton,
    ContentWrapper,
    ButtonWrapper,
    InputWrapper,
    StyledSelect,
    StyledButtonWhatsApp,
    UserWrapper,
    UserInfo,
    ContainerElement,
    UserRowWrapper
} from './Perfil.styles';

import { toast, ToastContainer } from 'react-toastify';

import avatar from '../../../public/images/avatar.png';

import ModalAgendamento from '../Components/ModalAgendamento';
import NewCourseModal from '../Components/ModalDelete'
import FileUploadButton from '../Components/FileUploadButton';
import FileDownloadButton from '../Components/FileDownloadButton';
import { BsWhatsapp } from 'react-icons/bs';
import { AvatarWrapper, } from '../Navbar/Navbar.styles';
import Swal from 'sweetalert2';
import { AiOutlineSave } from 'react-icons/ai';
import Multiselect from 'react-widgets/esm/Multiselect';
import ParticlesComponent from '../Components/ParticlesComponent';
import { DetailsText } from '../Components/ModalAgendamento/ModalEdit.styles';
import { FaInfoCircle, FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Perfil: any = ({ theme }: any): any => {

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

    //  
    const [disciplina, setDisciplina] = useState("");

    const [editingModal, setEditingModal] = React.useState(false)
    const [deleteModal, setDeleteModal] = React.useState(false)

    const [isLoading, setIsLoading] = React.useState(false);
    const [Error, setError] = React.useState(true);

    const [selectedTable, setSelectedTable] = useState('agendamentos');
    const [selectedCategory, setSelectedCategory] = useState('Alunos');

    const [agendamentoId, setAgendamentoId] = useState<Number>(2);
    const [editedData, setEditedData] = useState<any>({});

    const [userImage, setUserImage] = useState<any>(null);

    //MULTISELECT OPTIONS
    const [selectedValues, setSelectedValues] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);

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
                setSemestre(userDataJson.userData.semestre);
                // setDisciplina(userDataJson.userData.disciplina);
                fetchUserImage(userDataJson.userData.userId);

            }
        }

        const disciplinasFromToken = userData.userData.disciplina;

        if (disciplinasFromToken && disciplinas && disciplinas.length > 0) {
            console.log(disciplinasFromToken);
            console.log(disciplinas);

            let finalDisciplinasArray: any = [];

            // Use map instead of forEach for creating an array
            const multiSelectDefaultValues = disciplinasFromToken.map((element: any) => {
                // Use find to search for a matching element in disciplinas
                const disciplinaEncontrada = disciplinas.find((disciplinaItem: any) => {
                    return disciplinaItem.id === element;
                });

                // If disciplinaEncontrada is found, add it to finalDisciplinasArray
                if (disciplinaEncontrada) {
                    finalDisciplinasArray.push(disciplinaEncontrada);
                }

                // Return disciplinaEncontrada for multiSelectDefaultValues
                return disciplinaEncontrada;
            });

            console.log(multiSelectDefaultValues);

            // Assuming setSelectedValues is a function that sets state
            setSelectedValues(finalDisciplinasArray);
        }

    }, [userData, disciplinas]);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchUserImage = async (userId: any) => {
        try {
            const response = await fetch("http://localhost:8080" + `/usuarios/12`);
            if (response.ok) {
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                setUserImage(imageUrl);
            } else {
                console.error('Failed to fetch user image');
            }
        } catch (error) {
            console.error('Error fetching user image:', error);
        }
    };

    async function fetchData() {
        setIsLoading(false);
        try {
            const [
                appointmentDataResponse,
                userDataResponse,
                alunosDataResponse,
                professoresDataResponse,
                disciplinasDataResponse
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
                }).then(res => res.json()),
                fetch(`${apiUrl}/disciplinas`, {
                    method: 'post',
                }).then(res => res.json())
            ]);

            setFetchedUserData(userDataResponse);
            setAppointmentData(appointmentDataResponse);
            setAlunosData(alunosDataResponse);

            console.log(disciplinasDataResponse)

            let transformedDisciplinas: any = []

            disciplinasDataResponse.forEach((disciplina: any) => {
                if (disciplina.id !== 1)
                    transformedDisciplinas.push({
                        id: disciplina.id,
                        disciplina: disciplina.descricao
                    })
            })

            console.log(transformedDisciplinas)

            setDisciplinas(transformedDisciplinas)

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

    async function handleEdit() {

        //swal to ask user if he wants to edit the user

        Swal.fire({

            title: 'Você tem certeza?',
            text: "Deseja mesmo editar o usuário?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',

            confirmButtonText: 'Sim, editar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                editUserData();
            }
        }
        )


        //grab parameters and send to post /user/edit




        async function editUserData() {

            console.log(semestre)

            const params = {
                email: userData.userData.email,
                role: userData.userData.role,
                semester: semestre,
                disciplina: selectedValues
            }

            console.log(params)

            const response = await fetch(`${apiUrl}/usuarios/edit`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    params
                )
            }).then(res => res.json()).then(responseObject => {
                console.log(responseObject)
                if (responseObject.error) {
                    Swal.fire(
                        'Erro!',
                        'Ocorreu um erro ao editar o usuário.',
                        'error'
                    )
                }
                else
                    if (responseObject.message = 'User updated') {
                        updateToken();
                        Swal.fire(
                            'Editado!',
                            'Os dados foram editados com sucesso!',
                            'success'
                        )
                    }


            }
            ).catch(err => console.log(err))

            return response;

        }

        async function updateToken() {

            const token = localStorage.getItem('gerenciamento-de-salas@v1.2')

            const userData = JSON.parse(token || '{}');

            let newToken = {};

            if (userData.userData.role == 'aluno') {

                newToken = {
                    ...userData,
                    userData: {
                        ...userData.userData,
                        semestre: semestre,
                        disciplina: disciplina
                    }
                }
            }
            if (userData.userData.role == 'guest') {

                newToken = {
                    ...userData,
                    userData: {
                        ...userData.userData,
                        semestre: semestre,
                        disciplina: disciplina
                    }
                }
            }

            //             coordenador
            // : 
            // false
            // created_at
            // : 
            // "2023-09-03T20:15:29.554Z"
            // disciplina
            // : 
            // [4, 7]
            // email
            // : 
            // "professor1@gmail.com"
            // id
            // : 
            // 22
            // name
            // : 
            // "professor1"
            // nomeDisciplina
            // : 
            // ["Arquitetura e Organização de Computadores", "Comunicação e Expressão"]
            // professor_id
            // : 
            // 22
            // role
            // : 
            // "professor"
            else if (userData.userData.role == 'professor') {

                const newDisciplinasArray = selectedValues.map((disciplina: any) => disciplina.id)

                const newDisciplinasNames = selectedValues.map((disciplina: any) => disciplina.disciplina)

                newToken = {
                    ...userData,
                    userData: {
                        ...userData.userData,
                        disciplina: newDisciplinasArray,
                        nomeDisciplina: newDisciplinasNames
                    }
                }
            }

            localStorage.setItem('gerenciamento-de-salas@v1.2', JSON.stringify(newToken));
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
                    <UserRowWrapper>
                        
                        <DetailsText>
                            Name:
                        </DetailsText>
                        <UserName>{userData.userData.name || "Sem Nome"}</UserName>
                    </UserRowWrapper>
                    <Avatar src={userImage} />
                    <UserWrapper>

                        <UserRowWrapper>
                        <FaInfoCircle color={theme.mainpurple} size={25}/>
                            <DetailsText>
                                Info:
                            </DetailsText>
                            <UserInfo>{userData.userData.role == "aluno" ? `${userData.userData.semestre}º ADS` : userData.userData.role == "professor" ? "professor" : "guest"}</UserInfo>
                        </UserRowWrapper>
                        <UserRowWrapper>
                            <DetailsText>
                            <FaUser color={theme.mainpurple} size={25}/> Role:
                            </DetailsText>
                            <UserInfo>{userData.userData.role}</UserInfo>
                        </UserRowWrapper>
                        <UserRowWrapper>
                        <MdEmail color={theme.mainpurple} size={25}/>
                            <DetailsText>
                                Email:
                            </DetailsText>
                            <UserInfo>{userData.userData.email}</UserInfo>
                        </UserRowWrapper>
                    </UserWrapper>
                    <ButtonWrapper>
                        {
                            (userData.userData.role === "aluno" || userData.userData.role === "guest") &&
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
                            <>
                                {/* <InputWrapper>
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
                            </InputWrapper> */}
                                <InputWrapper>
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
                        <FileUploadButton userId={userData.userData.user_id} action={"profilepic"} loggedUserRole={userData.userData.role} />
                        <StyledButton
                            onClick={handleEdit}
                        >

                            <AiOutlineSave
                                size={25}
                            />

                            Salvar
                        </StyledButton>
                        <StyledButtonWhatsApp onClick={handleClick}>
                            <BsWhatsapp
                                size={25}
                            />
                            Convidar pelo WhatsApp
                        </StyledButtonWhatsApp>
                    </ButtonWrapper>
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
        <>
            <ParticlesComponent theme={theme} />
            <ToastContainer />
            <Helmet>
                <title>SGSA - Perfil</title>
            </Helmet>
            <ContainerElement>
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
                    </Header>
                    {
                        isLoading ?
                            renderContent()
                            :
                            (<PacmanLoader />)
                    }
                </Wrapper>
            </ContainerElement>
        </>
    );
}

export default Perfil;