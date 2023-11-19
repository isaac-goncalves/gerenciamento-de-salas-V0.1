import React, { useEffect, useLayoutEffect, useState } from 'react'

import { Helmet } from 'react-helmet';

import './ButtonAnimation.scss'; // Import your SCSS file

const apiUrl = String(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL);

console.log(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL);

import PacmanLoader from 'react-spinners/PacmanLoader';

import { Colors } from '../../colors';

import { toast, ToastContainer } from 'react-toastify';

import { startOfWeek, endOfWeek, setDay, addDays, subWeeks, addWeeks, set } from 'date-fns';

import 'react-toastify/dist/ReactToastify.css';

import { AiFillHeart, AiOutlinePlusCircle, AiOutlineUserDelete } from 'react-icons/ai';

import { MainContainer, Header, CourseName, ClassesContainer, ClockContainer, WeekdayContainer, SchedulesContainer, Schedule, WeekContainer, CourseSemester, DateIcon, CoursesWrapper, DatePickWrapper, DatepickContainer, Sala, Disciplina, Professor, SalaAgendada, SalaWrapper, DatepickArrowsContainer, CalendarWrapper, StyledDatePicker, WeekDay, FilterWrapper, StyledSelect, Semestre, SemestreSalaWrapper, PageName, CurrentMonth, PularParaHojeText, ButtonConfimarAgendamento, FilterIconWrapper, CalltoActionButton, StyledImageButton, PacmanLoaderWrapper, TodayContainer, LeftArrow, RightArrow, DownArrow, FilterIcon, StyledSelectValue, StyledContextMenu, Disciplina2, Sala2, CurrentMonthText, SchedulesWrapper } from '../Dashboard/Dashboard.styles'

import ModalAgendamento from '../Components/ModalAgendamento';

import { MdKeyboardArrowRight, MdKeyboardDoubleArrowRight, MdOutlineModeEdit, MdOutlineModeEditOutline, MdSubdirectoryArrowRight, MdToday } from 'react-icons/md';
import { FiFilter } from 'react-icons/fi';

import dateIcon from '../../../public/images/dia_de_hoje.png';
import arrowLeft from '../../../public/images/pickDateicons/arrow_left.svg';
import arrowRight from '../../../public/images/pickDateicons/arrow_right.svg';
import arrowDown from '../../../public/images/pickDateicons/arrow_down.svg';
import { StyledButton } from '../Perfil/Perfil.styles';
import { FaFilter } from 'react-icons/fa';
import { on } from 'events';
import { GiCancel } from 'react-icons/gi';
import Swal from 'sweetalert2';
import ParticlesComponent from '../Components/ParticlesComponent';

interface ScheduleItem {
  id: number;
  horario_inicio: string;
  horario_fim: string;
  professor: string;
  dia_da_semana: string;
  disciplina: string;
  sala: string;
  semestre: string;
  created_at: string;
  updated_at: string;
}

interface ProfessoreProps {
  id: number;
  name: string;
}

interface IntervalItem {
  semestre: string;
  disciplina: string;
}

interface Professor {
  id: number;
  name: string;
}

type GroupedData = {
  [key: string]: Array<ScheduleItem | IntervalItem>;
}

export var themetest = null;

