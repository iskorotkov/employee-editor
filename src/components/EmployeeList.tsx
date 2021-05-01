import { Employee } from '../data/employee'
import Table from 'react-bootstrap/Table'

export function EmployeeList (props: {
  employees: Employee[]
}) {
  return (
    <Table hover responsive borderless>
      <thead className="shadow">
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
      <tbody>
      {props.employees.map(e => {
        return (
          <tr key={e.ID}>
            <td>{e.FirstName}</td>
            <td>{e.MiddleName ?? '-'}</td>
            <td>{e.SecondName}</td>
            <td>{e.Position}</td>
            <td>{e.Birthday.toLocaleDateString()}</td>
            <td>{e.Gender}</td>
            <td>{e.EmploymentDate.toLocaleDateString()}</td>
            <td>{e.FiringDate?.toLocaleDateString() ?? '-'}</td>
            <td>{e.HasDrivingLicense ? 'yes' : 'no'}</td>
            <td>{e.Colleagues.length}</td>
          </tr>
        )
      })}
      </tbody>
    </Table>
  )
}
