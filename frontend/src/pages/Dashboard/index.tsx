import React, { useEffect, useState } from 'react'

import { Navigate } from 'react-router-dom'

import * as GradeData from '../../../types/GradeData';

import BsFillCalendarDateFill from 'react-icons/bs';
// import { GrSchedule } from 'react-icons/gr';

import { Container, Header, CourseName, Semester, ClassesContainer, ClockContainer, WeekdayContainer, SchedulesContainer, Schedule, WeekContainer, CourseSemester, DatePicker, DateIcon } from './Dashboard.styles'

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

  console.log("Grade Value: " + JSON.stringify(gradeValue, null, 2))

}

// function groupByDay(data) {
//   const daysOfWeek = ["00001", "00002", "00003", "00004", "00005", "00006", "00007"];
//   const groupedData = {};

//   daysOfWeek.forEach(day => {
//     const filteredData = data.filter(item => item.dia_da_semana === day);
//     const intervalo = { "intervalo": "intervalo" };
//     if (filteredData.length > 0) {
//       filteredData.splice(2, 0, intervalo);
//       groupedData[day] = filteredData;
//     }
//   });

//   return groupedData;
// }

const Dashboard: React.FC = () => {
  const [grade, setgrade] = useState<any>();

  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const [currentDay, setCurrentDay] = useState('');
  const [currentTime, setCurrentTime] = useState('');



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



  const mockdata = {
    "segunda": [
      {
        "id": 1,
        "horario_inicio": "18:45",
        "horario_fim": "19:35",
        "dia_da_semana": "00002",
        "semestre": "1",
        "created_at": "2023-03-23T01:24:00.965Z",
        "updated_at": "2023-03-23T01:24:00.965Z",
        "professor": "Divani",
        "disciplina": "Arquitetura e Organização de Computadores",
        "laboratorio": "Sala-14"
      },
      {
        "id": 2,
        "horario_inicio": "19:35",
        "horario_fim": "20:25",
        "dia_da_semana": "00002",
        "semestre": "1",
        "created_at": "2023-03-23T01:24:00.965Z",
        "updated_at": "2023-03-23T01:24:00.965Z",
        "professor": "Cilmara",
        "disciplina": "Algoritmos e Lógica de Programação",
        "laboratorio": "Sala-14"
      },
      {
        "id": 3,
        "horario_inicio": "20:35",
        "horario_fim": "21:25",
        "dia_da_semana": "00002",
        "semestre": "1",
        "created_at": "2023-03-23T01:24:00.965Z",
        "updated_at": "2023-03-23T01:24:00.965Z",
        "professor": "Michel",
        "disciplina": "Algoritmos e Lógica de Programação",
        "laboratorio": "Sala-14"
      },
      {
        "semestre": "1",
        "disciplina": "Intervalo",
      },
      {
        "id": 4,
        "horario_inicio": "21:25",
        "horario_fim": "22:15",
        "dia_da_semana": "00002",
        "semestre": "1",
        "created_at": "2023-03-23T01:24:00.965Z",
        "updated_at": "2023-03-23T01:24:00.965Z",
        "professor": "Manuela",
        "disciplina": "Algoritmos e Lógica de Programação",
        "laboratorio": "Sala-14"
      },
      {
        "id": 5,
        "horario_inicio": "22:15",
        "horario_fim": "23:05",
        "dia_da_semana": "00002",
        "semestre": "1",
        "created_at": "2023-03-23T01:24:00.965Z",
        "updated_at": "2023-03-23T01:24:00.965Z",
        "professor": "Manuela",
        "disciplina": "Algoritmos e Lógica de Programação",
        "laboratorio": "Sala-14"
      }
    ],
    "terca": [
      {
        "id": 6,
        "horario_inicio": "18:45",
        "horario_fim": "19:35",
        "dia_da_semana": "00003",
        "semestre": "1",
        "created_at": "2023-03-23T01:24:00.965Z",
        "updated_at": "2023-03-23T01:24:00.965Z",
        "professor": "Divani",
        "disciplina": "Arquitetura e Organização de Computadores",
        "laboratorio": "Sala-14"
      },
      {
        "id": 7,
        "horario_inicio": "19:35",
        "horario_fim": "20:25",
        "dia_da_semana": "00003",
        "semestre": "1",
        "created_at": "2023-03-23T01:24:00.965Z",
        "updated_at": "2023-03-23T01:24:00.965Z",
        "professor": "Cilmara",
        "disciplina": "Arquitetura e Organização de Computadores",
        "laboratorio": "Sala-14"
      },
      {
        "id": 8,
        "horario_inicio": "20:35",
        "horario_fim": "21:25",
        "dia_da_semana": "00003",
        "semestre": "1",
        "created_at": "2023-03-23T01:24:00.965Z",
        "updated_at": "2023-03-23T01:24:00.965Z",
        "professor": "Michel",
        "disciplina": "Arquitetura e Organização de Computadores",
        "laboratorio": "Sala-14"
      },
      {
        "semestre": "1",
        "disciplina": "Intervalo",
      },
      {
        "id": 9,
        "horario_inicio": "21:25",
        "horario_fim": "22:15",
        "dia_da_semana": "00003",
        "semestre": "1",
        "created_at": "2023-03-23T01:24:00.965Z",
        "updated_at": "2023-03-23T01:24:00.965Z",
        "professor": "Manuela",
        "disciplina": "Algoritmos e Lógica de Programação",
        "laboratorio": "Sala-14"
      },
      {
        "id": 10,
        "horario_inicio": "22:15",
        "horario_fim": "23:05",
        "dia_da_semana": "00003",
        "semestre": "1",
        "created_at": "2023-03-23T01:24:00.965Z",
        "updated_at": "2023-03-23T01:24:00.965Z",
        "professor": "Manuela",
        "disciplina": "Arquitetura e Organização de Computadores",
        "laboratorio": "Sala-14"
      }
    ],
    "quarta": [
      {
        "id": 11,
        "horario_inicio": "18:45",
        "horario_fim": "19:35",
        "dia_da_semana": "00004",
        "semestre": "1",
        "created_at": "2023-03-23T01:24:00.965Z",
        "updated_at": "2023-03-23T01:24:00.965Z",
        "professor": "Divani",
        "disciplina": "Arquitetura e Organização de Computadores",
        "laboratorio": "Sala-14"
      },
      {
        "id": 12,
        "horario_inicio": "19:35",
        "horario_fim": "20:25",
        "dia_da_semana": "00004",
        "semestre": "1",
        "created_at": "2023-03-23T01:24:00.965Z",
        "updated_at": "2023-03-23T01:24:00.965Z",
        "professor": "Cilmara",
        "disciplina": "Arquitetura e Organização de Computadores",
        "laboratorio": "Sala-14"
      },
      {
        "id": 13,
        "horario_inicio": "20:35",
        "horario_fim": "21:25",
        "dia_da_semana": "00004",
        "semestre": "1",
        "created_at": "2023-03-23T01:24:00.965Z",
        "updated_at": "2023-03-23T01:24:00.965Z",
        "professor": "Michel",
        "disciplina": "Arquitetura e Organização de Computadores",
        "laboratorio": "Sala-14"
      },
      {
        "semestre": "1",
        "disciplina": "Intervalo",
      },
      {
        "id": 14,
        "horario_inicio": "21:25",
        "horario_fim": "22:15",
        "dia_da_semana": "00004",
        "semestre": "1",
        "created_at": "2023-03-23T01:24:00.965Z",
        "updated_at": "2023-03-23T01:24:00.965Z",
        "professor": "Manuela",
        "disciplina": "Algoritmos e Lógica de Programação",
        "laboratorio": "Sala-14"
      },
      {
        "id": 15,
        "horario_inicio": "22:15",
        "horario_fim": "23:05",
        "dia_da_semana": "00004",
        "semestre": "1",
        "created_at": "2023-03-23T01:24:00.965Z",
        "updated_at": "2023-03-23T01:24:00.965Z",
        "professor": "Manuela",
        "disciplina": "Arquitetura e Organização de Computadores",
        "laboratorio": "Sala-14"
      }
    ],
    "quinta": [
      {
        "id": 16,
        "horario_inicio": "18:45",
        "horario_fim": "19:35",
        "dia_da_semana": "00005",
        "semestre": "1",
        "created_at": "2023-03-23T01:24:00.965Z",
        "updated_at": "2023-03-23T01:24:00.965Z",
        "professor": "Divani",
        "disciplina": "Arquitetura e Organização de Computadores",
        "laboratorio": "Sala-14"
      },
      {
        "id": 17,
        "horario_inicio": "19:35",
        "horario_fim": "20:25",
        "dia_da_semana": "00005",
        "semestre": "1",
        "created_at": "2023-03-23T01:24:00.965Z",
        "updated_at": "2023-03-23T01:24:00.965Z",
        "professor": "Cilmara",
        "disciplina": "Arquitetura e Organização de Computadores",
        "laboratorio": "Sala-14"
      },
      {
        "id": 18,
        "horario_inicio": "20:35",
        "horario_fim": "21:25",
        "dia_da_semana": "00005",
        "semestre": "1",
        "created_at": "2023-03-23T01:24:00.965Z",
        "updated_at": "2023-03-23T01:24:00.965Z",
        "professor": "Michel",
        "disciplina": "Arquitetura e Organização de Computadores",
        "laboratorio": "Sala-14"
      },
      {
        "semestre": "1",
        "disciplina": "Intervalo",
      },
      {
        "id": 19,
        "horario_inicio": "21:25",
        "horario_fim": "22:15",
        "dia_da_semana": "00005",
        "semestre": "1",
        "created_at": "2023-03-23T01:24:00.965Z",
        "updated_at": "2023-03-23T01:24:00.965Z",
        "professor": "Manuela",
        "disciplina": "Algoritmos e Lógica de Programação",
        "laboratorio": "Sala-14"
      },
      {
        "id": 20,
        "horario_inicio": "22:15",
        "horario_fim": "23:05",
        "dia_da_semana": "00005",
        "semestre": "1",
        "created_at": "2023-03-23T01:24:00.965Z",
        "updated_at": "2023-03-23T01:24:00.965Z",
        "professor": "Manuela",
        "disciplina": "Arquitetura e Organização de Computadores",
        "laboratorio": "Sala-14"
      }
    ],
    "sexta": [
      {
        "id": 21,
        "horario_inicio": "18:45",
        "horario_fim": "19:35",
        "dia_da_semana": "00006",
        "semestre": "1",
        "created_at": "2023-03-23T01:24:00.965Z",
        "updated_at": "2023-03-23T01:24:00.965Z",
        "professor": "Manuela",
        "disciplina": "Arquitetura e Organização de Computadores",
        "laboratorio": "Sala-14"
      },
      {
        "id": 22,
        "horario_inicio": "19:35",
        "horario_fim": "20:25",
        "dia_da_semana": "00006",
        "semestre": "1",
        "created_at": "2023-03-23T01:24:00.965Z",
        "updated_at": "2023-03-23T01:24:00.965Z",
        "professor": "Manuela",
        "disciplina": "Arquitetura e Organização de Computadores",
        "laboratorio": "Sala-14"
      },
      {
        "id": 23,
        "horario_inicio": "20:35",
        "horario_fim": "21:25",
        "dia_da_semana": "00006",
        "semestre": "1",
        "created_at": "2023-03-23T01:24:00.965Z",
        "updated_at": "2023-03-23T01:24:00.965Z",
        "professor": "Manuela",
        "disciplina": "Arquitetura e Organização de Computadores",
        "laboratorio": "Sala-14"
      },
      {
        "semestre": "1",
        "disciplina": "Intervalo",
      },
      {
        "id": 24,
        "horario_inicio": "21:25",
        "horario_fim": "22:15",
        "dia_da_semana": "00006",
        "semestre": "1",
        "created_at": "2023-03-23T01:24:00.965Z",
        "updated_at": "2023-03-23T01:24:00.965Z",
        "professor": "Manuela",
        "disciplina": "Algoritmos e Lógica de Programação",
        "laboratorio": "Sala-14"
      },
      {
        "id": 25,
        "horario_inicio": "22:15",
        "horario_fim": "23:05",
        "dia_da_semana": "00006",
        "semestre": "1",
        "created_at": "2023-03-23T01:24:00.965Z",
        "updated_at": "2023-03-23T01:24:00.965Z",
        "professor": "Manuela",
        "disciplina": "Arquitetura e Organização de Computadores",
        "laboratorio": "Sala-14"
      }
    ]
  }


  useEffect(() => {

    async function fetchData() {
      fetch('http://localhost:3333/grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          semestre: "1", //add localStorage later
        })
      }).then((response) => response.json()).then((data) => {
        console.log(data)
        const transformedData = groupByWeekday(data)
        console.log("Transformed Data :" + JSON.stringify(transformedData, null, 2))
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

    fetchData();

  }, [])

  const isWithinClassTime = (startTime, endTime) => {

    console.log("Start Time: " + startTime)
    console.log("End Time: " + endTime)

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

  const renderWeekday = (dayName: string, dayData: GradeData[]) => (
    <WeekdayContainer>
      <SchedulesContainer isCurrentDay={currentDay === dayName}>
        <h2>{dayName}</h2>
        {dayData.map((item: GradeData) => {
          const {
            disciplina,
            professor,
            laboratorio,
            agendamentos,
          } = item;

          const agendamento = agendamentos && agendamentos.length > 0 ? agendamentos[0] : null;
          const isCurrentTime = isWithinClassTime(item.horario_inicio, item.horario_fim);

          console.log(isCurrentTime)
          console.log(currentTime)

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

  return (
    <Container>
      <Header>
        <div>
          <CourseName>
            <p>Analise e Desenvolvimento de Sistemas</p>
          </CourseName>
          <CourseSemester>
            1º Semestre de 2023
          </CourseSemester>
        </div>
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
            <p>
              5º
            </p>
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
              <p>Loading...</p>
            )
        }
      </ClassesContainer>
    </Container>
  );
};

export default Dashboard