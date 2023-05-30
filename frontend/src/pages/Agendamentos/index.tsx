import React, { useEffect, useState, useLayoutEffect } from 'react'

import { Navigate } from 'react-router-dom'

import DatePicker from "react-datepicker";

import { useWindowSize } from 'react-use';

import Confetti from 'react-confetti';

import { ToastContainer, toast } from 'react-toastify';

import { startOfWeek, endOfWeek, setDay, addDays, subWeeks, addWeeks } from 'date-fns';

import "react-datepicker/dist/react-datepicker.css";

import { mockdata } from './mockdata'

import { FiFilter } from 'react-icons/fi'

type Lab = {
  name: string;
  ids: number[];
};

const labs: Lab[] = [
  { name: "lab1", ids: [1, 2, 3, 4, 5] },
  { name: "lab2", ids: [6, 7, 8, 9, 10] },
  { name: "lab3", ids: [11, 12, 13, 14, 15] },
  { name: "lab4", ids: [16, 17, 18, 19, 20] },
  { name: "lab5", ids: [21, 22, 23, 24, 25] },
  { name: "lab6", ids: [26, 27, 28, 29, 30] },
  { name: "lab7", ids: [31, 32, 33, 34, 35] },
];

import {
  Container,
  Header,
  CourseName,
 
  ClassesContainer,
  ClockContainer,
  WeekdayContainer,
  SchedulesContainer,
  Schedule, WeekContainer,
  CourseSemester,
  DatePickWrapper,
  Laboratorios,
  DateIcon,
  CalendarWrapper,
  CoursesWrapper,
  DatepickContainer,
  Laboratorio,
  DatepickArrowsContainer,
  StyledDatePicker,
  WeekDay,
  NenhumaAulaText,
  DisciplinaText,
  Professor,
 
  Semestre,
  LaboratorioText,
  SelectingLaboratoryWrapper,
  ButtonConfimarAgendamento,
  StyledSelect
}
  from './Agendamento.styles'



// import dateIcon from '../../../public/images/dia_de_hoje.png';
// import arrowLeft from '../../../public/images/pickDateIcons/arrow_left.svg';
// import arrowRight from '../../../public/images/pickDateIcons/arrow_right.svg';
import arrowDown from '../../../public/images/pickDateIcons/arrow_down.svg';
import Modal from '../Components/Modal';
import set from 'date-fns/set';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { Colors } from '../../colors';
import { MdToken } from 'react-icons/md';

// {
//   "laboratorio1": [
//       {
//           "id": 1,
//           "disponivel": true
//       },
//       {
//           "id": 2,
//           "disponivel": true
//       },
//       {
//           "id": 3,
//           "disponivel": true
//       },
//       {
//           "id": 4,
//           "disponivel": true
//       },
//       {
//           "id": 5,
//           "disponivel": true
//       }
//   ],  

interface LaboratorioData {
  //first parameter has type object 
  [key: string]: Array<{
    id: number;
    disponivel: boolean;
  }>;
}

interface Professor {
  id: number;
  name: string;
}

interface ScheduleItem {
  id: number;
  horario_inicio: string;
  horario_fim: string;
  id_professor: string;
  dia_da_semana: string;
  id_disciplina: string;
  id_sala: string;
  semestre: string;
  created_at: string;
  updated_at: string;
}

interface gradeData {
  id: number;
  disciplina: string;
  professor: string;
  laboratorio: string;
  horario_inicio: string;
  horario_fim: string;
  dia_da_semana: string;
  semestre: string;
  created_at: string;
  updated_at: string;
}

interface IntervalItem {
  disciplina: string;
}

interface GradeProps {
  grade: any;
  segunda: any;
  terca: any;
  quarta: any;
  quinta: any;
  sexta: any;
}

interface ProfessoreProps {
  id: number;
  name: string;
}

type GroupedData = {
  [key: string]: Array<ScheduleItem | IntervalItem>;
}

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
      });
    }

    // Add interval as the third item
    groupedData[day].splice(2, 0, {
      disciplina: "Intervalo",
    });
  }
  return groupedData;
}

