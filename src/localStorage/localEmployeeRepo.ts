import { Employee, EmployeeRepo } from '../data/employee'

export const key = 'currentKey'

export class LocalEmployeeRepo implements EmployeeRepo {
  private static nextID () {
    const lastID = localStorage.getItem(key)
    const newId = lastID ? parseInt(lastID) + 1 : 0
    localStorage.setItem(key, newId.toString())
    return newId
  }

  add (e: Employee): void {
    e.id = LocalEmployeeRepo.nextID()
    localStorage.setItem(e.id.toString(), JSON.stringify(e))
  }

  list (): Employee[] {
    const employees = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)!
      const data = localStorage.getItem(key)!
      const employee = JSON.parse(data) as Employee
      employees.push(employee)
    }

    return employees
  }

  remove (e: Employee): void {
    localStorage.removeItem(e.id.toString())
  }

  update (e: Employee): void {
    localStorage.setItem(e.id.toString(), JSON.stringify(e))
  }
}
