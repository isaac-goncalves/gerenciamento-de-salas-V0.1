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

import { AiFillHeart, AiOutlinePlusCircle } from 'react-icons/ai';

import { MainContainer, Header, CourseName, ClassesContainer, ClockContainer, WeekdayContainer, SchedulesContainer, Schedule, WeekContainer, CourseSemester, DateIcon, CoursesWrapper, DatePickWrapper, DatepickContainer, Sala, Disciplina, Professor, SalaAgendada, SalaWrapper, DatepickArrowsContainer, CalendarWrapper, StyledDatePicker, WeekDay, FilterWrapper, StyledSelect, Semestre, SemestreSalaWrapper, PageName, CurrentMonth, PularParaHojeText, ButtonConfimarAgendamento, FilterIconWrapper, CalltoActionButton, StyledImageButton, PacmanLoaderWrapper, TodayContainer, LeftArrow, RightArrow, DownArrow, FilterIcon, StyledSelectValue, FatecBanner, CurrentMonthText, CockAndMainContainerWrapper, StyledDayName } from './Dashboard.styles'

import ModalEdit from '../Components/ModalEdit';

import { ParticleOptions } from '../Components/ParticlesOptions';

import { useCallback } from "react";
import { Theme, type Container, type Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.
//

import { MdKeyboardArrowRight, MdKeyboardDoubleArrowRight, MdOutlineModeEdit, MdOutlineModeEditOutline, MdSubdirectoryArrowRight, MdToday } from 'react-icons/md';
import { FiFilter } from 'react-icons/fi';

import dateIcon from '../../../public/images/dia_de_hoje.png';
import arrowLeft from '../../../public/images/pickDateicons/arrow_left.svg';
import arrowRight from '../../../public/images/pickDateicons/arrow_right.svg';
import arrowDown from '../../../public/images/pickDateicons/arrow_down.svg';
import { StyledButton } from '../Perfil/Perfil.styles';
import { FaFilter, FaHeart } from 'react-icons/fa';
import { on } from 'events';

import banner from '../../../public/images/banner.jpg';
import ModalAskSemestre from '../Components/ModalAskSemestre';


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

interface CourseProps {
  id: number;
  course_name: string;
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

function groupBySemester(fetchedData: ScheduleItem[]): GroupedData {
  const semestresString = ["semestre1", "semestre2", "semestre3", "semestre4", "semestre5", "semestre6"];
  const totalItemsPerDay = 6;

  // Initialize groupedData with each day of the week and an empty 

  const groupedData: GroupedData = {
    semestre1: [],
    semestre2: [],
    semestre3: [],
    semestre4: [],
    semestre5: [],
    semestre6: [],
  };

  for (const item of fetchedData) {
    console.log(item.semestre)

    const semesterIndex = parseInt(item.semestre) - 1;

    console.log(semesterIndex)

    const semester = semestresString[semesterIndex];

    console.log("TEST")
    console.log(semester)

    console.log(groupedData[semester])


    groupedData[semester].push(item);
  }

  // for (const day in groupedData) {
  //   const currentDayLength = groupedData[day].length;

  //   // Add "Nenhuma Aula" for remaining slots, except after the interval
  //   for (let i = currentDayLength; i < totalItemsPerDay - 1; i++) {
  //     groupedData[day].push({
  //       disciplina: "Nenhuma Aula",
  //       semestre: ''
  //     });
  //   }

  //   // Add interval as the third item
  //   groupedData[day].splice(2, 0, {
  //     disciplina: "Intervalo",
  //     semestre: ''
  //   });
  // }

  console.log("groupedData: " + JSON.stringify(groupedData, null, 2))

  return groupedData;
}

function groupByWeekdayLaboratorios(data: ScheduleItem[]): GroupedData {
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
        disciplina: "Nenhum Agendamento",
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
const Dashboard: any = ({ theme, themeName }: any) => {
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

  const [courses, setCourses] = useState<CourseProps[]>([
    {
      id: 0,
      course_name: "Selecione um Curso",
    },
  ]);


  //MODALPROPS
  const [userIsScheduling, setUserIsScheduling] = useState<boolean>(false);
  const [editedData, setEditedData] = useState<any>({});
  const [daysIds, setDaysIds] = useState<any>([]);
  const [schedulingModalIsVisible, setSchedulingModalIsVisible] = React.useState(false)
  const [askSemesterModalIsVisible, setAskSemesterModalIsVisible] = React.useState(false)


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
  const [selectedMethod, setSelectedMethod] = useState("semestre");
  const [selectedSemesterValue, setSelectedSemesterValue] = useState(1)
  const [selectedProfessor, setSelectedProfessor] = useState<Professor>(
    {
      id: 0,
      name: "Selecione um professor",
    },
  );

  const [selectedCourse, setSelectedCourse] = useState<CourseProps>(
    {
      id: 0,
      course_name: "Selecione um Curso",
    },
  );



  //WEIRD DATE STUFF
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const [date, setDate] = useState(new Date());
  const [currentDay, setCurrentDay] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  // set to nearest Monday
  const [currentSelectedDate, setCurrentSelectedDate] = useState<Date>(new Date());
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

        console.log(localUserData)


        toast.error('Você precisa estar logado para acessar essa página!');
        localStorage.removeItem('gerenciamento-de-salas@v1.2');
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        console.log('userDataJson: ' + JSON.stringify(userDataJson, null, 2));
        setUserData(userDataJson);
        fetchCouses();
        fetchDashboard()
        setSelectedSemesterValue(userDataJson.userData.semester);

      }
    }
  }, [userData]);


  useEffect(() => {

    console.log('Starting to render stuff2...');

    console.log(currentSelectedDate)

    if (userData.token !== '' && userData.userData.id !== 0) {

      console.log("Usuário logado!")

      // console.log(selectedMethod)
      if (!userData.userData.semesterverified) {
        setAskSemesterModalIsVisible(true)
      }

     

      //FETCH DATA THAT CHANGES ON THE FILTERS
      if (selectedMethod == "professor") {
        fetchProfessorData();
      }
      else {
        fetchSemestreData();
      }

    }
    else {
      console.log("Usuário nao esta logado!")
    }

  }, [selectedMethod, selectedSemesterValue, currentSelectedDate, selectedCourse]);

  useEffect(() => {

    const updateCurrentDayAndTime = () => {
      const now = new Date();
      const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
      setCurrentDay(days[now.getDay()]);

      const hours = now.getHours();
      const minutes = now.getMinutes();
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateCurrentDayAndTime();
    const timerId = setInterval(updateCurrentDayAndTime, 60000); // Update every minute

    // setSelectedSemesterValue(userData.userData.semestre)
    return () => {
      clearInterval(timerId);
    };

  }, []);

  //FUNCTIONS ---------------------------------------------------------------------

  function handleScheduleClick(dayData: any, item: any, dayDateObject: Date) {
    // console.clear()
    console.log("Clicked")
    console.log(item.agendamentos.length)

    const daysIds: any = []

    dayData.forEach((item: any) => {
      item.id ? daysIds.push(item.id) : null
    })

    console.log(daysIds)
    console.log(dayDateObject?.toISOString())

    if (item.agendamentos.length > 0) {
      // console.log("Agendamento exist and the item is") 
      console.log(JSON.stringify(item.agendamentos[0], null, 2))
      console.log("agendamento exist")

      openEditModal(item.agendamentos[0], daysIds)
    } else {

      // MONTA OBJ DE MOVO AGENDAMENTO
      //{
      //   "id": 9,
      //   "date": "2023-08-25T00:23:27.240Z",
      //   "uuid_agendamento": "#21324",
      //   "horario_inicio": "18:45:00",
      //   "horario_fim": "19:35:00",
      //   "id_professor": 12,
      //   "id_grade": 16,
      //   "id_laboratorio": 25,
      //   "professor": "Marcos Allan",
      //   "laboratorio": "Laboratorio-5",
      //   "updated_at": "2023-08-27T00:23:37.849Z",
      //   "created_at": "2023-08-27T00:23:37.849Z"
      // }

      const newAgedamentoData = {
        date: dayDateObject?.toISOString(),
        uuid_agendamento: "-",
        id_professor: userData.userData.professor_id,
        id_laboratorio: 0,
        updated_at: new Date()?.toISOString(),
        created_at: new Date()?.toISOString()
      }

      //ABRE MODAL DE NOVO AGENDAMNTO CASO USUARIO ESTEJA NO MODO DE CRIAÇÂO 
      userIsScheduling
        ?
        openEditModal(newAgedamentoData, daysIds)
        :
        console.log("Is not agendating")
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
  const renderWeekday = (semesterName: string, dayData: any) => {

    // const getDayBasedOnWeekdayObj = getDayBasedOnWeekday(dayName, startDate)
    // const [currentWeekDay, dayDateObject] = getDayBasedOnWeekday(dayName, startDate)
    // const currentWeekDay = getDayBasedOnWeekdayObj.currentWeekDay
    // const dayDateObject = getDayBasedOnWeekdayObj.dayDateObject

    return (
      <WeekdayContainer>
        <SchedulesContainer isCurrentDay={currentDay === semesterName}>
          <h2>{semesterName}</h2>
          {
            dayData.map((item: any) => {
              const {
                disciplina,
                professor,
                laboratorio,
                agendamentos,
                semestre,
              } = item;

              const agendamentoDefaultExist = agendamentos ? agendamentos.some((item: any) => {
                return item.schedule_status == "default"
                  && areDatesOnSameDayMonthYear(new Date(item.date), currentSelectedDate)
              }) : false

              const agendamentoCancelExist = agendamentos ? agendamentos.some((item: any) => {
                return item.schedule_status == "cancel"
                  && areDatesOnSameDayMonthYear(new Date(item.date), currentSelectedDate)
              }) : false


              const agendamento = !agendamentoDefaultExist ? agendamentos && agendamentos.length > 0 ? agendamentos[0] : null : null

              const isCurrentTime = false
              // isWithinClassTime(item.horario_inicio, item.horario_fim);

              // console.log(isCurrentTime)
              // console.log(currentTime)

              return (
                <Schedule  isCurrentTime={isCurrentTime}
                  className={isCurrentTime ? '' : 'hoverEffect'}>
                  <Disciplina agendamentoCancelExist={agendamentoCancelExist}>{disciplina}</Disciplina>
                  <Professor agendamentoCancelExist={agendamentoCancelExist}>{professor}</Professor>
                  {
                    agendamentoCancelExist ?
                      (
                        <Sala agendamento={agendamento}>
                          Aula Cancelada
                        </Sala>
                      ) :
                      !(disciplina == "Nenhuma Aula" || disciplina == "Intervalo") ?
                        selectedMethod === 'professor' ?
                          <SemestreSalaWrapper>
                            <Semestre>{semestre}º Semestre</Semestre>
                            <SalaWrapper>
                              <Sala agendamento={agendamento}>{laboratorio}</Sala>
                              {
                                agendamento && agendamento.laboratorio && (
                                  <>
                                    <MdKeyboardDoubleArrowRight />
                                    <SalaAgendada>{agendamento.laboratorio}</SalaAgendada>
                                  </>
                                )}
                            </SalaWrapper>
                          </SemestreSalaWrapper>
                          :
                          <SalaWrapper>
                            <Sala agendamento={agendamento}>{laboratorio}</Sala>
                            {
                              agendamento && agendamento.laboratorio && (
                                <>
                                  <MdKeyboardDoubleArrowRight />
                                  <SalaAgendada>{agendamento.laboratorio}</SalaAgendada>
                                </>
                              )}
                          </SalaWrapper>
                        :
                        null

                  }
                </Schedule>
              );
            })}
        </SchedulesContainer>
      </WeekdayContainer>
    )
  };

  const renderBanner = (dayName: string, dayData: any) => {

    const getDayBasedOnWeekdayObj = getDayBasedOnWeekday(dayName, currentSelectedDate)
    // const [currentWeekDay, dayDateObject] = getDayBasedOnWeekday(dayName, startDate)
    const currentWeekDay = getDayBasedOnWeekdayObj.currentWeekDay
    const dayDateObject = getDayBasedOnWeekdayObj.dayDateObject

    console.log("currentWeekday")
    console.log(dayDateObject)

    return (
      <WeekdayContainer>
        <FatecBanner src={banner} />
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
            <SchedulesContainer isCurrentDay={false}>
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
      fetchDashboard()
    };
  };

  const handleCloseModalAskSemester = (semestre: number) => {

    setSelectedSemesterValue(semestre)

    setAskSemesterModalIsVisible(false);
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
    setCurrentSelectedDate(today);
  }
  const handleArrowLeft = (currentSelectedDate: Date) => {

    const datePreviousDay = new Date()

    datePreviousDay.setDate(currentSelectedDate.getDate() - 1)

    setCurrentSelectedDate(datePreviousDay);

  }
  const handleArrowRight = (currentSelectedDate: Date) => {
    const dateNextDay = new Date()

    dateNextDay.setDate(currentSelectedDate.getDate() + 1)

    setCurrentSelectedDate(dateNextDay);

  }
  const handleStartDateChange = (date: Date) => {

    setCurrentSelectedDate(date);

    // const monday = startOfWeek(date, { weekStartsOn: 1 });
    // const friday = endOfWeek(date, { weekStartsOn: 6 });
    // setCurrentSelectedDate(monday);
    // setEndDate(friday);
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
  const handleSelectCourse = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(event.target.value)
    const courseObject: CourseProps = {
      id: parseInt(event.target.value),
      course_name: "test"
    }

    setSelectedCourse(
      courseObject
    )

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
  async function fetchSemestreData() {
    fetch(`${apiUrl}/grade/dashboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        semestre: selectedSemesterValue || 1,
        date: currentSelectedDate, //add localStorage later
        course_id: selectedCourse.id || 1,
      })
    }).then((response) => response.json()).then((data) => {
      console.log(data)
      const transformedData = groupBySemester(data)
      console.log("Transformed Data :" + JSON.stringify(transformedData, null, 2))
      setTimeout(() => {
        setLoading(true) // teste de loading
      }, 2000)
      // setLoading(true)
      // console.log(transformedData.segunda[0].agendamentos.professor)
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
        // professor_id: selectedProfessor.id || 1,
        laboratory_id: "2",
      })
    }).then((response) => response.json()).then((data) => {
      console.log(data)

      const transformedData = groupBySemester(data)
      console.log("Transformed Data :" + JSON.stringify(transformedData, null, 2))

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

  async function fetchCouses() {
    console.log("Fetching Courses...")
    fetch(`${apiUrl}/course`, {
      method: 'POST',
    }).then((response) => response.json()).then((data) => {
      console.log(data)
      setSelectedCourse(data[0])
      return setCourses(data)
    }
    )
  }

  async function fetchDashboard() {
    fetch(`${apiUrl}/grade/dashboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        semestre: selectedSemesterValue || 1,
        date: selectedDate || new Date(), //add localStorage later
        course_id: selectedCourse.id || 1,
      })
    }).then((response) => response.json()).then((data) => {
      // console.log(data)
      const transformedData = groupBySemester(data)
      // console.log("Transformed Data :" + JSON.stringify(transformedData, null, 2))
      setTimeout(() => {
        setLoading(true) // teste de loading
      }, 2000)
      // setLoading(true)
      // console.log(transformedData.segunda[0].agendamentos.professor)
      return setgrade(transformedData)
    }
    )
  }

  //PARTICLES FUNCTIONS
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    await console.log(container);
  }, []);

  //THEME FUNCTIONS

  function getThemeBasedClass(theme: string) {

    console.log(theme)

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

  function capitalizeFirstLetter(str: any) {
    // Check if the input is not an empty string
    if (str.length > 0) {
      // Capitalize the first letter and concatenate it with the rest of the string
      return str.charAt(0).toUpperCase() + str.slice(1);
    } else {
      // Handle empty string
      return str;
    }
  }

  //RENDERS -------------------------------------------------------------------------
  return (
    <>
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
      <ModalEdit action={userIsScheduling ? "CREATE" : "OPEN"} isVisible={schedulingModalIsVisible} onClose={handleCloseModalEdit} initialData={editedData} daysIds={daysIds} idUserLogado={userData.userData.id} userRole={userData.userData.role} />
      <ModalAskSemestre isVisible={askSemesterModalIsVisible} onCloseModalAskSemester={handleCloseModalAskSemester} />
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
          <title>SGSA - Dashboard</title>
        </Helmet>
        <Header>
          <CoursesWrapper>
            <PageName>
              Dashboard
            </PageName>
            <CourseName>

            </CourseName>
            <CourseSemester>
              2º Semestre de 2023
            </CourseSemester>
          </CoursesWrapper>
          <DatePickWrapper>
            <DatepickContainer>
              <DatepickArrowsContainer onClick={() => handleSelectToday()}>
                <TodayContainer
                  size={30}
                />
                <PularParaHojeText>Pular para hoje</PularParaHojeText>
              </DatepickArrowsContainer>
              <DatepickArrowsContainer onClick={() => handleArrowLeft(currentSelectedDate)}>
                <LeftArrow
                  size={50}
                />
              </DatepickArrowsContainer>
              <DatepickArrowsContainer onClick={() => handleArrowRight(currentSelectedDate)}>
                <RightArrow
                  size={50}
                />
              </DatepickArrowsContainer>
              {/* <CurrentMonth>
                <DatepickArrowsContainer>
                  <CurrentMonthText>
                    {GetCurrentMonthAndYear(currentSelectedDate)}
                  </CurrentMonthText>
                  <DownArrow
                    size={45}
                  />
                </DatepickArrowsContainer>
              </CurrentMonth> */}
              <CalendarWrapper>
                Dia
                <StyledDatePicker
                  selected={currentSelectedDate} onChange={handleStartDateChange} />
                {/* ao dia
                <StyledDatePicker selected={endDate} onChange={handleEndDateChange} /> */}
              </CalendarWrapper>
            </DatepickContainer>
            <StyledDayName >{capitalizeFirstLetter(String(currentSelectedDate.toLocaleDateString('pt-BR', { weekday: 'long', timeZone: 'UTC' })) || null)}</StyledDayName>
            <FilterWrapper>
              <FilterIconWrapper>
                <FilterIcon
                  size={20}
                />
              </FilterIconWrapper>
              <StyledSelect defaultValue={selectedCourse.course_name} onChange={handleSelectCourse}>
                {courses && courses.length > 0 ? (
                  courses.map((course) => {
                    return (
                      <option key={course.id} value={course.id}>
                        {course.course_name}
                      </option>
                    );
                  })
                ) : (
                  <option value="">No professors available</option>
                )}
              </StyledSelect>
          
             
            </FilterWrapper>
          </DatePickWrapper>
        </Header>
        <ClassesContainer>
          <CockAndMainContainerWrapper>
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
                <>

                  <WeekContainer>
                    {/* {
                      grade && grade.map((item: any) => {
                        console.log(item)


                        return (
                          <>
                            <WeekdayContainer key={item.semestre}>
                              <WeekDay>
                                <h2>{item.semestre}º Semestre</h2>
                              </WeekDay>
                              <SchedulesContainer isCurrentDay={false}>
                                <h2>STARTDATE DATE I THINK</h2>
                              </SchedulesContainer>
                            </WeekdayContainer>
                          </>
                        )
                      })
                    } */}
                    {renderWeekday('1º Semestre', grade.semestre1)}
                    {renderWeekday('2º Semestre', grade.semestre2)}
                    {renderWeekday('3º Semestre', grade.semestre3)}
                    {renderWeekday('4º Semestre', grade.semestre4)}
                    {renderWeekday('5º Semestre', grade.semestre5)}
                    {renderWeekday('6º Semestre', grade.semestre6)}
                    {renderBanner('Sexta', grade.semestre6)}
                  </WeekContainer >
                </>

              ) : (
                renderLoading()
              )}
          </CockAndMainContainerWrapper>
        </ClassesContainer>
      </MainContainer>
    </>
  );
};

export default Dashboard