function printGradeValue(gradeValue: any) {

  // console.log("Grade Value: " + JSON.stringify(gradeValue, null, 2))

}

const Agendamentos: React.FC = () => {

  const [userRole, setUserRole] = useState(''); // User role state

  const [userData, setUserData] = useState(
    {
      userData: {
        id: 0,
        name: "Selecione um professor",
      },
      token: ""
    }
  );
  //----------------------------------------------------
  const [confetti, setConfetti] = useState(false); // Confetti state

  const [modalVisible, setModalVisible] = useState(false); // Modal state

  const { width, height } = useWindowSize() // Window size
  //----------------------------------------------------

  const [loading, setLoading] = useState(false); // Loading state

  const [selectingLaboratory, setSelectingLaboratory] = useState(false) // Selecting laboratory state

  //---------------------------------------------------- fetch stuff
  const [grade, setgrade] = useState<GradeProps>();  // Grade state

  const [professores, setProfessores] = useState<ProfessoreProps[]>([ // Professores state
    {
      id: 0,
      name: "Selecione um professor",
    },
  ]);

  const [laboratoryData, setLaboratoryData] = useState<any>([]); // Laboratorios state

  //----------------------------------------------------
  const [WeekdayGradeIds, setWeekdayGradeIds] = useState<number[]>([]) // Weekday grade ids state

  const [selectedWeekday, setSelectedWeekday] = useState<string>(''); // Selected weekday state
  const [selectedIds, setSelectedIds] = useState<number[]>([]); // Selected ids state
  const [selectedLaboratory, setSelectedLaboratory] = useState(-1); // Selected laboratory state


  const [selectedProfessor, setSelectedProfessor] = useState<Professor>( // Selected professor state
    {
      id: 0,
      name: "Selecione um professor",
    },
  );
  const [selectedMethod, setSelectedMethod] = useState("semestre"); // Selected method state


  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(setDay(new Date(), 1)); // set to nearest Monday
  const [endDate, setEndDate] = useState<Date | null>(setDay(new Date(), 5)); // set to nearest Friday

  const [selectedSemesterValue, setSelectedSemesterValue] = useState(1)

  useLayoutEffect(() => {
    console.log('Starting to render stuff...');

    if (userData.token === '' || userData.userData.id === 0) {
      console.log('userData is null');

      const localUserData = localStorage.getItem('gerenciamento-de-salas@v1.1');
      const userDataJson = JSON.parse(localUserData || '{}');
      const { userData: storedUserData, token } = userDataJson;

      console.log('userData' + storedUserData);
      console.log('token' + token);

      if (token == null || localUserData == null) {
        toast.error('Você precisa estar logado para acessar essa página!');
        localStorage.removeItem('gerenciamento-de-salas@v1.1');
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        console.log('userDataJson: ' + JSON.stringify(userDataJson, null, 2));
        setUserData(userDataJson);
        setUserRole(userDataJson.userData.role);
      }
    }
  }, [userData]);

  useEffect(() => {
    if (userData.token !== '' && userData.userData.id !== 0) {

      //i will implement a new fetch for when 
      //the laboratory pickage is selested and must listen fot that change

      fetchLaboratoryData();

      if (selectedMethod == "professor")
        fetchProfessorData();
      else {
        fetchSemestreData();
      }

      fetchProfessors(userData.token);

      if (userRole === 'professor' && userData.userData.id == 0) {
        setProfessorAsSelected(userData.userData.name, userData.userData.id);
      }
      console.log(selectedProfessor);
    }
  }, [userData, selectedProfessor, selectedMethod, selectedSemesterValue, selectedLaboratory, selectedDate]);

  const setProfessorAsSelected = (userName: string, userId: number) => {
    const matchingProfessor = professores.find(
      (professor) => professor.id === userId && professor.name === userName
    );

    if (matchingProfessor) {
      // Replace "setSelectedProfessor" with the function you use to set the selected professor in your state
      setSelectedProfessor(matchingProfessor);
    }
  };

  //---------------------------------------------------- FETCH FUNCTIONS ----------------------------------------------------

  async function fetchProfessors(token: string) {
    console.log("Fetching fetchProfessors...")

    // console.log(process.env.REACT_APP_API_KEY)

    await fetch(`http://localhost:3333/professors`, {
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
    fetch('http://localhost:3333/grade/dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        semestre: selectedSemesterValue || 1, //add localStorage later
      })
    }).then((response) => response.json()).then((data) => {
      // console.log(data)
      const transformedData = groupByWeekday(data)
      // console.log("Transformed Data :" + JSON.stringify(transformedData, null, 2))
      printGradeValue(transformedData)
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
    console.log("Fetching fetchGrades...")
    fetch('http://localhost:3333/grade/agendamentos', {
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
      printGradeValue(transformedData)

      setTimeout(() => {
        setLoading(true) // teste de loading
      }, 2000)

      // setLoading(true)
      return setgrade(transformedData as any)
    }
    )
  }

  async function fetchLaboratoryData() {
    console.log("Fetching fetchLaboratoryData...")
    fetch('http://localhost:3333/laboratoriosschedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: selectedDate,
      })
    }).then((response) => response.json()).then((data) => {
      console.log(data)


      setTimeout(() => {
        setLoading(true) // teste de loading
      }, 2000)

      // setLoading(true)
      return setLaboratoryData(data as any)
    }
    )
  }

  //---------------------------------------------------- GROUP BY FUNCTIONS ----------------------------------------------------

  // const [monday, friday] = getWeekDays(startDate, endDate);

  // function getWeekDays(startDate: Date, endDate: Date): [Date, Date] { // get nearest Monday and Friday
  //   const startOfWeekDate = startOfWeek(startDate, { weekStartsOn: 1 });
  //   console.log(startOfWeekDate)
  //   const endOfWeekDate = endOfWeek(endDate, { weekStartsOn: 1 });
  //   const monday = setDay(startOfWeekDate, 1);
  //   const friday = setDay(endOfWeekDate, 5);
  //   console.log("Monday: " + monday)
  //   console.log("Friday: " + friday)
  //   return [monday, friday];
  // }

  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  const mapWeekdayToNumber = (weekday: string) => {
    switch (weekday) {
      case 'Segunda-feira':
        return 1
      case 'Terça-feira':
        return 2
      case 'Quarta-feira':
        return 3
      case 'Quinta-feira':
        return 4
      case 'Sexta-feira':
        return 5
      default:
        return 0
    }
  }

  const handleWeekdaySelection = (weekDay: string, dayInfo: object, startDate: any) => {
    console.log("Startdate selected: " + startDate)
    console.log(weekDay)
    console.log(dayInfo)
    const gradeIds = extractGradeId(dayInfo)
    console.log(gradeIds)

    // map weekday string to weekday number

    const weekdayNumber = mapWeekdayToNumber(weekDay)
    console.log("weekdayNumber selected: " + weekdayNumber)

    // use the day of the week to store the date to the setSelectedDate

    const date = setDay(startDate, weekdayNumber)

    console.log("Date: " + date)

    setSelectedDate(date)

    setWeekdayGradeIds(gradeIds)

    setSelectedWeekday(weekDay)

    setSelectingLaboratory(true)
  }

  const handleConfirmClick = () => {
    if (selectedIds.length === 0) {
      toast.error('Selecione pelo menos um horário para agendar')
      return
    }
    if (selectedLaboratory === -1) {
      toast.error('Selecione um laboratório para agendar')
      return
    }

    console.log("Button clicked");
    setModalVisible(true);
  };

  const handleCancelClick = () => {
    console.log("Cancel clicked");
    setSelectingLaboratory(false)
    setModalVisible(false);
  };

  const handleCloseModal = (resetParams: boolean) => {
    if (resetParams) {
      setSelectedIds([])
      setSelectedLaboratory(-1)
      setConfetti(true);
    }
    setSelectingLaboratory(false)
    setModalVisible(false);
  };

  function setloggedUserGrade(userData: any) {
    //check if userData.name is inside professors array and set selected professor acordingly

    console.log("userData.name: " + userData.name)

    const professorNameExists = professores.find(professor => professor.name === userData.name)

    if (professorNameExists) {
      console.log("Professor Name Exists")
      setSelectedProfessor(professorNameExists)
    }
    else {
      console.log("Professor Name does not exist")
    }

  }

  const handleSelection = (id: number, labId: number) => {
    // console.log(id)
    // console.log(selectedIds)
    console.log("LaboratoryID= " + labId)

    if (labId !== selectedLaboratory) {
      // console.log("Different Laboratory")
      setSelectedLaboratory(labId)
      // clear selectedIds
      setSelectedIds([id])
    } else if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      const newSelectedIds = [...selectedIds, id].sort((a, b) => a - b);
      setSelectedIds(newSelectedIds);
    }
  }

  function extractGradeId(grades: any) {
    const gradeIds = [];

    for (let i = 0; i < grades.length; i++) {
      const grade = grades[i];
      if (grade.id) {
        gradeIds.push(grade.id);
      }
    }

    return gradeIds;

  }

  const handleStartDateChange = (date: Date) => {
    const monday = startOfWeek(date, { weekStartsOn: 1 });
    const friday = endOfWeek(date, { weekStartsOn: 6 });
    setStartDate(monday);
    setEndDate(friday);
    setSelectingLaboratory(false)
  };

  const handleEndDateChange = (date: Date) => {
    const monday = startOfWeek(date, { weekStartsOn: 1 });
    const friday = endOfWeek(date, { weekStartsOn: 6 });
    setStartDate(monday);
    setEndDate(friday);
    setSelectingLaboratory(false)
  };

  const selectedDay = (day: string) => {
    console.log("Selected Day: " + day)
    setSelectedWeekday(day)
  }

  const handleSelectToday = () => {
    const today = new Date()
    const monday = startOfWeek(today, { weekStartsOn: 1 });
    const friday = endOfWeek(today, { weekStartsOn: 6 });
    setStartDate(monday);
    setEndDate(friday);
    setSelectingLaboratory(false)
  }

  const handleArrowLeft = () => {
    const startDateTransformed = new Date(startDate as any)
    const endDateTransformed = new Date(endDate as any)
    const monday = subWeeks(startDateTransformed, 1)
    const friday = subWeeks(endDateTransformed, 1)
    setStartDate(monday);

    setEndDate(friday);
    setSelectingLaboratory(false)
  }

  const handleArrowRight = () => {
    const startDateTransformed = new Date(startDate as any)
    const endDateTransformed = new Date(endDate as any)
    const monday = addWeeks(startDateTransformed, 1)
    const friday = addWeeks(endDateTransformed, 1)
    setStartDate(monday);

    setEndDate(friday);
    setSelectingLaboratory(false)
  }

  const handleSemestreChange = (event: any) => {
    setSelectedSemesterValue(event.target.value)
  }

  const renderLoading = () => {
    return (
      <WeekContainer>
        {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'].map((day) => (
          <WeekdayContainer key={day}>
            <WeekDay><PacmanLoader color={Colors.lightgrayInput} size={10} loading /></WeekDay>
            <SchedulesContainer >
              <h2>{day}</h2>
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <Schedule>
                    <PacmanLoader color={Colors.lightgrayInput} size={25} loading />
                  </Schedule>
                ))}
            </SchedulesContainer>
          </WeekdayContainer>
        ))}
      </WeekContainer>
    )
  };
  //#todo

  const handleSelectProfessor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value)

    const professorObject = {
      id: parseInt(event.target.value),
      name: "test"
    }
    setSelectedProfessor(
      professorObject
    )
  }

  const handleMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value)

    setSelectedMethod(event.target.value)

  }

  const getDayBasedOnWeekday = (dayName: string, startDate: any) => {
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

    return `${nextDay.getDate().toString().padStart(2, '0')}/${monthNames[nextDay.getMonth()]}`;
  };

  const GetCurrentMonthAndYear = (date: any) => {
    console.log(date)
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()

    return `${month} de ${year}`
  }

  return (
    <Container>
      <ToastContainer />
      {
        confetti &&
        <Confetti
          width={width}
          height={height}
        />
      }
      <Modal isVisible={modalVisible} onClose={handleCloseModal} WeekdayGradeIds={WeekdayGradeIds} selectedWeekday={selectedWeekday} selectedIds={selectedIds} selectedLaboratory={selectedLaboratory} selectedDate={selectedDate} />
      <Header>
        <CoursesWrapper>
          <CourseName>
            Agendamento de Laboratório
          </CourseName>
          <CourseSemester>
            1º Semestre de 2023
          </CourseSemester>
        </CoursesWrapper>
        <DatePickWrapper>
          <DatepickContainer>
            <DatepickArrowsContainer onClick={() => handleSelectToday()}>
              {/* <DateIcon src={dateIcon} /> */}
              <p>Pular para hoje</p>
            </DatepickArrowsContainer>
            <DatepickArrowsContainer onClick={() => handleArrowLeft()}>
              {/* <DateIcon src={arrowLeft} /> */}
            </DatepickArrowsContainer>
            <DatepickArrowsContainer onClick={() => handleArrowRight()}>
              {/* <DateIcon src={arrowRight} /> */}
            </DatepickArrowsContainer>
            <p>{GetCurrentMonthAndYear(startDate)}</p>
            {/* <DateIcon src={arrowDown} /> */}
            <CalendarWrapper>
              Semana do dia
              <StyledDatePicker selected={startDate} onChange={handleStartDateChange} />
              ao dia
              <StyledDatePicker selected={endDate} onChange={handleEndDateChange} />
            </CalendarWrapper>
            {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
          </DatepickContainer>
          <SelectingLaboratoryWrapper>
            <FiFilter
              size={20}
            />
            {
              selectingLaboratory == true ?
                <>
                  <ButtonConfimarAgendamento onClick={handleConfirmClick}>Confirmar Agendamento</ButtonConfimarAgendamento>
                  <ButtonConfimarAgendamento onClick={handleCancelClick}>Cancelar</ButtonConfimarAgendamento>
                </>
                :
                <>
                  <StyledSelect value={selectedMethod} onChange={handleMethodChange}>
                    <option value="professor">
                      Professor
                    </option>
                    <option value="semestre">
                      Semestre
                    </option>
                  </StyledSelect>
                  {
                    selectedMethod === "professor" ?
                      <StyledSelect defaultValue={selectedProfessor.name} onChange={handleSelectProfessor}>
                        {
                          professores && professores.length > 0 ? (
                            professores.map((professor) => {
                              return (
                                <option key={professor.id} value={professor.id}>
                                  {professor.name}
                                </option>
                              );
                            })
                          ) : (
                            <option value="">No professors available</option>
                          )
                        }
                      </StyledSelect>
                      :
                      <StyledSelect defaultValue={selectedSemesterValue} onChange={handleSemestreChange}>
                        <option value="1">
                          1º
                        </option>
                        <option value="2">
                          2º
                        </option>
                        <option value="3">
                          3º
                        </option>
                        <option value="4">
                          4º
                        </option>
                        <option value="5">
                          5º
                        </option>
                        <option value="6">
                          6º
                        </option>
                      </StyledSelect>
                  }
                </>
            }
          </SelectingLaboratoryWrapper>
        </DatePickWrapper>
      </Header>
      {
        selectingLaboratory ?
          <Laboratorios>
            <ClockContainer>
              <p>Primeira Aula</p>
              <p>Segunda Aula</p>
              <p>Terceira Aula</p>
              <p>Quarta Aula</p>
              <p>Quinta Aula</p>
            </ClockContainer>
            {
              loading
                &&
                grade
                ?
                (
                  <WeekContainer>
                    <WeekdayContainer>
                      <SchedulesContainer>
                        <h2>LAB 1</h2>
                        {
                          laboratoryData.laboratorio1.map((item: any) => {
                            return (
                              <Laboratorio key={item.id} selected={selectedIds.includes(item.id)} onClick={() => handleSelection(item.id, 21)}>
                                {/* "id": 1,
                                    "disponivel": false,
                                    "agendamento": {
                                        "id": 56,
                                        "date": "2023-05-10T23:37:41.597Z",
                                        "horario_inicio": "18:45",
                                        "horario_fim": "19:35",
                                        "id_professor": "12",
                                        "id_grade": "36",
                                        "id_laboratorio": "5",
                                        "created_at": "2023-05-11T23:38:31.113Z",
                                        "updated_at": "2023-05-11T23:38:31.113Z"
                                 } */}
                                <p>{item.disponivel ? "Disponível" : "Indisponível"}</p>
                                <p>{item.agendamento && item.agendamento.id}</p>
                                <p>{item.agendamento && item.agendamento.professor_name}</p>

                                {/* {
                                  item.agendamento &&  item.agendamento.id && (
                                    <>
                                     <p>{item.agendamento.id}</p>
                                    </>
                                  )
                                } */}
                              </Laboratorio>
                            )
                          })
                        }
                      </SchedulesContainer>
                    </WeekdayContainer>
                    <WeekdayContainer>
                      <SchedulesContainer>
                        <h2>LAB 2</h2>
                        {
                          laboratoryData.laboratorio2.map((item: any) => {
                            return (
                              <Laboratorio key={item.id} selected={selectedIds.includes(item.id)} onClick={() => handleSelection(item.id, 22)}>
                                <p>{item.disponivel ? "Disponivel" : "Indisponivel"}</p>
                                <p>{item.agendamento && item.agendamento.id}</p>
                              </Laboratorio>
                            )
                          })
                        }
                      </SchedulesContainer>
                    </WeekdayContainer>
                    <WeekdayContainer>
                      <SchedulesContainer>
                        <h2>LAB 3</h2>
                        {
                          laboratoryData.laboratorio3.map((item: any) => {
                            return (
                              <Laboratorio key={item.id} selected={selectedIds.includes(item.id)} onClick={() => handleSelection(item.id, 23)}>
                                <p>{item.disponivel ? "Disponivel" : "Indisponivel"}</p>
                                <p>{item.agendamento && item.agendamento.id}</p>
                              </Laboratorio>
                            )
                          })
                        }
                      </SchedulesContainer>
                    </WeekdayContainer>
                    <WeekdayContainer>
                      <SchedulesContainer>
                        <h2>LAB 4</h2>
                        {
                          laboratoryData.laboratorio4.map((item: any) => {
                            return (
                              <Laboratorio key={item.id} selected={selectedIds.includes(item.id)} onClick={() => handleSelection(item.id, 24)}>
                                <p>{item.disponivel ? "Disponivel" : "Indisponivel"}</p>
                                <p>{item.agendamento && item.agendamento.id}</p>
                              </Laboratorio>
                            )
                          })
                        }
                      </SchedulesContainer>
                    </WeekdayContainer>
                    <WeekdayContainer>
                      <SchedulesContainer>
                        <h2>LAB 5</h2>
                        {
                          laboratoryData.laboratorio5.map((item: any) => {
                            return (
                              <Laboratorio key={item.id} selected={selectedIds.includes(item.id)} onClick={() => handleSelection(item.id, 25)}>
                                <p>{item.disponivel ? "Disponivel" : "Indisponivel"}</p>
                                <p>{item.agendamento && item.agendamento.id}</p>
                              </Laboratorio>
                            )
                          })
                        }
                      </SchedulesContainer>
                    </WeekdayContainer>
                    <WeekdayContainer>
                      <SchedulesContainer>
                        <h2>LAB 6</h2>
                        {
                          laboratoryData.laboratorio6.map((item: any) => {
                            return (
                              <Laboratorio key={item.id} selected={selectedIds.includes(item.id)} onClick={() => handleSelection(item.id, 26)}>
                                <p>{item.disponivel ? "Disponivel" : "Indisponivel"}</p>
                                <p>{item.agendamento && item.agendamento.id}</p>
                              </Laboratorio>
                            )
                          })
                        }
                      </SchedulesContainer>
                    </WeekdayContainer>
                    <WeekdayContainer>
                      <SchedulesContainer>
                        <h2>Sala Maker</h2>
                        {
                          laboratoryData.laboratorio7.map((item: any) => {
                            return (
                              <Laboratorio key={item.id} selected={selectedIds.includes(item.id)} onClick={() => handleSelection(item.id, 27)}>
                                <p>{item.disponivel ? "Disponivel" : "Indisponivel"}</p>
                                <p>{item.agendamento && item.agendamento.id}</p>
                              </Laboratorio>
                            )
                          })
                        }
                      </SchedulesContainer>
                    </WeekdayContainer>
                  </WeekContainer>
                ) : (
                  renderLoading()
                )
            }
          </Laboratorios>
          :
          <ClassesContainer>
            <ClockContainer>
              <p>18:45</p>
              <p>19:35</p>
              <p>20:25</p>
              <p>20:35</p>
              <p>21:25</p>
              <p>22:15</p>
            </ClockContainer>
            {
              loading
                &&
                grade
                ?
                (
                  <WeekContainer>
                    <WeekdayContainer>
                      <WeekDay>{getDayBasedOnWeekday("Segunda", startDate)}</WeekDay>
                      <SchedulesContainer>
                        <h2>Segunda</h2>
                        {
                          grade.segunda.map((item: gradeData) => (
                            item.disciplina === "Nenhuma Aula" ?
                              <Schedule>
                                <NenhumaAulaText>{item.disciplina}</NenhumaAulaText>
                                <Professor>{item.professor}</Professor>
                                <div>
                                  {item.semestre && <Semestre>{item.semestre}° Semestre</Semestre>}
                                  <Semestre>{item.laboratorio}</Semestre>
                                </div>
                              </Schedule>
                              :
                              <Schedule onClick={() => handleWeekdaySelection("Segunda-feira", grade.segunda, startDate)} key={item.id}>
                                <DisciplinaText>{item.disciplina}</DisciplinaText>
                                <Professor>{item.professor}</Professor>
                                <div>
                                  {item.semestre && <Semestre>{item.semestre}° Semestre</Semestre>}
                                  <LaboratorioText>{item.laboratorio}</LaboratorioText>
                                </div>
                              </Schedule>
                          ))
                        }
                      </SchedulesContainer>
                    </WeekdayContainer>
                    <WeekdayContainer>
                      <WeekDay>{getDayBasedOnWeekday("Terça", startDate)}</WeekDay>
                      <SchedulesContainer>
                        <h2>Terça</h2>
                        {
                          grade.terca.map((item: gradeData) => {
                            return (
                              item.disciplina === "Nenhuma Aula" ?
                                <Schedule>
                                  <NenhumaAulaText>{item.disciplina}</NenhumaAulaText>
                                  <Professor>{item.professor}</Professor>
                                  <div>
                                    {item.semestre && <Semestre>{item.semestre}° Semestre</Semestre>}
                                    <Semestre>{item.laboratorio}</Semestre>
                                  </div>
                                </Schedule>
                                :
                                <Schedule onClick={() => handleWeekdaySelection("Terça-feira", grade.terca, startDate)} key={item.id}>
                                  <DisciplinaText>{item.disciplina}</DisciplinaText>
                                  <Professor>{item.professor}</Professor>
                                  <div>
                                    {item.semestre && <Semestre>{item.semestre}° Semestre</Semestre>}
                                    <LaboratorioText>{item.laboratorio}</LaboratorioText>
                                  </div>
                                </Schedule>
                            )
                          })
                        }
                      </SchedulesContainer>
                    </WeekdayContainer>
                    <WeekdayContainer>
                      <WeekDay>{getDayBasedOnWeekday("Quarta", startDate)}</WeekDay>
                      <SchedulesContainer>
                        <h2>Quarta</h2>
                        {
                          grade.quarta.map((item: gradeData) => {
                            return (
                              item.disciplina === "Nenhuma Aula" ?
                                <Schedule>
                                  <NenhumaAulaText>{item.disciplina}</NenhumaAulaText>
                                  <Professor>{item.professor}</Professor>
                                  <div>
                                    {item.semestre && <Semestre>{item.semestre}° Semestre</Semestre>}
                                    <Semestre>{item.laboratorio}</Semestre>
                                  </div>
                                </Schedule>
                                :
                                <Schedule onClick={() => handleWeekdaySelection("Quarta-feira", grade.quarta, startDate)} key={item.id}>
                                  <DisciplinaText>{item.disciplina}</DisciplinaText>
                                  <Professor>{item.professor}</Professor>
                                  <div>
                                    {item.semestre && <Semestre>{item.semestre}° Semestre</Semestre>}
                                    <LaboratorioText>{item.laboratorio}</LaboratorioText>
                                  </div>
                                </Schedule>
                            )
                          })
                        }
                      </SchedulesContainer>
                    </WeekdayContainer>
                    <WeekdayContainer>
                      <WeekDay>{getDayBasedOnWeekday("Quinta", startDate)}</WeekDay>
                      <SchedulesContainer>
                        <h2>Quinta</h2>
                        {
                          grade.quinta.map((item: gradeData) => {
                            return (
                              item.disciplina === "Nenhuma Aula" ?
                                <Schedule>
                                  <NenhumaAulaText>{item.disciplina}</NenhumaAulaText>
                                  <Professor>{item.professor}</Professor>
                                  <div>
                                    {item.semestre && <Semestre>{item.semestre}° Semestre</Semestre>}
                                    <Semestre>{item.laboratorio}</Semestre>
                                  </div>
                                </Schedule>
                                :
                                <Schedule onClick={() => handleWeekdaySelection("Quinta-feira", grade.quinta, startDate)} key={item.id}>
                                  <DisciplinaText>{item.disciplina}</DisciplinaText>
                                  <Professor>{item.professor}</Professor>
                                  <div>
                                    {item.semestre && <Semestre>{item.semestre}° Semestre</Semestre>}
                                    <LaboratorioText>{item.laboratorio}</LaboratorioText>
                                  </div>
                                </Schedule>
                            )
                          })
                        }
                      </SchedulesContainer>
                    </WeekdayContainer>
                    <WeekdayContainer>
                      <WeekDay>{getDayBasedOnWeekday("Sexta", startDate)}</WeekDay>
                      <SchedulesContainer>
                        <h2>Sexta</h2>
                        {
                          grade.sexta.map((item: gradeData) => {
                            return (
                              item.disciplina === "Nenhuma Aula" ?
                                <Schedule>
                                  <NenhumaAulaText>{item.disciplina}</NenhumaAulaText>
                                  <Professor>{item.professor}</Professor>
                                  <div>
                                    {item.semestre && <Semestre>{item.semestre}° Semestre</Semestre>}
                                    <Semestre>{item.laboratorio}</Semestre>
                                  </div>
                                </Schedule>
                                :
                                <Schedule onClick={() => handleWeekdaySelection("Sexta-feira", grade.sexta, startDate)} key={item.id}>
                                  <DisciplinaText>{item.disciplina}</DisciplinaText>
                                  <Professor>{item.professor}</Professor>
                                  <div>
                                    {item.semestre && <Semestre>{item.semestre}° Semestre</Semestre>}
                                    <LaboratorioText>{item.laboratorio}</LaboratorioText>
                                  </div>
                                </Schedule>
                            )
                          })
                        }
                      </SchedulesContainer>
                    </WeekdayContainer>
                  </WeekContainer>
                ) : (
                  renderLoading()
                )
            }

          </ClassesContainer>
      }
    </Container >
  )
}

export default Agendamentos
