import React, { useEffect, useState } from 'react';

import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';
const apiUrl = 'http://localhost:3333';

const templateFileName = 'TEMPLATE_BASE_DADOS1.2.xlsx';
const templateFileUrl = 'http://localhost:3333/template/download/';

import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import templateImage from '../../../public/images/template.png';

import PacmanLoader from 'react-spinners/PacmanLoader';

import {
    Container, Header, Separator,
    SearchBar, TableSelector, Wrapper, CounterWrapper, EditButton, DeleteButton, ButtonsWrapper, TableHeader, Table, TableData, TableBody, TableRow, CenteredNumber, TableContainer, NowrapText, MainContainer, TemplateImage
} from './Templates.styles';

import { toast, ToastContainer } from 'react-toastify';

import ModalEdit from '../Components/ModalEdit';
import ModalDelete from '../Components/ModalDelete'
import FileUploadButton from '../Components/FileUploadButton/inde';
import FileDownloadButton from '../Components/FileDownloadButton/inde';

function Templates() {

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


    return (
        <Container>
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
                <h1>Templates</h1>
                <TemplateImage src={templateImage} />
                <MainContainer>
                    <FileDownloadButton buttonText={"Download Template Vazio"} fileName={templateFileName} fileUrl={templateFileUrl} />
                    <FileDownloadButton buttonText={"Download Template Atualizado"} fileName={templateFileName} fileUrl={templateFileUrl} />
                    <FileUploadButton />
                </MainContainer>
                {
                    // isLoading ?
                    //     renderTable()
                    //     :
                    //     (<PacmanLoader />)
                }
            </Wrapper>
        </Container>
    );
}

export default Templates;