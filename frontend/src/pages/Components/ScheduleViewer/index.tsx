import React, { useEffect } from 'react'

import { Container, WeekdayContainer, ScheduleCell, ClockContainer } from './ScheduleViewer.styles'

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
    console.log("clockTimesArray[i]" + clockTimesArray[i])
  
    const agendamentoExisteNesteHorario = agendamentos.find((agendamento: any) => {
      return agendamento.horario_inicio === clockTimesArray[i]
    })

    const idAgendamento = agendamentoExisteNesteHorario ? agendamentoExisteNesteHorario.id : null

    
    console.log("agendamento.horario_inicio === clockTimesArray[i]")
    console.log(agendamentoExisteNesteHorario ? false : true)
    console.log("===================================================")

    const item = {
      id: i,
      selecionado: agendamentoExisteNesteHorario ? false : true,
      Agendamento: [agendamentos.find((agendamento: any) => agendamento.id == idAgendamento)]
    }

    items.push(item)

  }
  return items;
};

interface scheduleDataProps {
id: number;
selecionado: boolean;
Agendamento: any[]; // Specify the type of Agendamento array as needed
} 

function ScheduleViewer({props}: any) {

  const [form, setForm] = React.useState({} as any)
  const [schedule, setSchedule] = React.useState(array)
  const [scheduleData, SetScheduleData] = React.useState<scheduleDataProps[]>([])

  useEffect(() => {

    console.log("ScheduleViewer useEffect")

    console.log("ScheduleViewer props")

    console.log(props.uuid_agendamento)

    fetchByGroupedId("token valido")
    // setSchedule()
    if (props) {
      setForm(props)
    }
    
  }, [props])

  async function fetchByGroupedId(token: string = localStorage.getItem('token') || "") {
    console.log("Fetching fetchByGroupedId...")

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
    }).then((response) => response.json()).then(async(data) => {

      console.log("ScheduleViewer")
      console.log(data)

      const transformedData = await transformData(data)

      console.log("transformedData")
      console.log(transformedData)

      return SetScheduleData(transformedData)

    }).catch((error) => {
      console.log(error)
    }
    )
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
          <h2>LAB 2</h2>
          {
           scheduleData.map((item) => (
              <ScheduleCell key={item.id}>
                <p>{
                  item.selecionado ? "Disponível" : "Selecionado"
                }</p>
              </ScheduleCell>
            ))
          }
        </WeekdayContainer>
      </Container>
      <div>

      </div>
    </>
  )
}

export default ScheduleViewer