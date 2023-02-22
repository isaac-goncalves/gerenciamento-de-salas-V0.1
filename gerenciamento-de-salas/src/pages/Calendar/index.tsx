import React, { useState } from 'react'

import Calendar from 'react-calendar';

import './Calendar.css';

function CalendarPage() {
  const [date, setDate] = useState(new Date());

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