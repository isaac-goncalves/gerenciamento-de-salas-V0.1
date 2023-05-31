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

function ScheduleViewer(props: any) {

  const [form, setForm] = React.useState({} as any)
  const [schedule, setSchedule] = React.useState(array)
  const [scheduleData, SetScheduleData] = React.useState([])

  useEffect(() => {

    if (props) {
      setForm(props)
    }

    console.log("ScheduleViewer useEffect")
    setSchedule(props.schedule)
    fetchByGroupedId("token valido")
  }, [props.schedule])

  async function fetchByGroupedId(token: string = localStorage.getItem('token') || "") {
    console.log("Fetching fetchByGroupedId...")

    const obj = {
      uuid_agendamento: "#86563",
    }

    const bodyParams = JSON.stringify(obj)


    await fetch('http://localhost:3333/agendamento/grouped', {
      method: 'POST',
      headers: {
        'Authorization': 'bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: bodyParams
    }).then((response) => response.json()).then((data) => {

      console.log("ScheduleViewer================")
      console.log(data)
      return SetScheduleData(data)

    }).catch((error) => {
      console.log(error)
    }
    )
  }

  const test = () => {
    console.log("ScheduleViewer")
    console.log(props)
  }

  test()

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
            array.map((item) => (
              <ScheduleCell key={item.id}>
                <p>{
                  item.disponivel === "False" ? "Disponível" : "Indisponível"
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