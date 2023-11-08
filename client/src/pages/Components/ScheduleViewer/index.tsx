import React, { useEffect, useState } from 'react'

import { Container, WeekdayContainer, ScheduleCell, ClockContainer, UidLabel } from './ScheduleViewer.styles'
import { set } from 'date-fns';

const array = [
  {
    id: 1,
    disponivel: "False",
    Agendamento: []
  },
  {
    id: 1,
    disponivel: "False",
    Agendamento: []
  },
  {
    id: 1,
    disponivel: "False",
    Agendamento: []
  },
  {
    id: 1,
    disponivel: "False",
    Agendamento: []
  },
  {
    id: 1,
    disponivel: "False",
    Agendamento: []
  },
]


function transformGradeData(grade: any) {
  // console.clear()
  // console.log(grade)

  const clockTimesArray = ['18:45:00', '19:35:00', '20:35:00', '21:25:00', '22:15:00'];
  const items = [];

  for (let i = 0; i < clockTimesArray.length; i++) {
    // console.log("clockTimesArray[i]" + clockTimesArray[i])

    const gradeExisteNesteHorario = grade.filter((grade: any) => grade.horario_inicio === clockTimesArray[i])[0] || []

    // console.log(gradeExisteNesteHorario)

    // console.log("================================")
    // console.log("Grade Existe: " + (gradeExisteNesteHorario != "" ? true : false))

    const item = {
      id: i,
      selecionado: gradeExisteNesteHorario != "" ? true : false,
      agendamento: gradeExisteNesteHorario != "" ? gradeExisteNesteHorario : {},
    }

    // console.log(item)

    items.push(item)

  }
  return items;
};