function groupByWeekday(data: ScheduleItem[]): GroupedData {
  const daysOfWeek = ["segunda", "terca", "quarta", "quinta", "sexta"];
  const totalItemsPerDay = 6;

  // Initialize groupedData with each day of the week and an empty array
  const groupedData: GroupedData = {
    segunda: [],
    terca: [],
    quarta: [],
    quinta: [],
    sexta: [],
  };

  for (const item of data) {
    const dayIndex = parseInt(item.dia_da_semana) - 1;
    const day = daysOfWeek[dayIndex];

    groupedData[day].push(item);
  }

  for (const day in groupedData) {
    const currentDayLength = groupedData[day].length;

    // Add "Nenhuma Aula" for remaining slots, except after the interval
    for (let i = currentDayLength; i < totalItemsPerDay - 1; i++) {
      groupedData[day].push({
        disciplina: "Nenhuma Aula",
        semestre: ''
      });
    }

    // Add interval as the third item
    groupedData[day].splice(2, 0, {
      disciplina: "Intervalo",
      semestre: ''
    });
  }
  return groupedData;
}
//COMPONENTS -------------------------------------------------------------------------
const Laboratorio: any = ({ theme, themeName }: any) => {
  const [loading, setLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  //STORE FETCHED DATA
  const [grade, setgrade] = useState<any>();
  const [professores, setProfessores] = useState<ProfessoreProps[]>([
    {
      id: 0,
      name: "Selecione um professor",
    },
  ]);
  const [laboratoryData, setlaboratoryData] = useState<any>([]);

  //MODALPROPS
  const [userIsScheduling, setUserIsScheduling] = useState<boolean>(false);
  const [editedData, setEditedData] = useState<any>({});
  const [daysIds, setDaysIds] = useState<any>([]);
  const [schedulingModalIsVisible, setSchedulingModalIsVisible] = React.useState(false)

  //STORE CONTEXT MENU 
  const [isContextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [contextMenuData, setContextMenuData] = useState<any>({});
  const [dayDateObjectFromClick, setDayDateObjectFromClick] = useState<any>({});

  //CONTEXTMENU FUNCTIONS
  const handleContextMenu = (e: any, item: any, dayDateObject: Date) => {
    e.preventDefault();

    console.log("Clicked")
    console.log(item)

    setContextMenuData(item)
    setDayDateObjectFromClick(dayDateObject)

    setContextMenuPosition(
      { top: e.clientY, left: e.clientX });
    setContextMenuVisible(true);
  };

  const closeContextMenu = (schedule_status: string) => {
    console.log("Iran")

    console.log(contextMenuData)

    const newAgedamentoData = {
      schedule_status: schedule_status,
      date: dayDateObjectFromClick?.toISOString(),
      uuid_agendamento: contextMenuData.agendamentos[0].uuid_agendamento,
      id_professor: contextMenuData.agendamentos[0].id_professor,
      id_grade: contextMenuData.agendamentos[0].id_grade,
      id_laboratorio: contextMenuData.agendamentos[0].numero_sala,
    }

    //cancelar para esse id o laboratorio desse dia
    console.log("Opening modal as: " + schedule_status)
    console.log(newAgedamentoData)

    Swal.fire({

      title: 'Você tem certeza?',
      text: "Esta ação sera executada somente no dia selecionado! " + dayDateObjectFromClick?.toISOString(),
      icon: 'warning',
      showCancelButton: true,

      confirmButtonText: `Sim, ${schedule_status == 'default' ? "cancelar reserva de laboratório" : 'reportar falta do professor!'}!`,
      cancelButtonText: 'Não, cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        cancelAgendamentoRequest(newAgedamentoData)
      }

    })

    // openEditModal(newAgedamentoData, daysIds)
    setContextMenuVisible(false);
  };

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

  //STORE FILTER DATA
  const [selectedMethod, setSelectedMethod] = useState("laboratorio");
  const [selectedSemesterValue, setSelectedSemesterValue] = useState(1)
  const [selectedProfessor, setSelectedProfessor] = useState<Professor>(
    {
      id: 0,
      name: "Selecione um professor",
    },);
  const [selectedLaboratorio, setSelectedLaboratorio] = useState<any>(
    {
      id: 0,
      descricao: "Selecione um laboratorio",
      numero_sala: 0,
    }
  )

  //WEIRD DATE STUFF
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [currentDay, setCurrentDay] = useState('');

  // set to nearest Monday
  const [startDate, setStartDate] = useState<Date | null>(setDay(new Date(), 1));
  // set to nearest Friday
  const [endDate, setEndDate] = useState<Date | null>(setDay(new Date(), 5));

  //USE EFFECTS -------------------------------------------------------------------------
  useLayoutEffect(() => {
    console.log('Starting to render stuff...');
    themetest = theme;

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
        setSelectedSemesterValue(userDataJson.userData.semestre);

      }
    }
  }, [userData]);

  useEffect(() => {
    console.log('Starting to render stuff...');
    console.log(startDate)

    if (userData.token !== '' && userData.userData.id !== 0) {
      console.log("Usuário logado!")
      console.log("selectedMethod")
      console.log(selectedMethod)
      if (selectedMethod == "professor") {
        fetchProfessorData();
      }
      else if (selectedMethod == "semestre") {
        // fetchSemestreData();
      } else if (selectedMethod == "laboratorio") {
        fetchLaboratoryAgendamentosData()
      }
      fetchProfessors(userData.token);
      fetchLaboratoryData();
    }
    else {
      console.log("Usuário nao esta logado!")
    }

  }, [selectedSemesterValue, selectedLaboratorio, selectedProfessor, selectedMethod, selectedDate, startDate]);

  //FUNCTIONS ---------------------------------------------------------------------

  function handleScheduleClick(dayData: any, item: any, dayDateObject: Date) {
    // console.clear()

    if(userData.userData.role == "guest"){
      toast.info('Você precisa estar logado para agendar!', {
        theme: "dark"
      });
      return
    }

    if(userData.userData.role == "aluno"){
      toast.info('Você precisa estar logado como professor para agendar!', {
        theme: "dark"
      });
      return
    }

    console.log("Clicked")

    const daysIds: any = []

    dayData.forEach((item: any) => {
      item.id ? daysIds.push(item.id) : null
    })

    console.log(daysIds)
    console.log(dayDateObject?.toISOString())

    if (item.agendamentos && item.agendamentos.length > 0) {
      console.log(item.agendamentos.length)

      // console.log("Agendamento exist and the item is") 
      console.log(JSON.stringify(item.agendamentos[0], null, 2))
      console.log("agendamento exist")

      openEditModal(item.agendamentos[0], daysIds)
    }
    else if (selectedMethod == "laboratorio") { //caso o usuario esteja no modo de laboratorio

      console.log("selectedMethod == laboratorio")
      console.log("Agora devo abrir a modal de agendamento em uma nova forma que ira agendar uma reserva de horario para o laboratorio em questão")

      const newAgedamentoData = {
        date: dayDateObject?.toISOString(),
        uuid_agendamento: "-",
        type: "SCHEDULELABORATORIO",
        // id_professor: userData.userData.professor_id,
        numero_sala: selectedLaboratorio.numero_sala,
        updated_at: new Date()?.toISOString(),
        created_at: new Date()?.toISOString()
      }

      openEditModal(newAgedamentoData, daysIds)

    }
    // else {

    //   const newAgedamentoData = {
    //     date: dayDateObject?.toISOString(),
    //     uuid_agendamento: "-",
    //     id_professor: userData.userData.professor_id,
    //     numero_salas: selectedLaboratorio.numero_sala,
    //     updated_at: new Date()?.toISOString(),
    //     created_at: new Date()?.toISOString()
    //   }

    //   //ABRE MODAL DE NOVO AGENDAMNTO CASO USUARIO ESTEJA NO MODO DE CRIAÇÂO 
    //   userIsScheduling
    //     ?
    //     openEditModal(newAgedamentoData, daysIds)
    //     :
    //     console.log("Is not agendating")
    // }
  }

  function getProfessorName(professor_id: number) {

    if (professor_id) {
      const professorObject = professores.filter((item: any) => {
        if (item.id == professor_id) {
          return item
        }
      })

      return professorObject[0].name || "Nenhum professor"
    }
    else {
      return ""
    }

  }

  function areDatesOnSameDayMonthYear(date1: Date, date2: Date) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  //RENDER FUNCTIONS
  const renderWeekday = (dayName: string, dayData: any) => {
    const getDayBasedOnWeekdayObj = getDayBasedOnWeekday(dayName, startDate)

    // const [currentWeekDay, dayDateObject] = getDayBasedOnWeekday(dayName, startDate)
    const currentWeekDay = getDayBasedOnWeekdayObj.currentWeekDay
    const dayDateObject = getDayBasedOnWeekdayObj.dayDateObject

    // console.log("currentWeekday")
    // console.log(dayDateObject)

    return (
      <WeekdayContainer>
        <WeekDay>{currentWeekDay}</WeekDay>
        <SchedulesContainer>
          <h2>{dayName}</h2>
          {
            dayData.map((item: any) => {
              const {
                disciplina,
                id_professor,
                laboratorio,
                agendamentos,
                semestre,
              } = item;
              // console.log(item.agendamentos)
              //compare if is on the same day and month

              const agendamentoCancelExist = agendamentos ? agendamentos.some((item: any) => {
                return item.schedule_status == "cancel"
                  && areDatesOnSameDayMonthYear(new Date(item.date), dayDateObject)
              }) : false

              const agendamentoDefaultExist = agendamentos ? agendamentos.some((item: any) => {

                // console.log(new Date(item.date))
                return item.schedule_status == "default"
                  && areDatesOnSameDayMonthYear(new Date(item.date), dayDateObject)
              }) : false

              const agendamento = agendamentos && agendamentos.length > 0 ? agendamentos[0] : null;
              //IMPLEMENTAR LOGICA DE AGENDAMENTO VENCEDOR AQUI

              const isCurrentTime = false
              //
              // isWithinClassTime(item.horario_inicio, item.horario_fim);

              // console.log(agendamento)
              // console.log(currentTime)

              function abbreviateCourseName(courseName: string) {
                // Split the course name into words

                if (courseName == "Nenhuma Aula" || courseName == "Intervalo" || courseName == "") {
                  return ""
                }

                // Use a regular expression to find uppercase letters
                const uppercaseLetters = courseName.match(/[A-Z]/g);

                // Check if there are any uppercase letters
                if (uppercaseLetters) {
                  // Join the uppercase letters to form the abbreviation
                  const abbreviation = uppercaseLetters.join('');
                  return abbreviation;
                } else {
                  return "null"; // No uppercase letters found
                }
              }

              return (
                <>
                  <Schedule onContextMenu={(e) => handleContextMenu(e, item, dayDateObject)} 
                  onClick={
                    () =>  handleScheduleClick(dayData, item, dayDateObject)
                  } 
                    className={isCurrentTime ? '' : 'hoverEffect'}>
                      <SchedulesWrapper>
                    <Professor agendamentoCancelExist={agendamentoCancelExist}>{getProfessorName(id_professor || 0)}</Professor>
                    <Disciplina2>{disciplina}</Disciplina2>
                    <Sala2>{agendamentoCancelExist ? "Aula cancelada" : null}</Sala2>
                    <Disciplina2>{abbreviateCourseName(item.course_name || "")}</Disciplina2>
                      </SchedulesWrapper>
                    {
                      !(disciplina == "Nenhuma Aula" || disciplina == "Intervalo") ?
                        selectedMethod === 'professor' ?
                          <SemestreSalaWrapper>
                            <Semestre>{semestre}º Semestre</Semestre>
                            <SalaWrapper>
                              <Sala agendamento={agendamento}>{laboratorio}</Sala>
                              {agendamento && agendamento.laboratorio && (
                                <>
                                  <MdKeyboardDoubleArrowRight />
                                  <SalaAgendada>{agendamento.laboratorio}</SalaAgendada>
                                </>
                              )}
                            </SalaWrapper>
                          </SemestreSalaWrapper>
                          :
                          selectedMethod === 'semestre' ?
                            <SalaWrapper>
                              <Sala agendamento={agendamento}>{laboratorio}</Sala>
                              {agendamento && agendamento.laboratorio && (
                                <>
                                  <MdKeyboardDoubleArrowRight />
                                  <SalaAgendada>{agendamento.laboratorio}</SalaAgendada>
                                </>
                              )}
                            </SalaWrapper>
                            : selectedMethod === 'laboratorio' ?
                              <SemestreSalaWrapper>
                                <Semestre>{semestre}º Semestre</Semestre>
                                <SalaWrapper>
                                  <div>{agendamento ? agendamento.capacidade + " Alunos" : ""}</div>
                                </SalaWrapper>
                                {agendamentoDefaultExist ? "Laboratorio Cancelado" : null}
                              </SemestreSalaWrapper>
                              : null
                        :
                        null
                    }
                  </Schedule>
                </>
              );
            })}
        </SchedulesContainer>
      </WeekdayContainer>
    )
  };

  const renderLoading = () => {
    return (
      <WeekContainer>
        <ToastContainer />
        {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'].map((day) => (
          <WeekdayContainer key={day}>
            <WeekDay>
              <PacmanLoader
                color='#D9D9D9'
                size={10}
                loading />
            </WeekDay>
            <SchedulesContainer>
              <h2>{day}</h2>
              {
                Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <Schedule isCurrentTime={false} key={index}>
                      <PacmanLoader color='#D9D9D9' size={25} loading />
                    </Schedule>
                  ))
              }
            </SchedulesContainer>
          </WeekdayContainer>
        ))}
      </WeekContainer>
    )
  };

  //MODAL HANDLE FUNCTIONS
  function handleActionButtonClick(e: any) {

    console.log("Clicked")

    e.preventDefault();
    // Start the animation by updating the state
    setIsAnimating(true);

    // Reset the animation after a delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);

    console.log(userData.userData.role)

    if (userData.userData.role == "professor") {

      if (userIsScheduling == true) {
        toast.info('Modo de agendamento desativado!', {
          theme: "dark"
        });
      }
      else {
        toast.info('Selecione um dia para agendar!');
      } e
      setUserIsScheduling(!userIsScheduling)
    }
    else {

      toast.info('Selecione um filtro',
        {
          theme: (themeName == "LightTheme" || themeName == "Cookie de Morango") ? "light" : "dark"
        }
      );

    }
    console.log(userIsScheduling)
    //habilitar oarametro que fd-diz que esta em modo agendamento
  }

  const handleCloseModalEdit = (resetParams: boolean) => {
    setSchedulingModalIsVisible(false);
    if (resetParams) {
      setUserIsScheduling(false)
      if (selectedMethod == "professor") {
        fetchProfessorData();
      }
      else if (selectedMethod == "laboratorio") {
        fetchLaboratoryAgendamentosData()
      }
    };
  };

  const openEditModal = (editedData: any, daysIds: any) => {
    console.log("Edited Data: " + JSON.stringify(editedData, null, 2))
    console.log("daysIds: " + JSON.stringify(daysIds, null, 2))
    setEditedData(editedData);
    setDaysIds(daysIds)
    setSchedulingModalIsVisible(true);
  };

  //DATEPICKER FUNCTIONS
  const handleSelectToday = () => {
    const today = new Date()
    const monday = startOfWeek(today, { weekStartsOn: 1 });
    const friday = endOfWeek(today, { weekStartsOn: 6 });
    setStartDate(monday);
    setEndDate(friday);
  }
  const handleArrowLeft = () => {
    const startDateTransformed = new Date(startDate as any)
    const endDateTransformed = new Date(endDate as any)
    const monday = subWeeks(startDateTransformed, 1)
    const friday = subWeeks(endDateTransformed, 1)
    setStartDate(monday);

    setEndDate(friday);
  }
  const handleArrowRight = () => {
    const startDateTransformed = new Date(startDate as any)
    const endDateTransformed = new Date(endDate as any)
    const monday = addWeeks(startDateTransformed, 1)
    const friday = addWeeks(endDateTransformed, 1)
    setStartDate(monday);

    setEndDate(friday);
  }
  const handleStartDateChange = (date: Date) => {
    const monday = startOfWeek(date, { weekStartsOn: 1 });
    const friday = endOfWeek(date, { weekStartsOn: 6 });
    setStartDate(monday);
    setEndDate(friday);
  };
  const handleEndDateChange = (date: Date) => {
    const monday = startOfWeek(date, { weekStartsOn: 1 });
    const friday = endOfWeek(date, { weekStartsOn: 6 });
    setStartDate(monday);
    setEndDate(friday);
  };
  const getDayBasedOnWeekday: any = (dayName: string, startDate: any) => {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const dayIndex = days.indexOf(dayName);

    if (dayIndex === -1) {
      throw new Error('Invalid day name');
    }

    const currentDay = startDate.getDay();
    const daysUntilNext = (dayIndex - currentDay + 7) % 7;

    const nextDay = new Date(startDate.getTime());
    nextDay.setDate(startDate.getDate() + daysUntilNext);

    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    return {
      currentWeekDay: `${nextDay.getDate().toString().padStart(2, '0')}/${monthNames[nextDay.getMonth()]}`,
      dayDateObject: nextDay
    }
  };
  const isWithinClassTime = (startTime: any, endTime: any) => {

    // console.log("Start Time: " + startTime)
    // console.log("End Time: " + endTime)

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const start = new Date();
    start.setHours(startHour, startMinute, 0, 0);

    const end = new Date();
    end.setHours(endHour, endMinute, 0, 0);

    return now >= start && now <= end;
  };

  //FILTER FUNCTIONS
  const handleSelectProfessor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(event.target.value)

    const professorObject = {
      id: parseInt(event.target.value),
      name: "test"
    }
    setSelectedProfessor(
      professorObject
    )
  }

  const handleLaboratoriosChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    console.log("I have been changed")

    console.log(laboratoryData)

    const chosenlaboratorioObject = laboratoryData.filter((item: any) => {
      if (item.numero_sala == event.target.value) {
        return item
      }
    })

    console.log(chosenlaboratorioObject[0])

    setSelectedLaboratorio(chosenlaboratorioObject[0])

  }

  const handleSemesterChange = (event: any) => {
    setSelectedSemesterValue(event.target.value)
  }
  const handleMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(event.target.value)
    setSelectedMethod(event.target.value)
  }
  const GetCurrentMonthAndYear = (date: any) => {
    // console.log(date)
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()

    return `${month} de ${year}`
  }

  //FETCH FUNCTION
  async function fetchProfessors(token: string) {
    console.log("Fetching fetchProfessors...")
    // console.log(process.env.REACT_APP_API_KEY)
    await fetch(`${apiUrl}/professors`, {
      method: 'POST',
      headers: {
        'Authorization': 'bearer ' + token,
      }
    }).then((response) => response.json()).then((data) => {
      // console.log(data)

      setProfessores(data);

    }).catch((error) => {
      console.log(error)
    })
  }

  async function fetchLaboratoryData() {
    fetch(`${apiUrl}/laboratory`, {
      method: 'POST'
    }).then((response: any) => response.json()).then((data) => {

      setTimeout(() => {
        setLoading(true) // teste de loading
      }, 2000)

      const revertedData = data.reverse()

      if (selectedLaboratorio.id == 0) {
        setSelectedLaboratorio(revertedData[0])
      }
      return setlaboratoryData(revertedData)
    }
    )
  }

  async function fetchLaboratoryAgendamentosData() {

    fetch(`${apiUrl}/grade/agendamentos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        numero_sala: selectedLaboratorio.numero_sala
      })
    }).then((response: any) => response.json()).then((data) => {

      const transformedData = groupByWeekday(data)
      // console.log("Transformed Data :" + JSON.stringify(transformedData, null, 2))

      setTimeout(() => {
        setLoading(true) // teste de loading
      }, 2000)
      // console.log(transformedData)
      // console.log("transformedData" + JSON.stringify(transformedData, null, 2))
      // setLoading(true)


      return setgrade(transformedData as any)

    }
    )

  }

  async function fetchProfessorData() {
    console.log("Fetching fetchProfessorData...")
    console.log(selectedProfessor)
    fetch(`${apiUrl}/grade/agendamentos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        professor_id: selectedProfessor.id,
      })
    }).then((response) => response.json()).then((data) => {
      // console.log(data)

      const transformedData = groupByWeekday(data)
      // console.log("Transformed Data :" + JSON.stringify(transformedData, null, 2))

      setTimeout(() => {
        setLoading(true) // teste de loading
      }, 2000)
      // console.log(transformedData)
      // console.log("transformedData" + JSON.stringify(transformedData, null, 2))
      // setLoading(true)
      return setgrade(transformedData as any)
    }
    )
  }

  // async function fetchData() {
  //   fetch(`${apiUrl}/grade/dashboard`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       semestre: selectedSemesterValue || 1,
  //       date: selectedDate || new Date() //add localStorage later
  //     })
  //   }).then((response) => response.json()).then((data) => {
  //     // console.log(data)
  //     const transformedData = groupByWeekday(data)
  //     // console.log("Transformed Data :" + JSON.stringify(transformedData, null, 2))
  //     setTimeout(() => {
  //       setLoading(true) // teste de loading
  //     }, 2000)
  //     // setLoading(true)
  //     // console.log(transformedData.segunda[0].agendamentos.professor)
  //     return setgrade(transformedData)
  //   }
  //   )
  // }

  async function cancelAgendamentoRequest(data: any) {
    try {
      await fetch(`${apiUrl}/grade/agendamentos/cancelar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((response) => response.json()).then((data) => {
        if (data.message) {
          console.log("Agendamento cancelado com sucesso!")
          Swal.fire(
            'Cancelado!',
            'Agendamento cancelado com sucesso!',
            'success'
          )
          fetchLaboratoryAgendamentosData()
        } else {
          console.log("Erro ao cancelar agendamento!")
          Swal.fire(
            'Erro!',
            'Erro ao cancelar agendamento!',
            'error'
          )
        }
      }
      )
    }
    catch (error) {
      console.log(error)
      Swal.fire(
        'Erro!',
        'Erro ao cancelar agendamento!',
        'error'
      )
    }

  }

  //THEME FUNCTIONS

  function getThemeBasedClass(theme: string) {

    // console.log(theme)

    switch (theme) {
      case 'LightTheme':
        return 'bubbly-button-shadow-white'
      case 'Cookie de Morango':
        return 'bubbly-button-cookie-de-morango'
      case 'standart darkTheme':
        return 'bubbly-button-darkmode'
      case 'VancedTheme':
        return 'bubbly-button-vanced-theme'
      default:
        return 'bubbly-button-shadow-white'
    }

  }

  //RENDERS -------------------------------------------------------------------------
  return (
    <>
      <ParticlesComponent theme={theme} />
      <ModalAgendamento
        action={"SCHEDULELABORATORIO"}
        isVisible={schedulingModalIsVisible }
        onClose={handleCloseModalEdit}
        initialData={editedData}
        daysIds={daysIds}
        idUserLogado={userData.userData.id}
        userRole={userData.userData.role}
      />
      <ToastContainer
        limit={4}
        autoClose={1000}
      />
      <MainContainer>
        <CalltoActionButton className={`${getThemeBasedClass(themeName)} + bubbly-button ${isAnimating ? 'animate' : ''}`} backgroundColor={userIsScheduling} onClick={handleActionButtonClick}>
          {
            userData.userData.role == "aluno" || userData.userData.role == "guest" &&
            <FaFilter size={35} color='white' />
            // <AiFillHeart size={35} color='white' />
          }
          {
            userData.userData.role == "professor" &&
            <MdOutlineModeEdit size={40} color='white' />
          }
        </CalltoActionButton>
        <Helmet>
          <title>SGSA - Laboratorio</title>
        </Helmet>
        <Header>
          <CoursesWrapper>
            <PageName>
              Laboratorio
            </PageName>
            <CourseName>
              {selectedLaboratorio.descricao}
            </CourseName>
            <CourseSemester>
              2º Semestre de 2023
            </CourseSemester>
          </CoursesWrapper>
          <DatePickWrapper>
            <DatepickContainer>
              <DatepickArrowsContainer onClick={() => handleSelectToday()}>
                <StyledImageButton>
                  <TodayContainer
                    size={25}
                  />
                </StyledImageButton>
                <PularParaHojeText>Pular para hoje</PularParaHojeText>
              </DatepickArrowsContainer>
              <DatepickArrowsContainer onClick={() => handleArrowLeft()}>
                <LeftArrow
                  size={45}
                />
              </DatepickArrowsContainer>
              <DatepickArrowsContainer onClick={() => handleArrowRight()}>

                <RightArrow
                  size={45}
                />
              </DatepickArrowsContainer>
              <CurrentMonth>
                <CurrentMonthText>
                  {GetCurrentMonthAndYear(startDate)}
                </CurrentMonthText>
                <DownArrow
                  size={45}
                />
              </CurrentMonth>
              <CalendarWrapper>
                Semana do dia
                <StyledDatePicker
                  selected={startDate} onChange={handleStartDateChange} />
                ao dia
                <StyledDatePicker selected={endDate} onChange={handleEndDateChange} />
              </CalendarWrapper>
            </DatepickContainer>
            <FilterWrapper>
              <FilterIconWrapper>
                <FilterIcon
                  size={20}
                />
              </FilterIconWrapper>
              <StyledSelect value={selectedMethod} onChange={handleMethodChange}>
                <option value="laboratorio">
                  Laboratório
                </option>
                <option value="professor">
                  Professor
                </option>
              </StyledSelect>
              {
                selectedMethod === "professor" &&
                <StyledSelect defaultValue={selectedProfessor.name} onChange={handleSelectProfessor}>
                  {professores && professores.length > 0 ? (
                    professores.map((professor) => {
                      return (
                        <option key={professor.id} value={professor.id}>
                          {professor.name}
                        </option>
                      );
                    })
                  ) : (
                    <option value="">No professors available</option>
                  )}
                </StyledSelect>
              }
              {
                selectedMethod === "laboratorio" ?
                  <StyledSelect defaultValue={selectedLaboratorio} onChange={handleLaboratoriosChange}>
                    {laboratoryData && laboratoryData.length > 0 ? (
                      laboratoryData.map((laboratoryData: any) => {
                        return (
                          <option key={laboratoryData.id} value={laboratoryData.numero_sala}>
                            {laboratoryData.descricao}
                          </option>
                        )
                      })
                    ) : (
                      <option value="">No laboratorio available</option>
                    )}
                  </StyledSelect>
                  : null
              }
              <>
                {
                  userData.userData.professor_id == 0 || userData.userData.professor_id == undefined ?
                    null
                    :
                    (
                      userIsScheduling ?
                        <ButtonConfimarAgendamento onClick={handleActionButtonClick}>Cancelar</ButtonConfimarAgendamento>
                        :
                        <ButtonConfimarAgendamento onClick={handleActionButtonClick}>Novo agendamento</ButtonConfimarAgendamento>
                    )
                }
              </>
            </FilterWrapper>
          </DatePickWrapper>
        </Header>
        <ClassesContainer>
          <ClockContainer>
            <p>18:45</p>
            <p>19:35</p>
            <p>20:25</p>
            <p>20:35</p>
            <p>21:25</p>
            <p>22:15</p>
          </ClockContainer>
          {loading
            &&
            grade
            ?
            (
              <WeekContainer>
                {renderWeekday('Segunda', grade.segunda)}
                {renderWeekday('Terça', grade.terca)}
                {renderWeekday('Quarta', grade.quarta)}
                {renderWeekday('Quinta', grade.quinta)}
                {renderWeekday('Sexta', grade.sexta)}
              </WeekContainer>
            ) : (
              renderLoading()
            )}
        </ClassesContainer>
        <StyledContextMenu
          className="context-menu"
          style={{
            position: 'absolute',
            display: isContextMenuVisible ? 'block' : 'none',
            top: contextMenuPosition.top,
            left: contextMenuPosition.left + 20
          }}
        >
          <ul>
            <li onClick={() => closeContextMenu('cancel')} >
              <AiOutlineUserDelete size={18} />
              Reportar Falta de Professor
            </li>
            <li onClick={() => closeContextMenu('default')}>
              <GiCancel size={18} />

              Cancelar reserva de laboratório</li>
          </ul>
        </StyledContextMenu>
      </MainContainer>
    </>
  );
};

export default Laboratorio