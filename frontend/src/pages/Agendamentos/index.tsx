import React, { useEffect, useState, useLayoutEffect } from 'react'

import { Navigate } from 'react-router-dom'

import DatePicker from "react-datepicker";

import { useWindowSize } from 'react-use';

import Confetti from 'react-confetti';

import { ToastContainer, toast } from 'react-toastify';

import { startOfWeek, endOfWeek, setDay, addDays, subWeeks, addWeeks } from 'date-fns';

import "react-datepicker/dist/react-datepicker.css";

import { mockdata } from './mockdata'

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
  Semester,
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
  ProfessorSelect,
  WeekDay
}
  from './Agendamento.styles'

import Calendar from '../Components/Laboratorios/Calendar'

import dateIcon from '../../../public/images/dia_de_hoje.png';
import arrowLeft from '../../../public/images/pickDateIcons/arrow_left.svg';
import arrowRight from '../../../public/images/pickDateIcons/arrow_right.svg';
import arrowDown from '../../../public/images/pickDateIcons/arrow_down.svg';
import Modal from '../Components/Modal';
import set from 'date-fns/set';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { Colors } from '../../colors';
import { MdToken } from 'react-icons/md';

interface LaboratorioData {
  disponivel: boolean;
  id: number;
 agendamento: any;
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

const Agendamentos: React.FC = () => {
  const [confetti, setConfetti] = useState(false);

  const { width, height } = useWindowSize()

  const [grade, setgrade] = useState<GradeProps>();

  const [loading, setLoading] = useState(false);

  const [selectingLaboratory, setSelectingLaboratory] = useState(false)

  const [modalVisible, setModalVisible] = useState(false);

  const [WeekdayGradeIds, setWeekdayGradeIds] = useState<number[]>([])
  const [selectedWeekday, setSelectedWeekday] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedLaboratory, setSelectedLaboratory] = useState(-1);

  const [userRole, setUserRole] = useState('');

  const [userData, setUserData] = useState(
    {
      userData: {
        id: 0,
        name: "Selecione um professor",
      },
      token: ""
    }
  );

  const [professores, setProfessores] = useState<ProfessoreProps[]>([
    {
      id: 0,
      name: "Selecione um professor",
    },
  ]);

  const [selectedProfessor, setSelectedProfessor] = useState<Professor>(
    {
      id: 0,
      name: "Selecione um professor",
    },
  );

  const [selectedMethod, setSelectedMethod] = useState("professor");

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(setDay(new Date(), 1)); // set to nearest Monday
  const [endDate, setEndDate] = useState<Date | null>(setDay(new Date(), 5)); // set to nearest Friday

  const [selectedSemestreValue, setSelectedSemestreValue] = useState(1)

