import React, { useEffect, useState } from 'react'

import { Container, WeekdayContainer, ScheduleCell, ClockContainer, UIDtext, UidLabel } from './ScheduleViewer.styles'

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

interface Item {
  id: number;
  disponivel: boolean;
  Agendamento: any[]; // Specify the type of Agendamento array as needed
}

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

    console.log(agendamentoExisteNesteHorario)

    console.log("agendamento.horario_inicio === clockTimesArray[i]")
    console.log(agendamentoExisteNesteHorario != "" ? true : false)
    console.log("===================================================")

    const item = {
      id: i,
      selecionado: agendamentoExisteNesteHorario != "" ? true : false,
      agendamento: agendamentoExisteNesteHorario || [],
    }

    items.push(item)

  }
  return items;
};

function ScheduleViewer({ props, selectedLaboratory }: any) {

  const [form, setForm] = useState({} as any)
  const [schedule, setSchedule] = useState(array)
  const [scheduleData, setScheduleData] = useState<any[]>([])
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


  }, [props, setSelectedIds])


  async function fetchByGroupedId(token: string = localStorage.getItem('token') || "") {
    console.log("Fetching fetchByGroupedId...")
    console.log(form.uuid_agendamento)

    const obj = {
      uuid_agendamento: props.uuid_agendamento,
    }

    const bodyParams = JSON.stringify(obj)

    await fetch('http://localhost:3333/agendamento/grouped', {
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

    // const agendamento = scheduleData.filter((item) => item.agendamento?.id === idAgendamento);

    // if edited and uuid exist then it will put the id of the agendamento in the array to delete and 

    // if the selected has no uuid then it will put the id of the agendamento in the array to create

    // if the selected has uuid and edited is true then it will put the id of the agendamento in the array to update

    // if the selected has uuid and edited is false then it will put the id of the agendamento in the array to delete

    //   [
    //     {
    //         "id": 0,
    //         "selecionado": false,
    //         "agendamento": {
    //             "id": 18,
    //             "date": "2023-07-27T23:43:36.760Z",
    //             "horario_inicio": "18:45:00",
    //             "horario_fim": "19:35:00",
    //             "id_professor": 12,
    //             "uuid_agendamento": "#36817",
    //             "id_grade": "16",
    //             "id_laboratorio": "26",
    //             "created_at": "2023-07-26T23:43:50.090Z",
    //             "updated_at": "2023-07-26T23:43:50.090Z"
    //         }
    //     },
    //     {
    //         "id": 1,
    //         "selecionado": false,
    //         "agendamento": {
    //             "id": 20,
    //             "date": "2023-07-27T23:43:36.760Z",
    //             "horario_inicio": "19:35:00",
    //             "horario_fim": "20:25:00",
    //             "id_professor": 12,
    //             "uuid_agendamento": "#36817",
    //             "id_grade": "17",
    //             "id_laboratorio": "26",
    //             "created_at": "2023-07-26T23:43:50.096Z",
    //             "updated_at": "2023-07-26T23:44:39.477Z"
    //         }
    //     },
    //     {
    //         "id": 2,
    //         "selecionado": true,
    //         "agendamento": []
    //     },
    //     {
    //         "id": 3,
    //         "selecionado": false,
    //         "agendamento": {
    //             "id": 22,
    //             "date": "2023-07-27T23:43:36.760Z",
    //             "horario_inicio": "21:25:00",
    //             "horario_fim": "22:15:00",
    //             "id_professor": 12,
    //             "uuid_agendamento": "#36817",
    //             "id_grade": "19",
    //             "id_laboratorio": "26",
    //             "created_at": "2023-07-26T23:43:50.098Z",
    //             "updated_at": "2023-07-26T23:43:50.098Z"
    //         }
    //     },
    //     {
    //         "id": 4,
    //         "selecionado": false,
    //         "agendamento": {
    //             "id": 19,
    //             "date": "2023-07-27T23:43:36.760Z",
    //             "horario_inicio": "22:15:00",
    //             "horario_fim": "23:05:00",
    //             "id_professor": 12,
    //             "uuid_agendamento": "#36817",
    //             "id_grade": "20",
    //             "id_laboratorio": "26",
    //             "created_at": "2023-07-26T23:43:50.095Z",
    //             "updated_at": "2023-07-26T23:43:50.095Z"
    //         }
    //     }
    // ]


    const NewArray = scheduleData.map((item) => {
      if (item.agendamento?.id === idAgendamento) {
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

    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      const newSelectedIds = [...selectedIds, id].sort((a, b) => a - b);
      setSelectedIds(newSelectedIds);
    }
  };



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
          <h2>LAB {//preencer
          }</h2>
          {
            scheduleData.map((item: any) => {
              const agendamentoExist = item.agendamento !== undefined;
              console.log(agendamentoExist);
              return (
                <ScheduleCell
                  key={item.id}
                  selected={item.selecionado}
                  onClick=
                  {
                    () => handleSelection(item.id, item.agendamento && item.agendamento? item.agendamento.id : undefined)
                  }
                >
                  <p>{item.selecionado ? "Selecionado" : "Disponível"}</p>
                  <p>
                    {
                       item.agendamento.length !== 0 ? "" : 
                       (
                        item.selecionado
                        && item.agendamento.length === 0
                        ? "* Novo Agendamento" : "-"
                        )

                    }
                    </p>
                  <UidLabel canceled={item.edited && !item.selecionado}>
                    {item.agendamento.uuid_agendamento}
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