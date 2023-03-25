import React, { useEffect, useState } from 'react'

import { Navigate } from 'react-router-dom'
import Navbar from '../Navbar';

import { Container, Header, CourseName, Semester, ClassesContainer, ClockContainer, WeekdayContainer, SchedulesContainer, Schedule, WeekContainer, CourseSemester } from './Dashboard.styles'

function groupByDay(data) {
  const daysOfWeek = ["00001", "00002", "00003", "00004", "00005", "00006", "00007"];
  const groupedData = {};

  daysOfWeek.forEach(day => {
    const filteredData = data.filter(item => item.dia_da_semana === day);
    const intervalo = {"intervalo": "intervalo"};
    if (filteredData.length > 0) {
      filteredData.splice(2, 0, intervalo);
      groupedData[day] = filteredData;
    }
  });

  return groupedData;
}

const Dashboard: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [grade, setgrade] = useState([]);


  //verifies if token stored on localstorage is valid

  //  useEffect(
  //    async () => {
  //       const token = localStorage.getItem('token')
  //       if (token) {

  //         const response = await fetch('http://localhost:3333/verify', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({
  //             token,
  //           }),
  //         })
  //         const data = await response.json()
  //         if (data.token) {
  //         } else {

  //         }
  //       }

  //       // eslint-disable-next-line react-hooks/exhaustive-deps

  //     }, []);


  useEffect(() => {
    // const localStorageData = localStorage.getItem("gerenciamento-de-salas@v1.0");

    // const parsedData = JSON.parse(localStorageData);

    // console.log(parsedData);



    // // if (localStorageData.token !== undefined) {
    // //   console.log("token exists");
    // //   console.log(localStorageData.token);
    // //   // window.location.href = "/calendar";
    // // }
    // console.log("token does not exists");
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
        const teste = groupByDay(data)
        console.log(teste)
        return setgrade(teste)
      }
      )
    }

    fetchData();
  }, [])

  return (
    <>
      <Navbar />
      <Container>
        <Header>
          <CourseSemester>
            1º Semestre de 2023
          </CourseSemester>
          <div>
            <CourseName>
              <p>Analise e Desenvolvimento de Sistemas</p>
            </CourseName>
            <Semester>
              <p>
                5º
              </p>
              <span>
                Semestre
              </span>
            </Semester>
          </div>
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
          <WeekContainer>
            <WeekdayContainer>
              <h2>Segunda</h2>
              <SchedulesContainer>
                {
                  mockdata.segunda.map((item) => {
                    return (
                      <Schedule>
                        <p>{item.disciplina}</p>
                        <p>{item.professor}</p>
                        <p>{item.laboratorio}</p>
                      </Schedule>
                    )
                  })
                }
              </SchedulesContainer>
            </WeekdayContainer>
            <WeekdayContainer>
              <h2>Terça</h2>
              <SchedulesContainer>
                {
                  mockdata.terca.map((item) => {
                    return (
                      <Schedule>
                        <p>{item.disciplina}</p>
                        <p>{item.professor}</p>
                        <p>{item.laboratorio}</p>
                      </Schedule>
                    )
                  })
                }
              </SchedulesContainer>
            </WeekdayContainer>
            <WeekdayContainer>
              <h2>Quarta</h2>
              <SchedulesContainer>
                {
                  mockdata.quarta.map((item) => {
                    return (
                      <Schedule>
                        <p>{item.disciplina}</p>
                        <p>{item.professor}</p>
                        <p>{item.laboratorio}</p>
                      </Schedule>
                    )
                  })
                }
              </SchedulesContainer>
            </WeekdayContainer>
            <WeekdayContainer>
              <h2>Quinta</h2>
              <SchedulesContainer>
                {
                  mockdata.quinta.map((item) => {
                    return (
                      <Schedule>
                        <p>{item.disciplina}</p>
                        <p>{item.professor}</p>
                        <p>{item.laboratorio}</p>
                      </Schedule>
                    )
                  })
                }
              </SchedulesContainer>
            </WeekdayContainer>
            <WeekdayContainer>
              <h2>Sexta</h2>
              <SchedulesContainer>
                {
                  mockdata.sexta.map((item) => {
                    return (
                      <Schedule>
                        <p>{item.disciplina}</p>
                        <p>{item.professor}</p>
                        <p>{item.laboratorio}</p>
                      </Schedule>
                    )
                  })
                }
              </SchedulesContainer>
            </WeekdayContainer>
          </WeekContainer>
        </ClassesContainer>
      </Container>
    </>
  )
}

export default Dashboard
