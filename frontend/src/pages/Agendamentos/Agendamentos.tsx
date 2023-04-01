import React, { useEffect, useState } from 'react'

import { Navigate } from 'react-router-dom'

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

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
  Laboratorio
}
  from './Agendamento.styles'

import Calendar from '../Components/Laboratorios/Calendar'

import dateIcon from '../../../public/images/dia_de_hoje.png';
import arrowLeft from '../../../public/images/pickDateIcons/arrow_left.svg';
import arrowRight from '../../../public/images/pickDateIcons/arrow_right.svg';
import arrowDown from '../../../public/images/pickDateIcons/arrow_down.svg';
import Modal from '../Components/Modal';

interface LaboratorioData {
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

const mockdata: any = {
  "laboratorio1": [
    {
      "id": 1,
      "laboratorio": "Disponivel",
      "id_laboratorio": "1",
    },
    {
      "id": 2,
      "semestre": "1",
      "created_at": "2023-03-23T01:24:00.965Z",
      "updated_at": "2023-03-23T01:24:00.965Z",
      "professor": "Cilmara",
      "disciplina": "Algoritmos e Lógica de Programação",
      "laboratorio": "Indisponivel",
      "ScheduleData": {
        "id": 2,
        "horario_inicio": "19:45",
        "horario_fim": "20:35",
        "dia_da_semana": "00001",
        "semestre": "1",
        "created_at": "2023-03-23T01:24:00.965Z",
      }
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
      "laboratorio": "Disponivel"
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
      "laboratorio": "Disponivel"
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
      "laboratorio": "Disponivel"
    }
  ],
  "laboratorio2": [
    {
      "id": 6,
      "horario_inicio": "18:45",
      "horario_fim": "19:35",
      "dia_da_semana": "00003",
      "semestre": "1",
      "created_at": "2023-03-23T01:24:00.965Z",
      "updated_at": "2023-03-23T01:24:00.965Z",
      // "professor": "Divani",
      // "disciplina": "Arquitetura e Organização de Computadores",
      "laboratorio": "Disponivel"
    },
    {
      "id": 7,
      "horario_inicio": "19:35",
      "horario_fim": "20:25",
      "dia_da_semana": "00003",
      "semestre": "1",
      "created_at": "2023-03-23T01:24:00.965Z",
      "updated_at": "2023-03-23T01:24:00.965Z",
      // "professor": "Cilmara",
      // "disciplina": "Arquitetura e Organização de Computadores",
      "laboratorio": "Disponivel"
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
      "laboratorio": "Disponivel"
    },
    {
      "id": 9,
      "laboratorio": "Disponivel"
    },
    {
      "id": 10,
      "laboratorio": "Disponivel"
    },
  ],
  "laboratorio3": [
    {
      "id": 11,
      "laboratorio": "Disponivel"
    },
    {
      "id": 12,
      "laboratorio": "Disponivel"
    },
    {
      "id": 13,
      "laboratorio": "Disponivel"
    },
    {
      "id": 14,
      "laboratorio": "Disponivel"
    },
    {
      "id": 15,
      "laboratorio": "Disponivel"
    },
  ],
  "laboratorio4": [
    {
      "id": 16,
      "laboratorio": "Disponivel"
    },
    {
      "id": 17,
      "laboratorio": "Disponivel"
    },
    {
      "id": 18,
      "laboratorio": "Disponivel"
    },
    {
      "id": 19,
      "laboratorio": "Disponivel"
    },
    {
      "id": 20,
      "laboratorio": "Disponivel"
    },
  ],
  "laboratorio5": [
    {
      "id": 21,
      "laboratorio": "Disponivel"
    },
    {
      "id": 22,
      "laboratorio": "Disponivel"
    },
    {
      "id": 23,
      "laboratorio": "Disponivel"
    },
    {
      "id": 24,
      "laboratorio": "Disponivel"
    },
    {
      "id": 25,
      "laboratorio": "Disponivel"
    },
  ],
  "laboratorio6": [
    {
      "id": 26,
      "laboratorio": "Disponivel"
    },
    {
      "id": 27,
      "laboratorio": "Disponivel"
    },
    {
      "id": 28,
      "laboratorio": "Disponivel"
    },
    {
      "id": 29,
      "laboratorio": "Disponivel"
    },
    {
      "id": 30,
      "laboratorio": "Disponivel"
    },
  ],
  "salamaker": [
    {
      "id": 31,
      "laboratorio": "Disponivel"
    },
    {
      "id": 32,
      "laboratorio": "Disponivel"
    },
    {
      "id": 33,
      "laboratorio": "Disponivel"
    },
    {
      "id": 34,
      "laboratorio": "Disponivel"
    },
    {
      "id": 35,
      "laboratorio": "Disponivel"
    },
  ],


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

interface GradeProps {
  grade: any;
  segunda: any;
  terca: any;
  quarta: any;
  quinta: any;
  sexta: any;
}

const Agendamentos: React.FC = () => {
  const [grade, setgrade] = useState<GradeProps>();

  const [loading, setLoading] = useState(false);

  const [selectingLaboratory, setSelectingLaboratory] = useState(false)

  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const [modalVisible, setModalVisible] = useState(false);


  const [WeekdayGradeIds, setWeekdayGradeIds] = useState<number[]>([])
  const [selectedWeekday, setSelectedWeekday] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedLaboratory, setSelectedLaboratory] = useState(-1);


  const handleButtonClick = () => {
    console.log("Button clicked");
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

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

        setLoading(true) // teste de loading

        // setLoading(true)
        return setgrade(transformedData as any)
      }
      )
    }

    fetchData();

  }, [])

  useEffect(() => {
    console.log("SelectedIds: " + selectedIds)
    console.log("SelectedLaboratory: " + selectedLaboratory)
  }, [selectedIds, selectedLaboratory])


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
      setSelectedIds([...selectedIds, id]);
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

  const handleWeekdaySelection = (weekDay: string, dayInfo: object) => {
    console.log(weekDay)
    console.log(dayInfo)
    const gradeIds = extractGradeId(dayInfo)
    console.log(gradeIds)

    setWeekdayGradeIds(gradeIds)
    setSelectedWeekday(weekDay)
    setSelectingLaboratory(true)
  }

  return (
    <Container>
      <Modal isVisible={modalVisible} onClose={handleCloseModal} WeekdayGradeIds={WeekdayGradeIds} selectedWeekday={selectedWeekday} selectedIds={selectedIds} selectedLaboratory={selectedLaboratory} startDate={startDate} />
      <Header>
        <CoursesWrapper>
          <CourseName>
            <p>Agendamento de Laboratório</p>
          </CourseName>
          <CourseSemester>
            1º Semestre de 2023
          </CourseSemester>
        </CoursesWrapper>
        <DatePickWrapper>
          <DatepickContainer>
            <DateIcon src={dateIcon} />
            <p>Pular para hoje</p>
            <DateIcon src={arrowLeft} />
            <DateIcon src={arrowRight} />
            <p>Março 2023</p>
            <DateIcon src={arrowDown} />
            <CalendarWrapper>
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </CalendarWrapper>
            {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
          </DatepickContainer>
          <Semester>
            {selectingLaboratory && <button onClick={handleButtonClick}>Confirmar Agendamento</button>}
            <p>
              5º
            </p>
            <span>
              Semestre
            </span>
          </Semester>
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
                  <p>Loading...</p>
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
                      <h2>Segunda</h2>
                      <SchedulesContainer>
                        {
                          grade.segunda.map((item: gradeData) => {
                            return (
                              <Schedule onClick={() => handleWeekdaySelection("Segunda-feira", grade.segunda)} key={item.id}>
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
                          grade.terca.map((item: gradeData) => {
                            return (
                              <Schedule onClick={() => handleWeekdaySelection("Terça-feira", grade.terca)} key={item.id}>
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
                          grade.quarta.map((item: gradeData) => {
                            return (
                              <Schedule onClick={() => handleWeekdaySelection("Quarta-feira", grade.quarta)} key={item.id}>
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
                          grade.quinta.map((item: gradeData) => {
                            return (
                              <Schedule onClick={() => handleWeekdaySelection("Quinta-feira", grade.quinta)} key={item.id}>
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
                          grade.sexta.map((item: gradeData) => {
                            return (
                              <Schedule onClick={() => handleWeekdaySelection("Sexta-feira", grade.sexta)} key={item.id}>
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
                ) : (
                  <p>Loading...</p>
                )
            }

          </ClassesContainer>
      }
    </Container>
  )
}

export default Agendamentos
