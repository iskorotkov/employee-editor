import { Employee } from '../data/employee'

export const toFullName = (e: Employee) => e.middleName
  ? `${e.firstName} ${e.middleName} ${e.secondName}`
  : `${e.firstName} ${e.secondName}`
