import React, { useState } from 'react'
import './App.css'
import { EmployeeList } from './components/EmployeeList'
import { Employee, EmployeeRepo } from './data/employee'
import Button from 'react-bootstrap/Button'
import { EmployeeForm } from './components/EmployeeForm'
import { LocalEmployeeRepo } from './localStorage/localEmployeeRepo'

function App () {
  const repo: EmployeeRepo = new LocalEmployeeRepo()
  const employees = repo.list()

  const [show, setShow] = useState(false)

  const handleShowCreateForm = () => setShow(true)
  const handleCloseCreateForm = () => setShow(false)
  const handleCloseEditForm = () => setSelectedEmployee(null)

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  const handleDelete = (toDelete: Employee) => {
    employees.forEach(e => {
      const i = e.colleagues.indexOf(toDelete.id)
      if (i !== -1) {
        e.colleagues.splice(i, 1)
        repo.update(e)
      }
    })

    repo.remove(toDelete)
  }

  return (
    <div className="App">
      <header className="w-100 p-0 m-0 bg-primary">
        <div className="d-flex flex-row flex-nowrap mx-2 p-3 align-items-center">
          <h2 className="text-white p-0 m-0">Employee Editor</h2>
          <span className="flex-grow-1"/>
          <Button variant="success" onClick={handleShowCreateForm}>Add new employee</Button>
        </div>
      </header>
      <main>
        <EmployeeList employees={employees} onSelect={setSelectedEmployee}/>

        {show
          ? <EmployeeForm title="Add new employee" others={employees}
                          hideForm={handleCloseCreateForm} onApply={repo.add}/>
          : false}

        {selectedEmployee
          ? <EmployeeForm title="Edit employee" employee={selectedEmployee ?? undefined}
                          others={employees.filter(e => e.id !== selectedEmployee?.id)}
                          hideForm={handleCloseEditForm} onApply={repo.update} onDelete={handleDelete}/>
          : null}
      </main>
    </div>
  )
}

export default App
