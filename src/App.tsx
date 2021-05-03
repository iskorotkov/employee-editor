import React, { useState } from 'react'
import './App.css'
import { EmployeeList } from './components/EmployeeList'
import { Employee, EmployeeRepo, Gender } from './data/employee'
import Button from 'react-bootstrap/Button'
import { EmployeeForm } from './components/EmployeeForm'
import { LocalEmployeeRepo } from './localStorage/localEmployeeRepo'

function App () {
  const employees: Employee[] = [
    {
      id: 1,
      firstName: 'Ivan',
      secondName: 'Ivanov',
      middleName: 'Ivanovich',
      birthday: new Date(2020, 3, 12),
      gender: Gender.male,
      position: 'React Developer',
      employmentDate: new Date(2012, 2, 21),
      firingDate: new Date(2121, 12, 12),
      hasDrivingLicense: false,
      colleagues: []
    },
    {
      id: 2,
      firstName: 'Anna',
      secondName: 'Smith',
      middleName: null,
      birthday: new Date(1990, 3, 31),
      gender: Gender.female,
      position: 'Senior Java Developer',
      employmentDate: new Date(2016, 12, 5),
      firingDate: null,
      hasDrivingLicense: true,
      colleagues: []
    }
  ]

  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const repo: EmployeeRepo = new LocalEmployeeRepo()

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
        <EmployeeForm positions={[]} colleagues={employees} show={show} hideForm={handleClose}
                      onApply={e => repo.add(e)}/>
      </main>
    </div>
  )
}

export default App
