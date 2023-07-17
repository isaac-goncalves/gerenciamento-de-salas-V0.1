import React, { useState } from 'react'

import DatePicker from "react-widgets/DatePicker";
import "react-widgets/styles.css";

function Calendar() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
    defaultValue={new Date()}
    valueEditFormat={{ dateStyle: "short" }}
    valueDisplayFormat={{ dateStyle: "medium" }}
  />
  )
}

export default Calendar