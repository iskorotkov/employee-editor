export enum Gender {
  male = 'male',
  female = 'female'
}

export interface Employee {
  id: number
  firstName: string
  secondName: string
  middleName: string | null
  position: string
  birthday: Date
  gender: Gender
  employmentDate: Date
  firingDate: Date | null
  hasDrivingLicense: boolean
  colleagues: number[]
}

export interface EmployeeRepo {
  add (e: Employee): void

  remove (e: Employee): void

  update (e: Employee): void

  list (): Employee[]
}

