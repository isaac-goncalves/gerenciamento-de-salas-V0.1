import React from 'react'

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

  console.log(props)

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