import { Employee, EmployeeRepo, Gender } from '../data/employee'

export const localStorageKey = 'currentKey'

export class LocalEmployeeRepo implements EmployeeRepo {
  private static lastID () {
    const lastID = localStorage.getItem(localStorageKey)
    return lastID ? parseInt(lastID) : 0
  }

  private static incrementID () {
    const newId = this.lastID() + 1
    localStorage.setItem(localStorageKey, newId.toString())
    return newId
  }

  private static toEmployee (data: any): Employee {
    return {
      id: data.id,
      firstName: data.firstName,
      middleName: data.middleName,
      secondName: data.secondName,
      birthday: new Date(data.birthday),
      gender: (Gender as any)[data.gender],
      hasDrivingLicense: data.hasDrivingLicense,
      position: data.position,
      employmentDate: new Date(data.employmentDate),
      firingDate: data.firingDate ? new Date(data.firingDate) : null,
      colleagues: []
    }
  }

  add (e: Employee): void {
    e.id = LocalEmployeeRepo.incrementID()
    localStorage.setItem(e.id.toString(), JSON.stringify(e))
  }

  list (): Employee[] {
    const employees = []
    const lastID = LocalEmployeeRepo.lastID()

    for (let i = 0; i <= lastID; i++) {
      const key = localStorage.key(i)
      if (!key) {
        console.log(`Couldn't read key ${i}`)
        break
      }

      const json = localStorage.getItem(key)
      if (!json) {
        console.log(`Couldn't read data with key ${i}`)
        break
      }

      const data = JSON.parse(json)
      const employee = LocalEmployeeRepo.toEmployee(data)
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
