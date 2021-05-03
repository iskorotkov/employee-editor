import React, { useState } from 'react'
import './App.css'
import { EmployeeList } from './components/EmployeeList'
import { Employee, Gender } from './data/employee'
import Button from 'react-bootstrap/Button'
import { EmployeeForm } from './components/EmployeeForm'

function App () {
  const employees: Employee[] = [
    {
      ID: 1,
      FirstName: 'Ivan',
      SecondName: 'Ivanov',
      MiddleName: 'Ivanovich',
      Birthday: new Date(2020, 3, 12),
      Gender: Gender.Male,
      Position: 'React Developer',
      EmploymentDate: new Date(2012, 2, 21),
      FiringDate: new Date(2121, 12, 12),
      HasDrivingLicense: false,
      Colleagues: []
    },
    {
      ID: 2,
      FirstName: 'Anna',
      SecondName: 'Smith',
      MiddleName: null,
      Birthday: new Date(1990, 3, 31),
      Gender: Gender.Female,
      Position: 'Senior Java Developer',
      EmploymentDate: new Date(2016, 12, 5),
      FiringDate: null,
      HasDrivingLicense: true,
      Colleagues: []
    }
  ]

  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  return (
    <div className="App">
      <header className="w-100 p-0 m-0 bg-primary">
        <div className="d-flex flex-row flex-nowrap mx-2 p-3 align-items-center">
          <h2 className="text-white p-0 m-0">Employee Editor</h2>
          <span className="flex-grow-1"/>
          <Button variant="success" onClick={handleShow}>Add new employee</Button>
        </div>
      </header>
      <main>
        <EmployeeList employees={employees}/>
        <EmployeeForm positions={[]} colleagues={employees} show={show} onHide={handleClose}/>
      </main>
    </div>
  )
}

export default App
