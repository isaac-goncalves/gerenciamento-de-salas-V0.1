import React, { useEffect, useState } from 'react'

import { Navigate } from 'react-router-dom'

import PacmanLoader from 'react-spinners/PacmanLoader';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Colors } from '../../colors';

import { toast, ToastContainer } from 'react-toastify';

import { startOfWeek, endOfWeek, setDay, addDays, subWeeks, addWeeks } from 'date-fns';

import 'react-toastify/dist/ReactToastify.css';

import { Container, Header, CourseName, Semester, ClassesContainer, ClockContainer, WeekdayContainer, SchedulesContainer, Schedule, WeekContainer, CourseSemester, DatePicker, DateIcon, CoursesWrapper, DatePickWrapper, DatepickContainer, Sala, Disciplina, Professor, SalaAgendada, SalaWrapper, DatepickArrowsContainer, CalendarWrapper, StyledDatePicker, WeekDay } from './Dashboard.styles'

import dateIcon from '../../../public/images/dia_de_hoje.png';
import arrowLeft from '../../../public/images/pickDateIcons/arrow_left.svg';
import arrowRight from '../../../public/images/pickDateIcons/arrow_right.svg';
import arrowDown from '../../../public/images/pickDateIcons/arrow_down.svg';
import { MdKeyboardArrowRight, MdKeyboardDoubleArrowRight, MdSubdirectoryArrowRight } from 'react-icons/md';


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

interface IntervalItem {
  semestre: string;
  disciplina: string;
}

type GroupedData = {
  [key: string]: Array<ScheduleItem | IntervalItem>;
}

function groupByWeekday(data: ScheduleItem[]): GroupedData {
  const groupedData: GroupedData = {};
  const daysOfWeek = ["segunda", "terca", "quarta", "quinta", "sexta"];

  for (const item of data) {
    const dayIndex = parseInt(item.dia_da_semana) - 1;
    const day = daysOfWeek[dayIndex];

    if (!groupedData[day]) {
      groupedData[day] = [];
    }

    groupedData[day].push(item);
  }

  for (const day in groupedData) {
    if (groupedData[day].length >= 3) {
      groupedData[day].splice(2, 0, {
        semestre: "1",
        disciplina: "Intervalo",
      });
    }
  }

  return groupedData;
}

function printGradeValue(gradeValue: any) {

  // console.log("Grade Value: " + JSON.stringify(gradeValue, null, 2))

}


const Dashboard: React.FC = () => {
  const [grade, setgrade] = useState<any>();

  const [selectedSemesterValue, setSelectedSemesterValue] = useState(1)
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const [currentDay, setCurrentDay] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  const [startDate, setStartDate] = useState<Date | null>(setDay(new Date(), 1)); // set to nearest Monday
  const [endDate, setEndDate] = useState<Date | null>(setDay(new Date(), 5)); // set to nearest Friday

  const handleChange = (event: any) => {
    setSelectedSemesterValue(event.target.value)
  }

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

  useEffect(() => {
    console.log("Verificando usuário")

    function verifyUser() {

      const localUserData = localStorage.getItem('gerenciamento-de-salas@v1.1');

      const userDataJson = JSON.parse(localUserData || '{}');

      const token = userDataJson.token;
      const userData = userDataJson.userData;

      console.log("token" + token)
      console.log("userData" + userData)

      // setloggedUserGrade(userData)

      if (token == null || userData == null) {
        toast.error('Você precisa estar logado para acessar essa página!');
        localStorage.removeItem('gerenciamento-de-salas@v1.1');
        setTimeout(() => {
          window.location.href = "/";
        }, 2000)
      }
      else {
        fetch('http://localhost:3333/verify', {
          method: 'POST',
          headers: {
            "Authorization": "Bearer " + token,
          },
        }).then((response) => response.json())
          .then((data) => {
            console.log(data)

            if (data.error) {
              console.log("Error exists:", data.error);
              localStorage.removeItem('gerenciamento-de-salas@v1.1');
              toast.error('Você precisa estar logado para acessar essa página!');
              setTimeout(() => {
                window.location.href = "/";
              }, 2000)
            }
            else {
              setSelectedSemesterValue(userData.semestre)
            }
          }
          )
      }
    }
    verifyUser()

  }, []);

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

    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    setLoading(false)
    fetchData();
  }, [selectedSemesterValue])

  async function fetchData() {
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
      return setgrade(transformedData)
    }
    )
  }

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

  const renderWeekday = (dayName: string, dayData: any) => (
    <WeekdayContainer>
      <WeekDay>{getDayBasedOnWeekday(dayName, startDate)}</WeekDay>
      <SchedulesContainer isCurrentDay={currentDay === dayName}>
        <h2>{dayName}</h2>
        {dayData.map((item: any) => {
          const {
            disciplina,
            professor,
            laboratorio,
            agendamentos,
          } = item;

          const agendamento = agendamentos && agendamentos.length > 0 ? agendamentos[0] : null;
          const isCurrentTime = false
          // isWithinClassTime(item.horario_inicio, item.horario_fim);

          // console.log(isCurrentTime)
          // console.log(currentTime)

          return (
            <Schedule isCurrentTime={isCurrentTime}
              className={isCurrentTime ? '' : 'hoverEffect'}>
              <Disciplina>{disciplina}</Disciplina>
              <Professor>{professor}</Professor>
              <SalaWrapper>
                <Sala agendamento={agendamento}>{laboratorio}</Sala>
                {agendamento && agendamento.laboratorio && (
                  <>
                    <MdKeyboardDoubleArrowRight />
                    <SalaAgendada>{agendamento.laboratorio}</SalaAgendada>
                  </>
                )}
              </SalaWrapper>
            </Schedule>
          );
        })}
      </SchedulesContainer>
    </WeekdayContainer>
  );

  const renderLoading = () => {
    return (
      <WeekContainer>
        <ToastContainer />
        {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'].map((day) => (
          <WeekdayContainer key={day}>
            <WeekDay><PacmanLoader color={Colors.lightgrayInput} size={10} loading /></WeekDay>
            <SchedulesContainer isCurrentDay={false}>
              <h2>{day}</h2>
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <Schedule isCurrentTime={false} key={index}>
                    <PacmanLoader color={Colors.lightgrayInput} size={25} loading />
                  </Schedule>
                ))}
            </SchedulesContainer>
          </WeekdayContainer>
        ))}
      </WeekContainer>
    )
  };

  return (
    <Container>
      <Header>
        <CoursesWrapper>
          <CourseName>
            <p>Dashboard</p>
          </CourseName>
          <CourseName>
            Analise e desenvolvimento de sistemas
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
            </CalendarWrapper>
          </DatepickContainer>
          <Semester>
                <select value={selectedSemesterValue} onChange={handleChange}>
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
                </select>
                <span>
                  Semestre
                </span>
              </Semester>
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
        {
          loading
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
            )
        }
      </ClassesContainer>
    </Container>
  );
};

export default Dashboard