import React from 'react'

import { Container, WeekdayContainer, Laboratorio, ScheduleCell } from './ScheduleViewer.styles'

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

function ScheduleViewer() {
  return (
    <>
      <Container>
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
    </>
  )
}

export default ScheduleViewer