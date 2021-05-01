export type ID = number

export type Position = string

export enum Gender {
  Male = 'male',
  Female = 'female'
}

export interface Employee {
  ID: ID
  FirstName: string
  SecondName: string
  MiddleName: string | null
  Position: Position
  Birthday: Date
  Gender: Gender
  EmploymentDate: Date
  FiringDate: Date | null
  HasDrivingLicense: boolean
  Colleagues: Employee[]
}

export interface EmployeeRepo {
  Add (e: Employee): void

  Remove (e: Employee): void

  Update (e: Employee): void

  List (): Employee[]
}

