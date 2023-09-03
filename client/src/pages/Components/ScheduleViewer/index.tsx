import React, { useEffect, useState } from 'react'

import { Container, WeekdayContainer, ScheduleCell, ClockContainer, UidLabel } from './ScheduleViewer.styles'

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


// [
//   {
//     id: 27,
//     date: '2023-06-01T23:09:13.533Z',
//     horario_inicio: '19:35:00',
//     horario_fim: '20:25:00',
//     id_professor: 12,
//     id_grade: '17',
//     id_laboratorio: '26',
//     created_at: 2023-05-30T23:09:20.764Z,
//     updated_at: 2023-05-30T23:09:20.764Z,
//     uuid_agendamento: '#21153'
//   },
//   {
//     id: 28,
//     date: '2023-06-01T23:09:13.533Z',
//     horario_inicio: '20:35:00',
//     horario_fim: '21:25:00',
//     id_professor: 12,
//     id_grade: '18',
//     id_laboratorio: '26',
//     created_at: 2023-05-30T23:09:20.765Z,
//     updated_at: 2023-05-30T23:09:20.765Z,
//     uuid_agendamento: '#21153'
//   },
//   {
//     id: 29,
//     date: '2023-06-01T23:09:13.533Z',
//     horario_inicio: '18:45:00',
//     horario_fim: '19:35:00',
//     id_professor: 12,
//     id_grade: '16',
//     id_laboratorio: '26',
//     created_at: 2023-05-30T23:09:20.766Z,
//     updated_at: 2023-05-31T02:53:56.611Z,
//     uuid_agendamento: '#21153'
//   }
// ]

function transformData(agendamentos: any) {

  const clockTimesArray = ['18:45:00', '19:35:00', '20:35:00', '21:25:00', '22:15:00'];
  const items = [];

  for (let i = 0; i < clockTimesArray.length; i++) {
    // console.log("clockTimesArray[i]" + clockTimesArray[i])

    const agendamentoExisteNesteHorario = agendamentos.filter((agendamento: any) => agendamento.horario_inicio === clockTimesArray[i])[0] || []

    // console.log(agendamentoExisteNesteHorario)

    console.log("================================")
    console.log("Agendamento Existe: " + (agendamentoExisteNesteHorario != "" ? true : false))

    const item = {
      id: i,
      selecionado: agendamentoExisteNesteHorario != "" ? true : false,
      agendamento: agendamentoExisteNesteHorario != "" ? agendamentoExisteNesteHorario : {},
    }

    console.log(item)

    items.push(item)

  }
  return items;
};

function ScheduleViewer({ props, selectedLaboratory, handleDataSelection, action, professores, idUserLogado }: any) {

  const [form, setForm] = useState({} as any)
  const [schedule, setSchedule] = useState(array)
  const [scheduleData, setScheduleData] = useState<any[]>([]) //the schedule array
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {

    console.log("ScheduleViewer useEffect")

    // console.log(setSelectedIds)
    console.log(form)

    // console.log("ScheduleViewer props")

    // console.log(props.uuid_agendamento)


    fetchByGroupedId("token valido")
    // setSchedule()
    if (props) {
      setForm(props)
    }

    handleDataSelection(scheduleData);

  }, [props, setSelectedIds, selectedLaboratory,])

  async function fetchByGroupedId(token: string = localStorage.getItem('token') || "") {
    console.log("Fetching fetchByGroupedId...")
    console.log(form)
    console.log(selectedLaboratory)

    const obj = {
      uuid_agendamento: props.uuid_agendamento,
      laboratory_id: selectedLaboratory,
      date: form.date,
      action: action
    }

    const bodyParams = JSON.stringify(obj)

    await fetch('https://6063-201-26-159-52.ngrok-free.app/agendamento/grouped', {
      method: 'POST',
      headers: {
        'Authorization': 'bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: bodyParams
    }).then((response) => response.json()).then(async (data) => {

      console.log("ReturnedData")
      console.log(data)

      const transformedData = await transformData(data)

      console.log("transformedData")
      console.log(transformedData)

      return setScheduleData(transformedData)

    }).catch((error) => {
      console.log(error)
    }
    )
  }

  const handleSelection = (id: number, idAgendamento: number) => {
    console.log("idAgendamento: " + idAgendamento);
    console.log("ID: " + id);

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

    console.log(NewArray);

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

    const professorObject = professores.find((item: any) => item.id == id_professor)

    // console.log(professorObject.name)
    return professorObject.name
  }

  function getTipoDeAgedamento(
    itemIsSelected: boolean,
    idUserAgendamento: number,
    idUserLogado: number) {

    console.log("idUserAgendamento: " + idUserAgendamento)
    console.log("idUserLogado: " + idUserLogado)

    //mostrar indisponível se o agendamento for de outro usuário

    if (idUserAgendamento) {
      if (idUserAgendamento == idUserLogado && itemIsSelected == true) {
        return "Selecionado"
      } else
        if (idUserAgendamento != idUserLogado && itemIsSelected == true) {
          return "Indisponivel"
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
          <p>20:25</p>
          <p>20:45</p>
          <p>21:25</p>
          <p>22:15</p>
        </ClockContainer>
        <WeekdayContainer>
          <h2>LAB</h2>
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
                      if(action !== 'OPEN') {
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