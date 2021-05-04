export enum Gender {
  male = 'male',
  female = 'female'
}

export interface Tag {
  id: number
  name: string
  type: string
  value: string
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
  tags: Tag[]
}

export interface EmployeeRepo {
  add (e: Employee): void

  remove (e: Employee): void

  update (e: Employee): void

  list (): Employee[]
}

