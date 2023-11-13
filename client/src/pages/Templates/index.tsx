import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';

import { Helmet } from 'react-helmet'

import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';
const apiUrl = String(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL);

const templateFileName = 'TEMPLATE_BASE_DADOS1.2.xlsx';
const templateFileUrl = apiUrl + '/template/download/';

import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

//PARTICLES IMPORTS
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Theme, type Container, type Engine } from "tsparticles-engine";

import templateImage from '../../../public/images/template.png';

import PacmanLoader from 'react-spinners/PacmanLoader';

import {
    Header, Separator,
    TableSelector, Wrapper, CounterWrapper, EditButton, DeleteButton, ButtonsWrapper, TableHeader, Table, TableData, TableBody, TableRow, CenteredNumber, TableContainer, NowrapText, MainContainer, TemplateImage, PageTitle, ButtonWrapper, ContainerElement, StyledButton, FilterWrapper
} from './Templates.styles';

import { toast, ToastContainer } from 'react-toastify';

import ModalAgendamento from '../Components/ModalAgendamento';
import NewCourseModal from '../Components/NewCourseModal'
import FileUploadButton from '../Components/FileUploadButton';
import FileDownloadButton from '../Components/FileDownloadButton';
import { CenteredTableData, FilterIcon, TableRowHeader, TableWrapper } from '../Gerenciamento/Perfil.styles';
import { AiFillEdit, AiOutlineDownload, AiOutlineUpload } from 'react-icons/ai';
import Swal from 'sweetalert2';