function ScheduleViewer({ props, semester, professor_id, laboratoryName, date, selectedLaboratory, handleDataSelection, action, professores, idUserLogado, userRole }: any) {

  const [selectedLaboratoryId, setSelectedLaboratoryId] = useState<number>(0)

  const [selectedProfessor, setSelectedProfessor] = useState<number>(0)

  const [selectedDate, setSelectedDate] = useState<string>("")
  

  const [form, setForm] = useState({} as any)
  const [schedule, setSchedule] = useState(array)
  const [scheduleData, setScheduleData] = useState<any[]>([]) //the schedule array
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    // console.clear()
    // console.log("ScheduleViewer useEffect")
    // console.log(setSelectedIds)
    // console.log(form)

    // console.log("ScheduleViewer props")

    // console.log(props.uuid_agendamento)

    if (action == "SCHEDULELABORATORIO") {

      // console.log("action == SCHEDULELABORATORIO")

      setSelectedLaboratoryId(selectedLaboratory)
      setSelectedProfessor(professor_id)

      if (date) {
        setSelectedDate(
          date.toISOString()
        )
      }

      fetchGetGradesByProfessorsAndDisciplinas()

    }
    else if (action = "cancel") {
      // console.log("Cancel DETECTED")
      // console.log(props)

      if (props) {
        setForm(props)
      }
      fetchByGroupedId("token valido")

    }

    else {
      if (props) {
        setForm(props)
      }
    }
    handleDataSelection(scheduleData);

    // setSchedule()

  }, [props, setSelectedIds, selectedLaboratory, professor_id, semester, selectedLaboratoryId, selectedProfessor, form])

  async function fetchByGroupedId(token: string = localStorage.getItem('token') || "") {
    // console.log("Fetching fetchByGroupedId...")
    // console.log(form)
    // console.log(selectedLaboratory)

    const obj = {
      uuid_agendamento: props.uuid_agendamento,
      laboratory_id: selectedLaboratory,
      date: form.date,
      action: action
    }

    const bodyParams = JSON.stringify(obj)

    // console.log(bodyParams)

    await fetch(String(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL) + '/agendamento/grouped', {
      method: 'POST',
      headers: {
        'Authorization': 'bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: bodyParams
    }).then((response) => response.json()).then(async (data) => {

      // console.log("ReturnedData")
      // console.log(data)

      const transformedData = await transformGradeData(data)

      // console.log("transformedData")
      // console.log(transformedData)

      return setScheduleData(transformedData)

    }).catch((error) => {
      // console.log(error)
    }
    )
  }

  async function fetchGetGradesByProfessorsAndDisciplinas(token: string = localStorage.getItem('token') || "") {
    // console.log("Fetching getGradesByProfessorsAndDisciplinas...")
    // console.log(form)
    // console.log(selectedLaboratory)

    const obj = { //date to iso string
      laboratory_id: selectedLaboratoryId,
      date: selectedDate,
      dia_da_semana: date.getDay(),
      semestre: semester,
      professor_id: selectedProfessor,
    }

    // "laboratorio_id": 2,
    // "date": "2023-04-01",
    // "dia_da_semana": 4,
    // "semestre": 3,
    // "professor_id": 2

    const bodyParams = JSON.stringify(obj)

    // console.log(bodyParams)

    await fetch(String(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL) + '/grade/professors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: bodyParams
    }).then((response) => response.json()).then(async (data) => {

      // console.log("ReturnedData")
      // console.log(data)

      const transformedData = await transformGradeData(data)

      // console.log("transformedData")
      // console.log(transformedData)

      setScheduleData(transformedData)

      return handleDataSelection(transformedData);


    }).catch((error) => {
      // console.log(error)
    }
    )
  }

  const handleSelection = (id: number, idAgendamento: number) => {
    // console.log("idAgendamento: " + idAgendamento);
    // console.log("ID: " + id);

    const NewArray = scheduleData.map((item, index) => {

      if (item.agendamento?.id === idAgendamento && index === id) {
        return {
          ...item,
          selecionado: !item.selecionado,
          edited: true,
        };
      }

      return item;
    });

    // console.log(NewArray);

    setScheduleData(NewArray);
    handleDataSelection(NewArray);

    // else {
    //   // console.log("agendamento não encontrado")
    //   const NewArray = scheduleData.map((item) => {
    //     if (item.id === id) {
    //       return {
    //         ...item,
    //         ItemWasSelected: !item.ItemWasSelected,
    //       };
    //     }
    //     return item;
    //   });

    //   setScheduleData(NewArray);
    // }

    // if (selectedIds.includes(id)) {
    //   setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    // } else {
    //   const newSelectedIds = [...selectedIds, id].sort((a, b) => a - b);
    //   setSelectedIds(newSelectedIds);
    // }
  };

  function getProfessorNameById(id_professor: number) {
    // console.log(professores)

    // console.log(id_professor)

    if (id_professor == undefined) return

    
    // console.log(professorObject.name)
    
    try {
      const professorObject = professores.find((item: any) => item.id == id_professor)
      return professorObject.name
    }
    catch (error) {
      return "Professor não encontrado"
      // console.log(error)
    }
  }

  function getTipoDeAgedamento(
    itemIsSelected: boolean,
    idUserAgendamento: number,
    idUserLogado: number) {

    // console.log("idUserAgendamento: " + idUserAgendamento)
    // console.log("idUserLogado: " + idUserLogado)

    //mostrar indisponível se o agendamento for de outro usuário

    if (idUserAgendamento) {
      if (action == 'CREATE') {
        if (idUserAgendamento == idUserLogado && itemIsSelected == true) {
          return "Selecionado"
        } else
          if (idUserAgendamento != idUserLogado && itemIsSelected == true) {
            return "Indisponivel"
          }
      } else
        if (action == 'OPEN') {
          return "Agendado"
        }
    }
    if (itemIsSelected == false) {
      return "Disponivel"
    }
    if (itemIsSelected == true) {
      return "Selecionado"
    }

  }

  return (
    <>
      <Container>
        <ClockContainer>
          <p>18:45</p>
          <p>19:35</p>
          <p>20:45</p>
          <p>21:25</p>
          <p>22:15</p>
        </ClockContainer>
        <WeekdayContainer>
          <h2>{laboratoryName ? laboratoryName : "LAB"}</h2>
          {
            scheduleData.map((item: any) => {
              // const agendamentoExist = item.agendamento !== undefined;
              // console.log(agendamentoExist);
              return (
                <ScheduleCell
                  key={item.id}
                  selected={item.selecionado}
                  onClick=
                  {
                    () => {
                      if (action == 'CREATE') {
                        //compara se o agendamento é do usuário logado
                        if (userRole == 'professor' || item.agendamento.id_professor == idUserLogado || userRole == 'coordenador' || userRole == 'admin') {
                          handleSelection(item.id, item.agendamento && item.agendamento ? item.agendamento.id : undefined)
                        }
                      } else
                        if (action !== 'OPEN') {
                          handleSelection(item.id, item.agendamento && item.agendamento ? item.agendamento.id : undefined)
                        }
                    }
                  }
                >
                  <p>{
                    getTipoDeAgedamento(
                      item.selecionado,
                      item.agendamento.id_professor,
                      idUserLogado
                    )
                  }</p>
                  <p>
                    {
                      item.agendamento.id != null ? "" :
                        (
                          item.selecionado
                            && item.agendamento.id !== null
                            ? "* Novo" : "-"
                        )
                    }
                  </p>
                  <UidLabel canceled={item.edited && !item.selecionado}>
                    <p>{item.agendamento.uuid_agendamento}</p>
                    <p>{getProfessorNameById(item.agendamento.id_professor)}</p>
                    {
                      item.agendamento.semestre ?
                        <p>{(item.agendamento.semestre + 'º Semestre')}</p>
                        : null
                    }

                  </UidLabel>
                  {/* // item.Agendamento && item.Agendamento[0] ? <p>{item.Agendamento[0].uuid_agendamento}</p> : <p>---</p> */}
                </ScheduleCell>
              );
            })
          }
        </WeekdayContainer>
      </Container>
      <div>

      </div>
    </>
  )
}

export default ScheduleViewer