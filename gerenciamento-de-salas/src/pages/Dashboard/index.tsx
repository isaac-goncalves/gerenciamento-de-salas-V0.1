import React, { useEffect, useState } from 'react'

import { Navigate } from 'react-router-dom'
import Navbar from '../Navbar';

import { Container, Header, CourseName, Semester, ClassesContainer, ClockContainer, WeekdayContainer, SchedulesContainer, Schedule, WeekContainer, CourseSemester } from './Dashboard.styles'

function Dashboard() {
  const [date, setDate] = useState(new Date());

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
                <Schedule>
                  <p>Matematica discreta</p>
                  <p>Prof. João</p>
                  <p>Lab. 1</p>
                </Schedule>
                <Schedule>
                  <p>Matematica discreta</p>
                  <p>Prof. João</p>
                  <p>Lab. 1</p>
                </Schedule>
                <Schedule>
                  <p>Matematica discreta</p>
                  <p>Prof. João</p>
                  <p>Lab. 1</p>
                </Schedule>
                <Schedule>
                  <p>Intervalo</p>
                </Schedule>
                <Schedule>
                  <p>Matematica discreta</p>
                  <p>Prof. João</p>
                  <p>Lab. 1</p>
                </Schedule>
                <Schedule>
                  <p>Matematica discreta</p>
                  <p>Prof. João</p>
                  <p>Lab. 1</p>
                </Schedule>
              </SchedulesContainer>
            </WeekdayContainer>
            <WeekdayContainer>
              <h2>Terça</h2>
              <SchedulesContainer>
                <Schedule>
                  <p>Matematica discreta</p>
                  <p>Prof. João</p>
                  <p>Lab. 1</p>
                </Schedule>
                <Schedule>
                  <p>Matematica discreta</p>
                  <p>Prof. João</p>
                  <p>Lab. 1</p>
                </Schedule>
                <Schedule>
                  <p>Matematica discreta</p>
                  <p>Prof. João</p>
                  <p>Lab. 1</p>
                </Schedule>
                <Schedule>
                  <p>Intervalo</p>
                </Schedule>

                <Schedule>
                  <p>Matematica discreta</p>
                  <p>Prof. João</p>
                  <p>Lab. 1</p>
                </Schedule>
                <Schedule>
                  <p>Matematica discreta</p>
                  <p>Prof. João</p>
                  <p>Lab. 1</p>
                </Schedule>

              </SchedulesContainer>
            </WeekdayContainer>

            <WeekdayContainer>

              <h2>Quarta</h2>
              <SchedulesContainer>

                <Schedule>
                  <p>Matematica discreta</p>
                  <p>Prof. João</p>
                  <p>Lab. 1</p>
                </Schedule>
                <Schedule>
                  <p>Matematica discreta</p>
                  <p>Prof. João</p>
                  <p>Lab. 1</p>
                </Schedule>
                <Schedule>
                  <p>Matematica discreta</p>
                  <p>Prof. João</p>
                  <p>Lab. 1</p>
                </Schedule>
                <Schedule>
                  <p>Intervalo</p>
                </Schedule>
                <Schedule>
                  <p>Matematica discreta</p>
                  <p>Prof. João</p>
                  <p>Lab. 1</p>
                </Schedule>
                <Schedule>
                  <p>Matematica discreta</p>
                  <p>Prof. João</p>
                  <p>Lab. 1</p>
                </Schedule>

              </SchedulesContainer>
            </WeekdayContainer>

            <WeekdayContainer>

              <h2>Quinta</h2>
              <SchedulesContainer>

                <Schedule>
                  <p>Matematica discreta</p>
                  <p>Prof. João</p>
                  <p>Lab. 1</p>
                </Schedule>
                <Schedule>
                  <p>Matematica discreta</p>
                  <p>Prof. João</p>
                  <p>Lab. 1</p>
                </Schedule>
                <Schedule>
                  <p>Matematica discreta</p>
                  <p>Prof. João</p>
                  <p>Lab. 1</p>
                </Schedule>
                <Schedule>
                  <p>Intervalo</p>
                </Schedule>
                <Schedule>
                  <p>Matematica discreta</p>
                  <p>Prof. João</p>
                  <p>Lab. 1</p>
                </Schedule>
                <Schedule>
                  <p>Matematica discreta</p>
                  <p>Prof. João</p>
                  <p>Lab. 1</p>
                </Schedule>

              </SchedulesContainer>
            </WeekdayContainer>

            <WeekdayContainer>

              <h2>Sexta</h2>
              <SchedulesContainer>

                <Schedule>
                  <p>Matematica discreta</p>
                  <p>Prof. João</p>
                  <p>Lab. 1</p>
                </Schedule>
                <Schedule>
                  <p>Matematica discreta</p>
                  <p>Prof. João</p>
                  <p>Lab. 1</p>
                </Schedule>
                <Schedule>
                  <p>Matematica discreta</p>
                  <p>Prof. João</p>
                  <p>Lab. 1</p>
                </Schedule>
                <Schedule>
                  <p>Intervalo</p>
                </Schedule>
                <Schedule>
                  <p>Matematica discreta</p>
                  <p>Prof. João</p>
                  <p>Lab. 1</p>
                </Schedule>
                <Schedule>
                  <p>Matematica discreta</p>
                  <p>Prof. João</p>
                  <p>Lab. 1</p>
                </Schedule>

              </SchedulesContainer>
            </WeekdayContainer>

          </WeekContainer>
        </ClassesContainer>
      </Container>
    </>
  )
}

export default Dashboard
