import React, { useEffect, useState } from 'react'

import { Navigate } from 'react-router-dom'

import Calendar from 'react-calendar';

import './Calendar.css';

function CalendarPage() {
  const [date, setDate] = useState(new Date());

  //verifies if token stored on localstorage is valid

  useEffect(
    async () => {
      const token = localStorage.getItem('token')
      if (token) {

        const response = await fetch('http://localhost:3333/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
          }),
        })
        const data = await response.json()
        if (data.token) {
        } else {

        }
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);

  return (
    <div>
      <h1 className='text-center'>Calendar</h1>
      <div className='calendar-container'>
        <Calendar onChange={setDate} value={date} />
      </div>
      <p className='text-center'>
        <span className='bold'>Selected Date:</span>{' '}
        {date.toDateString()}
      </p>
    </div>
  )
}

export default CalendarPage