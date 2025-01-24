import React from 'react'
import Calendar from '../components/Calendar.jsx'
import {useState} from 'react'

export default function GenerateMenu() {

    const [selectedDaysFromCalendar, setSelectedDaysFromCalendar] = useState([])

    const handleSelectedDaysUpdate = (days) => {
        setSelectedDaysFromCalendar(days)
    }
  return (
    <div className="w-screen">
        <h2 className="text-center m-4">Generate Menu</h2>
        <div className="flex flex-col w-full">
            <div className="flex flex-col items-center w-full">
                <h2 className="text-center items-center m-3">Select Date</h2>
                <span className="text-center items-center m-2">Choose a week to generate a menu for</span>
                <Calendar onSelectedDaysChange={handleSelectedDaysUpdate}/>
            </div>
            <div>

            </div>
        <button onClick={() => console.log(selectedDaysFromCalendar)}>test</button>

        </div>
    </div>
  )
}
