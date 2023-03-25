import React, { useEffect, useState } from 'react'

import { Navigate } from 'react-router-dom'
import Navbar from '../Navbar';


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
    <div>
      <Navbar/>
      {/* <h1 className='text-center'>Calendar</h1>
      <div className='calendar-container'>
        <h1>Dash</h1>
      </div>
      <p className='text-center'>
        <span className='bold'>Selected Date:</span>{' '}
        {date.toDateString()}
      </p> */}
    </div>
  )
}

export default Dashboard
