import { Employee, EmployeeRepo } from '../data/employee'

export class LocalEmployeeRepo implements EmployeeRepo {
  Add (e: Employee): void {
    localStorage.setItem(e.ID.toString(), JSON.stringify(e))
  }

  List (): Employee[] {
    const employees = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)!
      const data = localStorage.getItem(key)!
      const employee = JSON.parse(data) as Employee
      employees.push(employee)
    }

    return employees
  }

  Remove (e: Employee): void {
    localStorage.removeItem(e.ID.toString())
  }

  Update (e: Employee): void {
    localStorage.setItem(e.ID.toString(), JSON.stringify(e))
  }
}
