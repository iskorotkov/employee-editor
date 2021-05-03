export type ID = number

export type Position = string

export enum Gender {
  male = 'male',
  female = 'female'
}

export interface Employee {
  id: ID
  firstName: string
  secondName: string
  middleName: string | null
  position: Position
  birthday: Date
  gender: Gender
  employmentDate: Date
  firingDate: Date | null
  hasDrivingLicense: boolean
  colleagues: Employee[]
}

export interface EmployeeRepo {
  add (e: Employee): void

  remove (e: Employee): void

  update (e: Employee): void

  list (): Employee[]
}

