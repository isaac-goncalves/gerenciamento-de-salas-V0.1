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

import { MainContainer, Header, CourseName, ClassesContainer, ClockContainer, WeekdayContainer, SchedulesContainer, Schedule, WeekContainer, CourseSemester, DateIcon, CoursesWrapper, DatePickWrapper, DatepickContainer, Sala, Disciplina, Professor, SalaAgendada, SalaWrapper, DatepickArrowsContainer, CalendarWrapper, StyledDatePicker, WeekDay, FilterWrapper, StyledSelect, Semestre, SemestreSalaWrapper, PageName, CurrentMonth, PularParaHojeText, ButtonConfimarAgendamento, FilterIconWrapper, CalltoActionButton, StyledImageButton, PacmanLoaderWrapper, TodayContainer, LeftArrow, RightArrow, DownArrow, FilterIcon, StyledSelectValue, FatecBanner, CurrentMonthText, CockAndMainContainerWrapper, StyledDayName, StyledCourseSelect, StyledDayNameHeader, WeekdayBannerContainer, StyledCNNContent, StyledCNNWrapper, ArrowIcon } from './Dashboard.styles'

import ModalAgendamento from '../Components/ModalAgendamento';


import { useCallback } from "react";
import { Theme, type Container, type Engine, Particle } from "tsparticles-engine";

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

import ModalAskSemestre from '../Components/ModalAskSemestre';
import ParticlesComponent from '../Components/ParticlesComponent';
import CardWithChangingPictures from '../Components/CardWithChangingPictures';
import TextScroller from '../Components/TextScroller';


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

export function getCurrentSemester(date: Date) {
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();

  let message = '';

  if (currentMonth >= 1 && currentMonth <= 6) {
    message = '1º Semestre';
  } else if (currentMonth >= 7 && currentMonth <= 12) {
    message = '2º Semestre';
  }

  return `${message} - ${currentYear}`;

}

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

