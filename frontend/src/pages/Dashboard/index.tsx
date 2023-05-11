import React, { useEffect, useState } from 'react'

import { Navigate } from 'react-router-dom'

import PacmanLoader from 'react-spinners/PacmanLoader';

import { Colors } from '../../colors';

import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { Container, Header, CourseName, Semester, ClassesContainer, ClockContainer, WeekdayContainer, SchedulesContainer, Schedule, WeekContainer, CourseSemester, DatePicker, DateIcon, CoursesWrapper } from './Dashboard.styles'

import dateIcon from '../../../public/images/dia_de_hoje.png';
import arrowLeft from '../../../public/images/pickDateIcons/arrow_left.svg';
import arrowRight from '../../../public/images/pickDateIcons/arrow_right.svg';
import arrowDown from '../../../public/images/pickDateIcons/arrow_down.svg';


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

  const [selectedValue, setSelectedValue] = useState(1) 

  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const [currentDay, setCurrentDay] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value)
  }

 

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
              setSelectedValue(userData.semestre)
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
  }, [selectedValue])

  async function fetchData() {
    fetch('http://localhost:3333/grade/dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        semestre: selectedValue || 1, //add localStorage later
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

  const renderWeekday = (dayName: string, dayData: any) => (
    <WeekdayContainer>
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
              <p>{disciplina}</p>
              <p>{professor}</p>
              <p>
                {laboratorio}
                {agendamento && ` - ${agendamento.laboratorio}`}
              </p>
            </Schedule>
          );
        })}
      </SchedulesContainer>
    </WeekdayContainer>
  );

  const renderLoading = () => {
    return (
      <WeekContainer>
        <ToastContainer/>
        {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'].map((day) => (
          <WeekdayContainer key={day}>
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
          <CourseSemester>
            1º Semestre de 2023
          </CourseSemester>
        </CoursesWrapper>
        <DatePicker>
          <div>
            <DateIcon src={dateIcon} />
            <p>Pular para hoje</p>
            <DateIcon src={arrowLeft} />
            <DateIcon src={arrowRight} />
            <p>Março 2023</p>
            <DateIcon src={arrowDown} />
          </div>
          <Semester>
            <select value={selectedValue} onChange={handleChange}>
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
        </DatePicker>
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