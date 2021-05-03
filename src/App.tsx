import React, { useState } from 'react'
import './App.css'
import { EmployeeList } from './components/EmployeeList'
import { EmployeeRepo } from './data/employee'
import Button from 'react-bootstrap/Button'
import { EmployeeForm } from './components/EmployeeForm'
import { LocalEmployeeRepo } from './localStorage/localEmployeeRepo'

function App () {
  const repo: EmployeeRepo = new LocalEmployeeRepo()
  const employees = repo.list()

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
        <EmployeeForm positions={[]} colleagues={employees} show={show} hideForm={handleClose}
                      onApply={e => repo.add(e)}/>
      </main>
    </div>
  )
}

export default App
