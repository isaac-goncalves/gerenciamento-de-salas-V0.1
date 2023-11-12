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

import { MainContainer, Header, CourseName, ClassesContainer, ClockContainer, WeekdayContainer, SchedulesContainer, Schedule, WeekContainer, CourseSemester, DateIcon, CoursesWrapper, DatePickWrapper, DatepickContainer, Sala, Disciplina, Professor, SalaAgendada, SalaWrapper, DatepickArrowsContainer, CalendarWrapper, StyledDatePicker, WeekDay, FilterWrapper, StyledSelect, Semestre, SemestreSalaWrapper, PageName, CurrentMonth, PularParaHojeText, ButtonConfimarAgendamento, FilterIconWrapper, CalltoActionButton, StyledImageButton, PacmanLoaderWrapper, TodayContainer, LeftArrow, RightArrow, DownArrow, FilterIcon, StyledSelectValue, FatecBanner, CurrentMonthText, CockAndMainContainerWrapper, StyledDayName, StyledCourseSelect } from './Dashboard.styles'

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
        if (!userDataJson.userData.semesterverified) {
          setAskSemesterModalIsVisible(true)
        }
      }
      fetchCourses();
       fetchSemestreData();

    }
  }, []);


  useEffect(() => {

    console.log('Starting to render stuff2...');

    console.log(currentSelectedDate)
    console.log(userData)
    console.log(selectedCourse)

    if (userData.token !== '' && userData.userData.id !== 0) {
      console.log("Usuário logado!")

      // if (userData.userData.semesterverified == true) {
      //   setSelectedCourse({
      //     id: userData.userData.courseId,
      //     course_name: userData.userData.course_name
      //   })
      // } else {

      //FETCH DATA THAT CHANGES ON THE FILTERS
      if (selectedCourse.id != 0) {
        fetchSemestreData();
      }
    }
    else {
      console.log("Usuário nao esta logado!")
    }

  }, [selectedMethod, currentSelectedDate, selectedCourse]);

  useEffect(() => {
    if (userData.userData.semesterverified == true) {
      setSelectedCourse({
        id: userData.userData.courseId,
        course_name: userData.userData.course_name
      })
    } else {
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
                <Schedule isCurrentTime={isCurrentTime}
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
      </MainContainer>
    </>
  );
};

export default Dashboard