export type ID = number

export type Position = string

export enum Gender {
  Male,
  Female
}

export interface Employee {
  ID: ID
  FirstName: string
  SecondName: string
  MiddleName: string
  Position: Position
  Birthday: Date
  Gender: Gender
  EmploymentDate: Date
  FiringDate: Date
  HasDrivingLicense: boolean
  Colleagues: Employee[]
}

export interface EmployeeRepo {
  Add (e: Employee): void

  Remove (e: Employee): void

  Update (e: Employee): void

  List (): Employee[]
}