const Templates: any = ({ theme }: any): any => {

    //PARTICLES FUNCTIONS
    const particlesInit = useCallback(async (engine: Engine) => {
        console.log(engine);

        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        await console.log(container);
    }, []);

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


    const [userFetchedData, setUserFetchedData] = React.useState<UserData[]>([])
    const [appointmentData, setAppointmentData] = React.useState<AppointmentData[]>([])
    const [alunosData, setAlunosData] = React.useState<any>([])
    const [professoresData, setProfessoresData] = React.useState<any>([])

    const [editingModal, setEditingModal] = React.useState(false)
    const [deleteModal, setDeleteModal] = React.useState(false)

    const [isLoading, setIsLoading] = React.useState(false);
    const [Error, setError] = React.useState(true);

    const [selectedCategory, setSelectedCategory] = useState('Alunos');

    const [agendamentoId, setAgendamentoId] = useState<Number>(2);
    const [editedData, setEditedData] = useState<any>({});

    const [coursesData, setCoursesData] = useState<any>([]);
    const [laboratoriosData, setLaboratoriosData] = useState<any>([]);

    const [selectedTable, setSelectedTable] = useState<String>('cursos');

    const [modalNewCourseIsVisible, setModalNewCourseIsVisible] = useState(false);

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
                console.log('userDataJson: ' + JSON.stringify(userDataJson, null, 2));
                fetchData();
                setUserData(userDataJson);
            }
        }
    }, [userData]);


    useEffect(() => {
        fetchData();
    }, [modalNewCourseIsVisible]);

    async function fetchData() {
        // setIsLoading(false);
        try {
            const [
                appointmentDataResponse,
                userDataResponse,
                alunosDataResponse,
                professoresDataResponse,
                coursesDataResponse,
                laboratoriosDataResponse
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
                fetch(`${apiUrl}/course`, {
                    method: 'post',
                }).then(res => res.json()),
                fetch(`${apiUrl}/laboratory`, {
                    method: 'post',
                }).then(res => res.json())
            ]);

            setUserFetchedData(userDataResponse);
            setAppointmentData(appointmentDataResponse);
            setAlunosData(alunosDataResponse);
            setLaboratoriosData(laboratoriosDataResponse.reverse());

            const ProfessorWithOutFirstElement = professoresDataResponse.slice(1);

            setProfessoresData(ProfessorWithOutFirstElement);

            setCoursesData(coursesDataResponse);

            setTimeout(() => {
                setIsLoading(true);
            }, 0);

        } catch (error) {
            console.error(error);
            toast.error('Erro ao carregar dados da tabela. Tente novamente mais tarde.')
            setError(true);
        }
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


    // "id":1,"email":"isaac@gmail.com","password":"$2b$08$ehGz3Y/Tz24MkwvKuj9tz.Nry5TfJgbB22CHf85xeNPXYAPt5/16e","role":"professor","created_at":"2023-04-26T22:29:28.728Z","updated_at":"2023-04-26T22:29:28.728Z"}

    interface UserData {
        id: number
        name: string
        email: string
        role: string
        created_at: string
        updated_at: string
    }


    interface CourseData {
        id: number,
        course_name: string,

    }

    interface LaboratoryData {
        id: number,
        descricao: string,
        capacidade: number,
        andar: number,
        numero_sala: number,
    }

    interface DataProps {
        id: number,
        course_name: string,
    }


    const handleDelete = (type: string, deleteData: any) => {
        Swal.fire({
            title: 'Você tem certeza?',
            text: "Você não poderá reverter essa ação!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: theme.mainpurple,
            confirmButtonText: 'Sim, deletar curso!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteConfirmed(type, deleteData);
            }
        })
    }

    const handleDeleteConfirmed = async (type: string, data: DataProps) => {
        console.log('handleDeleteCourse');
        fetch(`${apiUrl}/${type}/delete`, {
            method: 'post',
            body: JSON.stringify({ id: data.id })
        }).then(res => res.json()).then(res => {
            console.log(res);
            toast.success('Curso deletado com sucesso!');
        }).catch(err => {
            console.error(err);
            toast.error('Erro ao deletar curso. Tente novamente mais tarde.')
        });
        fetchData();
    }

    const handleDownloadCourseCurrentTemplate = (courseId: number) => {
        console.log('handleDownloadCourseCurrentTemplate');
        window.open(`${apiUrl}/template/download/${courseId}`);
    }

    const CoursesTable = ({ data }: any) => {
        return (
            <TableWrapper>
                <Table>
                    <TableHeader>
                        <TableRowHeader>
                            <th>ID</th>
                            <th>NOME</th>
                            <th>SEMESTRES</th>
                            <th>PERIODO</th>
                            <th>ACTIONS</th>
                            {/* <th>Criado</th>
                            <th>Atualizado</th> */}
                        </TableRowHeader>
                    </TableHeader>
                    <TableBody>
                        {coursesData.map((course: CourseData) => (
                            <tr key={course.id}>
                                <CenteredTableData>{course.id}</CenteredTableData>
                                <NowrapText>{course.course_name}</NowrapText>
                                <CenteredTableData>{6}</CenteredTableData>
                                <CenteredTableData>NETURNO</CenteredTableData>
                                <CenteredTableData>
                                    <ButtonsWrapper>
                                        <EditButton type="button" ><AiFillEdit />
                                            <p>
                                                Edit
                                            </p>
                                        </EditButton>
                                        <EditButton type="button" onClick={() => handleDownloadCourseCurrentTemplate(course.id)}><AiOutlineDownload size={20}
                                        />
                                            <p>
                                                Download
                                            </p>
                                        </EditButton>
                                        <FileUploadButton action={""} course={course.id} loggedUserRole={userData.userData.role} uploadText='Upload Template' />
                                        <DeleteButton type="button" onClick={() => handleDelete("course", course)} ><RiDeleteBinLine />
                                            <p>
                                                Excluir
                                            </p>
                                        </DeleteButton>
                                    </ButtonsWrapper>
                                </CenteredTableData>
                                {/* <CenteredTableData>{formatDistanceToNow(new Date(user.created_at), { locale: ptBR })} atrás</CenteredTableData>
                                <CenteredTableData>{formatDistanceToNow(new Date(user.updated_at), { locale: ptBR })} atrás</CenteredTableData> */}
                            </tr>
                        ))}
                    </TableBody>
                </Table>
            </TableWrapper>
        )
    }

    const LabsTable = ({ data }: any) => {
        return (
            <TableWrapper>
                <Table>
                    <TableHeader>
                        <TableRowHeader>
                            <th>ID</th>
                            <th>LABORATORIO</th>
                            <th>ANDAR</th>
                            <th>CAPACIDADE</th>
                            <th>NUMERO SALA</th>
                            <th>ACTIONS</th>
                            {/* <th>Criado</th>
                            <th>Atualizado</th> */}
                        </TableRowHeader>
                    </TableHeader>
                    <TableBody>
                        {laboratoriosData.map((laboratorio: LaboratoryData) => (
                            <tr key={laboratorio.id}>
                                <CenteredTableData>{laboratorio.id}</CenteredTableData>
                                <CenteredTableData>{laboratorio.descricao}</CenteredTableData>
                                <CenteredTableData>{laboratorio.andar}º</CenteredTableData>
                                <CenteredTableData>{laboratorio.capacidade} Alunos</CenteredTableData>
                                <CenteredTableData>{laboratorio.numero_sala}</CenteredTableData>
                                <CenteredTableData>
                                    <ButtonsWrapper>
                                        <EditButton type="button" >
                                            <AiFillEdit />
                                            <p>
                                                Edit
                                            </p>
                                        </EditButton>
                                        <FileUploadButton action={""} course={laboratorio.id} loggedUserRole={userData.userData.role} uploadText='Upload Picture' />
                                        <DeleteButton type="button" onClick={() => handleDelete("laboratorio", laboratorio)} ><RiDeleteBinLine />
                                            <p>
                                                Excluir
                                            </p>
                                        </DeleteButton>
                                    </ButtonsWrapper>
                                </CenteredTableData>
                                {/* <CenteredTableData>{formatDistanceToNow(new Date(user.created_at), { locale: ptBR })} atrás</CenteredTableData>
                                <CenteredTableData>{formatDistanceToNow(new Date(user.updated_at), { locale: ptBR })} atrás</CenteredTableData> */}
                            </tr>
                        ))}
                    </TableBody>
                </Table>
            </TableWrapper>
        )
    }

    const handleCreateNewCourse = () => {
        console.log('handleCreateNewCourse');

        setModalNewCourseIsVisible(!modalNewCourseIsVisible);
        const [shouldFetchData, setShouldFetchData] = useState(false);
    }

    return (<>
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
        <NewCourseModal isVisible={modalNewCourseIsVisible} onClose={handleCreateNewCourse} />
        <ContainerElement>
            <Helmet>
                <title>SGSA - Templates</title>
            </Helmet>
            <ToastContainer />
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
                <PageTitle>Templates</PageTitle>
                {/* <TemplateImage src={templateImage} /> */}
                <FilterWrapper>
                    <FilterIcon
                        size={20}
                    />
                    <select name="table" id="table" onChange={(e) => setSelectedTable(e.target.value)}>
                        <option value="cursos">Cursos</option>
                        <option value="laboratorios">Laboratórios</option>
                    </select>
                </FilterWrapper>
                {selectedTable == 'cursos' ?
                    <CoursesTable /> :
                    <LabsTable />
                }
                <ButtonWrapper>
                    <StyledButton onClick={handleCreateNewCourse}>"CRIAR NOVO CURSO"</StyledButton>
                    <FileDownloadButton buttonText={"Download Template Vazio"} fileName={templateFileName} fileUrl={templateFileUrl} />
                </ButtonWrapper>
                {
                    // isLoading ?
                    //     renderTable()
                    //     :
                    //     (<PacmanLoader />)
                }
            </Wrapper>
        </ContainerElement>
    </>
    );
}

export default Templates;