//COMPONENTS -------------------------------------------------------------------------
const Dashboard: any = ({ theme, themeName }: any) => {
  const [loading, setLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  //STORE FETCHED DATA
  const [grade, setgrade] = useState<any>();

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

  const [selectedCourse, setSelectedCourse] = useState<CourseProps>(
    {
      id: 0,
      course_name: "Selecione um Curso",
    },
  );



  // set to nearest Monday
  const [currentSelectedDate, setCurrentSelectedDate] = useState<Date>(new Date());
  // set to nearest Friday

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

      if (token == null) {
        console.log(localUserData)
        toast.error('Você precisa estar logado para acessar essa página!');
        localStorage.removeItem('gerenciamento-de-salas@v1.2');
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else if (userData.userData.id == 0) {
        console.log('userDataJson: ' + JSON.stringify(userDataJson, null, 2));
        setUserData(userDataJson);
        if (!userDataJson.userData.semesterverified && userDataJson.userData.role == "guest") {
          setAskSemesterModalIsVisible(true)
        }
      }
      fetchCourses();
      if (selectedCourse.id != 0) {
        fetchSemestreData();
      }
    }
  }, []);

  useEffect(() => {
    // const Hourminustree = new Date();

    // Hourminustree.setHours(Hourminustree.getHours() - 3);

    // setCurrentSelectedDate(Hourminustree);

    console.log('Starting to render stuff2...');

    console.log(currentSelectedDate)
    console.log(userData)
    console.log(selectedCourse)

    if (userData.token !== '' && userData.userData.id !== 0) {
      console.log("Usuário logado!")
      console.log(userData)
      console.log(selectedCourse.id)
      if (selectedCourse.id != 0) {
        fetchSemestreData();
      }

      // if (userData.userData.semesterverified == true) {
      //   setSelectedCourse({
      //     id: userData.userData.courseId,
      //     course_name: userData.userData.course_name
      //   })
      // } else {

      //FETCH DATA THAT CHANGES ON THE FILTERS

    }
    else {
      console.log("Usuário nao esta logado!")
    }

  }, [selectedMethod, currentSelectedDate, selectedCourse, userData]);

  useEffect(() => {
    console.log(
      'Starting to render stuff3...'
    );
    console.log(
      userData
    );
    if (userData.userData.semesterverified == true) {
      setSelectedCourse({
        id: userData.userData.courseId,
        course_name: userData.userData.course_name
      })
    }
    else {
      setSelectedCourse(courses[0])
    }
  }
    , [courses])

  //FUNCTIONS ---------------------------------------------------------------------

  function areDatesOnSameDayMonthYear(date1: Date, date2: Date) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  function handleDefaultCourse(selectedCourse: CourseProps) {

    setSelectedCourse(selectedCourse)

  }

  //RENDER FUNCTIONS
  const renderWeekday = (semesterName: string, dayData: any) => {

    // const getDayBasedOnWeekdayObj = getDayBasedOnWeekday(dayName, startDate)
    // const [currentWeekDay, dayDateObject] = getDayBasedOnWeekday(dayName, startDate)
    // const currentWeekDay = getDayBasedOnWeekdayObj.currentWeekDay
    // const dayDateObject = getDayBasedOnWeekdayObj.dayDateObject

    return (
      <WeekdayContainer>
        <SchedulesContainer>
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
                <Schedule agendamentoCancelExist={agendamentoCancelExist}
                  agendamentoDefaultExist={agendamentoDefaultExist}
                  key={item.id}
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
                                   <ArrowIcon />
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
                                   <ArrowIcon  size={20}/>
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
      <WeekdayBannerContainer>
        <WeekDay>
          Hoje na FATEC
        </WeekDay>
        {/* <FatecBanner src={banner} /> */}
        <CardWithChangingPictures />
      </WeekdayBannerContainer>
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
                    <Schedule key={index}>
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
      fetchSemestreData()
    };
  };

  const handleCloseModalAskSemester = (semestre: number, couseObject: CourseProps) => {

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

  //FILTER FUNCTIONS

  const handleSelectCourse = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(event.target.value)
    const courseObject: CourseProps = {
      id: parseInt(event.target.value),
      course_name: event.target.options[event.target.selectedIndex].text
    }

    setSelectedCourse(
      courseObject
    )

  }

  //FETCH FUNCTION
  async function fetchSemestreData() {

    if (selectedCourse.id != 1) {

      fetch(`${apiUrl}/grade/dashboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: currentSelectedDate, //add localStorage later
          course_id: selectedCourse.id || 1,
        })
      }).then((response) => response.json()).then((data) => {
        console.log(data)
        const transformedData = groupBySemester(data)
        console.log("Transformed Data :" + JSON.stringify(transformedData, null, 2))
        setTimeout(() => {
          setLoading(true) // teste de loading
        }, 0)
        // setLoading(true)
        // console.log(transformedData.segunda[0].agendamentos.professor)
        return setgrade(transformedData as any)
      }
      )
    }
  }

  async function fetchCourses() {
    console.log("Fetching Courses...")
    fetch(`${apiUrl}/course`, {
      method: 'POST',
    }).then((response) => response.json()).then((data) => {
      console.log(userData)
      return setCourses(data)
    }
    )
  }

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
      <ParticlesComponent theme={theme} />
      <ModalAgendamento action={userIsScheduling ? "CREATE" : "OPEN"} isVisible={schedulingModalIsVisible} onClose={handleCloseModalEdit} initialData={editedData} daysIds={daysIds} idUserLogado={userData.userData.id} userRole={userData.userData.role} />
      <ModalAskSemestre handleDefaultCourse={handleDefaultCourse} courses={courses} isVisible={askSemesterModalIsVisible} onCloseModalAskSemester={handleCloseModalAskSemester} />
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
            <StyledDayNameHeader >{capitalizeFirstLetter(String(currentSelectedDate.toLocaleDateString('pt-BR', { weekday: 'long', timeZone: 'UTC' })) || null)}</StyledDayNameHeader>
            <CourseName>
              {selectedCourse.course_name}
            </CourseName>
            <CourseSemester>
              {getCurrentSemester(currentSelectedDate)}
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
              <StyledCourseSelect value={selectedCourse.id} onChange={handleSelectCourse}>
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
              </StyledCourseSelect>
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


        </ClassesContainer>
        <StyledCNNWrapper>
          <StyledDayName >Fatec Tabaté: Uma Escola para o Futuro</StyledDayName>
          <p>|</p>
          <StyledCNNContent >
            <TextScroller
              text="Com a abertura de inscrições e os próximos eventos, a Fatec Tabaté demonstra sua posição como uma referência em educação tecnológica. A instituição segue o ritmo das mudanças do mercado e prepara seus alunos para o mundo do trabalho de hoje e de amanhã. Inscreva-se já e fique por dentro das novidades da tecnologia do futuro."
            />
          </StyledCNNContent>
        </StyledCNNWrapper>
      </MainContainer>
    </>
  );
};

export default Dashboard