  const [firstRender, setFirstRender] = useState(true)

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
  }, [userData, selectedProfessor, selectedMethod, selectedSemestreValue]);

  const setProfessorAsSelected = (userName: string, userId: number) => {
    const matchingProfessor = professores.find(
      (professor) => professor.id === userId && professor.name === userName
    );

    if (matchingProfessor) {
      // Replace "setSelectedProfessor" with the function you use to set the selected professor in your state
      setSelectedProfessor(matchingProfessor);
    }
  };

  async function fetchProfessors(token: string) {
    console.log("Fetching fetchProfessors...")
    await fetch('http://localhost:3333/professors', {
      method: 'POST',
      headers: {
        'Authorization': 'bearer ' + token,
      }
    }).then((response) => response.json()).then((data) => {
      // console.log(data)
      return setProfessores(data)
    });
  }

  async function fetchSemestreData() {
    fetch('http://localhost:3333/grade/dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        semestre: selectedSemestreValue || 1, //add localStorage later
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
        semestre: "1", //add localStorage later
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
    // console.log("LaboratoryID= "+labId)

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
    setSelectedSemestreValue(event.target.value)
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

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
    
    if(dayIndex === -1) {
        throw new Error('Invalid day name');
    }
    
    const currentDay = startDate.getDay();
    const daysUntilNext = (dayIndex - currentDay + 7) % 7;
    
    const nextDay = new Date(startDate.getTime());
    nextDay.setDate(startDate.getDate() + daysUntilNext);

    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    return `${nextDay.getDate().toString().padStart(2, '0')}/${monthNames[nextDay.getMonth()]}`;
};

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
              <DateIcon src={dateIcon} />
              <p>Pular para hoje</p>
            </DatepickArrowsContainer>
            <DatepickArrowsContainer onClick={() => handleArrowLeft()}>
              <DateIcon src={arrowLeft} />
            </DatepickArrowsContainer>
            <DatepickArrowsContainer onClick={() => handleArrowRight()}>
              <DateIcon src={arrowRight} />
            </DatepickArrowsContainer>
            <p>Março 2023</p>
            <DateIcon src={arrowDown} />
            <CalendarWrapper>
              Semana do dia
              <StyledDatePicker selected={startDate} onChange={handleStartDateChange} />
              ao dia
              <StyledDatePicker selected={endDate} onChange={handleEndDateChange} />

              {
                selectingLaboratory == true ?
                  <>
                    <button onClick={handleConfirmClick}>Confirmar Agendamento</button>
                    <button onClick={handleCancelClick}>Cancelar</button>
                  </>
                  :
                  <>
                    <ProfessorSelect value={selectedMethod} onChange={handleMethodChange}>
                      <option value="professor">
                        Professor
                      </option>
                      <option value="semestre">
                        Semestre
                      </option>
                    </ProfessorSelect>
                    {
                      selectedMethod === "professor" ?
                        <ProfessorSelect defaultValue={selectedProfessor.name} onChange={handleSelectChange}>
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
                        </ProfessorSelect>
                        :
                        <ProfessorSelect value={selectedProfessor.name} onChange={handleSemestreChange}>
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
                        </ProfessorSelect>
                    }
                  </>

              }
            </CalendarWrapper>
            {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
          </DatepickContainer>

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
                      <h2>LAB 1</h2>
                      <SchedulesContainer>
                        {
                          mockdata.laboratorio1.map((item: LaboratorioData) => {
                            return (
                              <Laboratorio key={item.id} selected={selectedIds.includes(item.id)} onClick={() => handleSelection(item.id, 1)}>
                                <p>{item.disponivel ? "Disponivel" : "Indisponivel"}</p>
                                <p>{item.professor}</p>
                                <p>{item.laboratorio}</p>
                              </Laboratorio>
                            )
                          })
                        }
                      </SchedulesContainer>
                    </WeekdayContainer>
                    <WeekdayContainer>
                      <h2>LAB 2</h2>
                      <SchedulesContainer>
                        {
                          mockdata.laboratorio2.map((item: LaboratorioData) => {
                            return (
                              <Laboratorio key={item.id} selected={selectedIds.includes(item.id)} onClick={() => handleSelection(item.id, 2)}>
                                <p>{item.disciplina}</p>
                                <p>{item.professor}</p>
                                <p>{item.laboratorio}</p>
                              </Laboratorio>
                            )
                          })
                        }
                      </SchedulesContainer>
                    </WeekdayContainer>
                    <WeekdayContainer>
                      <h2>LAB 3</h2>
                      <SchedulesContainer>
                        {
                          mockdata.laboratorio3.map((item: LaboratorioData) => {
                            return (
                              <Laboratorio key={item.id} selected={selectedIds.includes(item.id)} onClick={() => handleSelection(item.id, 3)}>
                                <p>{item.disciplina}</p>
                                <p>{item.professor}</p>
                                <p>{item.laboratorio}</p>
                              </Laboratorio>
                            )
                          })
                        }
                      </SchedulesContainer>
                    </WeekdayContainer>
                    <WeekdayContainer>
                      <h2>LAB 4</h2>
                      <SchedulesContainer>
                        {
                          mockdata.laboratorio4.map((item: LaboratorioData) => {
                            return (
                              <Laboratorio key={item.id} selected={selectedIds.includes(item.id)} onClick={() => handleSelection(item.id, 4)}>
                                <p>{item.disciplina}</p>
                                <p>{item.professor}</p>
                                <p>{item.laboratorio}</p>
                              </Laboratorio>
                            )
                          })
                        }
                      </SchedulesContainer>
                    </WeekdayContainer>
                    <WeekdayContainer>
                      <h2>LAB 5</h2>
                      <SchedulesContainer>
                        {
                          mockdata.laboratorio5.map((item: LaboratorioData) => {
                            return (
                              <Laboratorio key={item.id} selected={selectedIds.includes(item.id)} onClick={() => handleSelection(item.id, 5)}>
                                <p>{item.disciplina}</p>
                                <p>{item.professor}</p>
                                <p>{item.laboratorio}</p>
                              </Laboratorio>
                            )
                          })
                        }
                      </SchedulesContainer>
                    </WeekdayContainer>
                    <WeekdayContainer>
                      <h2>LAB 6</h2>
                      <SchedulesContainer>
                        {
                          mockdata.laboratorio6.map((item: LaboratorioData) => {
                            return (
                              <Laboratorio key={item.id} selected={selectedIds.includes(item.id)} onClick={() => handleSelection(item.id, 6)}>
                                <p>{item.disciplina}</p>
                                <p>{item.professor}</p>
                                <p>{item.laboratorio}</p>
                              </Laboratorio>
                            )
                          })
                        }
                      </SchedulesContainer>
                    </WeekdayContainer>
                    <WeekdayContainer>
                      <h2>Sala Maker</h2>
                      <SchedulesContainer>
                        {
                          mockdata.salamaker.map((item: LaboratorioData) => {
                            return (
                              <Laboratorio key={item.id} selected={selectedIds.includes(item.id)} onClick={() => handleSelection(item.id, 7)}>
                                <p>{item.disciplina}</p>
                                <p>{item.professor}</p>
                                <p>{item.laboratorio}</p>
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
                      <WeekDay>{getDayBasedOnWeekday("Segunda", startDate) }</WeekDay>
                      <SchedulesContainer>
                      <h2>Segunda</h2>
                        {
                          grade.segunda.map((item: gradeData) => {
                            return (
                              <Schedule onClick={() => handleWeekdaySelection("Segunda-feira", grade.segunda, startDate)} key={item.id}>
                                <p>{item.disciplina}</p>
                                <p>{item.professor}</p>
                                <div>
                                  {
                                    item.semestre && <p>{item.semestre}° Semestre</p>
                                  }
                                  <p>{item.laboratorio}</p>
                                </div>
                              </Schedule>
                            )
                          })
                        }
                      </SchedulesContainer>
                    </WeekdayContainer>
                    <WeekdayContainer>
                    <WeekDay>{getDayBasedOnWeekday("Terça", startDate) }</WeekDay>
                      <SchedulesContainer>
                      <h2>Terça</h2>
                        {
                          grade.terca.map((item: gradeData) => {
                            return (
                              <Schedule onClick={() => handleWeekdaySelection("Terça-feira", grade.terca, startDate)} key={item.id}>
                                <p>{item.disciplina}</p>
                                <p>{item.professor}</p>
                                <div>
                                  {
                                    item.semestre && <p>{item.semestre}° Semestre</p>
                                  }
                                  <p>{item.laboratorio}</p>
                                </div>
                              </Schedule>
                            )
                          })
                        }
                      </SchedulesContainer>
                    </WeekdayContainer>
                    <WeekdayContainer>
                    <WeekDay>{getDayBasedOnWeekday("Quarta", startDate) }</WeekDay>
                      <SchedulesContainer>
                      <h2>Quarta</h2>
                        {
                          grade.quarta.map((item: gradeData) => {
                            return (
                              <Schedule onClick={() => handleWeekdaySelection("Quarta-feira", grade.quarta, startDate)} key={item.id}>
                                <p>{item.disciplina}</p>
                                <p>{item.professor}</p>
                                <div>
                                  {
                                    item.semestre && <p>{item.semestre}° Semestre</p>
                                  }
                                  <p>{item.laboratorio}</p>
                                </div>
                              </Schedule>
                            )
                          })
                        }
                      </SchedulesContainer>
                    </WeekdayContainer>
                    <WeekdayContainer>
                    <WeekDay>{getDayBasedOnWeekday("Quinta", startDate) }</WeekDay>
                      <SchedulesContainer>
                      <h2>Quinta</h2>
                        {
                          grade.quinta.map((item: gradeData) => {
                            return (
                              <Schedule onClick={() => handleWeekdaySelection("Quinta-feira", grade.quinta, startDate)} key={item.id}>
                                <p>{item.disciplina}</p>
                                <p>{item.professor}</p>
                                <div>
                                  {
                                    item.semestre && <p>{item.semestre}° Semestre</p>
                                  }
                                  <p>{item.laboratorio}</p>
                                </div>
                              </Schedule>
                            )
                          })
                        }
                      </SchedulesContainer>
                    </WeekdayContainer>
                    <WeekdayContainer>
                    <WeekDay>{getDayBasedOnWeekday("Sexta", startDate) }</WeekDay>
                      <SchedulesContainer>
                      <h2>Sexta</h2>
                        {
                          grade.sexta.map((item: gradeData) => {
                            return (
                              <Schedule onClick={() => handleWeekdaySelection("Sexta-feira", grade.sexta, startDate)} key={item.id}>
                                <p>{item.disciplina}</p>
                                <p>{item.professor}</p>
                                <div>
                                  {
                                    item.semestre && <p>{item.semestre}° Semestre</p>
                                  }
                                  <p>{item.laboratorio}</p>
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
