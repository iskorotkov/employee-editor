import { Employee } from '../data/employee'
import Table from 'react-bootstrap/Table'
import React from 'react'

export function EmployeeList (props: {
  employees: Employee[]
}) {
  return (
    <Table hover responsive>
      <thead className="align-middle">
      <tr>
        <th>First name</th>
        <th>Middle name</th>
        <th>Second name</th>
        <th>Position</th>
        <th>Birthday</th>
        <th>Gender</th>
        <th>Employment date</th>
        <th>Firing date</th>
        <th>Driving license</th>
        <th>Colleagues</th>
      </tr>
      </thead>
      <tbody className="align-middle">
      {props.employees.map(e => {
        return (
          <tr key={e.id}>
            <td>{e.firstName}</td>
            <td>{e.middleName !== '' ? e.middleName : '-'}</td>
            <td>{e.secondName}</td>
            <td>{e.position}</td>
            <td>{e.birthday.toLocaleDateString()}</td>
            <td>{e.gender}</td>
            <td>{e.employmentDate.toLocaleDateString()}</td>
            <td>{e.firingDate?.toLocaleDateString() ?? '-'}</td>
            <td>{e.hasDrivingLicense ? 'yes' : 'no'}</td>
            <td>{e.colleagues.length} persons</td>
          </tr>
        )
      })}
      </tbody>
    </Table>
  )
}
