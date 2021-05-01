import Form from 'react-bootstrap/Form'
import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import { Employee, Position } from '../data/employee'

const FloatingInput = (props: {
  id: string
  type: string
  label: string
  placeholder: string
}) => {
  return (
    <div className="form-floating mb-2">
      <Form.Control id={props.id} type={props.type} placeholder={props.placeholder}/>
      <Form.Label htmlFor={props.id}>{props.label}</Form.Label>
    </div>
  )
}

export function EmployeeForm (props: {
  others: Employee[]
  positions: Position[]
  employee?: Employee
}) {
  return (
    <Form>
      <Form.Label>Personal info</Form.Label>
      <FloatingInput id="first-name" type="text" label="First name" placeholder="Ivan"/>
      <FloatingInput id="middle-name" type="text" label="Middle name" placeholder="Ivanovich"/>
      <FloatingInput id="second-name" type="text" label="Second name" placeholder="Ivanov"/>

      <FloatingInput id="birthday" type="date" label="Birthday" placeholder={new Date().toDateString()}/>

      <Form.Check className="mb-2">
        <Form.Check.Input id="driving-license" type="checkbox"/>
        <Form.Check.Label htmlFor="driving-license">Driving license</Form.Check.Label>
      </Form.Check>

      <Form.Label className="mt-3">Gender</Form.Label>
      <InputGroup className="mb-2">
        <Form.Check inline>
          <Form.Check.Input id="gender-male" type="radio" name="gender"/>
          <Form.Check.Label htmlFor="gender-male">male</Form.Check.Label>
        </Form.Check>

        <Form.Check inline>
          <Form.Check.Input id="gender-female" type="radio" name="gender"/>
          <Form.Check.Label htmlFor="gender-female">female</Form.Check.Label>
        </Form.Check>
      </InputGroup>

      <Form.Label className="mt-3">Employment</Form.Label>
      <FloatingInput id="position" type="text" label="Position" placeholder="Developer"/>
      <FloatingInput id="employment-date" type="date" label="Employment date" placeholder={new Date().toDateString()}/>
      <FloatingInput id="firing-date" type="date" label="Firing date" placeholder={new Date().toDateString()}/>
    </Form>
  )
}
