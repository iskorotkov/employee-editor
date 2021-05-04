import { Employee } from '../data/employee'
import Table from 'react-bootstrap/Table'
import React from 'react'
import './EmployeeList.css'

export function EmployeeList (props: {
  employees: Employee[]
  onSelect: (selected: Employee) => void
}) {
  return (
    <Table hover responsive>
      <thead className="align-middle">
      <tr>
        <th>First name</th>
        <th>Middle name</th>
        <th>Second name</th>
        <th>Birthday</th>
        <th>Gender</th>
        <th>Driving license</th>

        <th>Position</th>
        <th>Employment date</th>
        <th>Firing date</th>
        <th>Colleagues</th>

        <th>Tags</th>
      </tr>
      </thead>
      <tbody className="align-middle">
      {props.employees.map(e => {
        return (
          <tr key={e.id} className="cursor-pointer" onClick={() => props.onSelect(e)}>
            <td>{e.firstName}</td>
            <td>{e.middleName !== '' ? e.middleName : '-'}</td>
            <td>{e.secondName}</td>
            <td>{e.birthday.toLocaleDateString()}</td>
            <td>{e.gender}</td>
            <td>{e.hasDrivingLicense ? 'yes' : 'no'}</td>

            <td>{e.position}</td>
            <td>{e.employmentDate.toLocaleDateString()}</td>
            <td>{e.firingDate?.toLocaleDateString() ?? '-'}</td>
            <td>{e.colleagues.length}</td>

            <td>{e.tags.length}</td>
          </tr>
        )
      })}
      </tbody>
    </Table>
  )
}
