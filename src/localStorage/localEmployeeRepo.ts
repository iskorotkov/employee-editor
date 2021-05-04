import { Employee, EmployeeRepo, Gender, Tag } from '../data/employee'

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

  private static toTag (data: any): Tag {
    return {
      id: data.id ?? 0,
      name: data.name ?? '',
      type: data.type ?? 'text',
      value: data.value ?? ''
    }
  }

  private static toEmployee (data: any): Employee {
    return {
      id: data.id ?? 0,
      firstName: data.firstName ?? '',
      middleName: data.middleName ?? '',
      secondName: data.secondName ?? '',
      birthday: new Date(data.birthday),
      gender: (Gender as any)[data.gender] ?? Gender.male,
      hasDrivingLicense: data.hasDrivingLicense ?? false,
      position: data.position ?? '',
      employmentDate: new Date(data.employmentDate),
      firingDate: data.firingDate ? new Date(data.firingDate) : null,
      colleagues: data.colleagues ?? '',
      tags: data.tags?.map(this.toTag) ?? []
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
      if (!key || isNaN(parseInt(key))) {
        continue
      }

      const json = localStorage.getItem(key)
      if (!json) {
        continue
      }

      const data = JSON.parse(json)
      if (!data) {
        continue
      }

      const employee = LocalEmployeeRepo.toEmployee(data)
      employees.push(employee)
    }

    return employees.sort((a, b) => a.id - b.id)
  }

  remove (e: Employee): void {
    localStorage.removeItem(e.id.toString())
  }

  update (e: Employee): void {
    localStorage.setItem(e.id.toString(), JSON.stringify(e))
  }
}
