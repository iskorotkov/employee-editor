import Form from 'react-bootstrap/Form'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Employee, Gender, Position } from '../data/employee'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const FloatingInput = (props: {
  id: string
  label: string
  [values: string]: any
}) => {
  return (
    <div className="form-floating mb-2">
      <Form.Control {...props}/>
      <Form.Label htmlFor={props.id}>{props.label}</Form.Label>
    </div>
  )
}

export function EmployeeForm (props: {
  positions: Position[]
  colleagues: Employee[]
  show: boolean
  hideForm: () => void
  onApply: (employee: Employee) => void
  employee?: Employee
}) {
  const [validated, setValidated] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [middleName, setMiddleName] = useState('')

  const [birthday, setBirthday] = useState('')
  const [gender, setGender] = useState(Gender.male)
  const [hasDrivingLicense, setHasDrivingLicense] = useState(false)

  const [position, setPosition] = useState('')
  const [employmentDate, setEmploymentDate] = useState('')
  const [firingDate, setFiringDate] = useState('')

  const handleSubmit = (event: FormEvent) => {
    const form = event.currentTarget as unknown as { checkValidity: () => boolean }
    if (form.checkValidity()) {
      const employee = {
        id: 0,
        firstName,
        middleName,
        secondName,
        birthday: new Date(birthday),
        gender,
        hasDrivingLicense,
        position,
        employmentDate: new Date(employmentDate),
        firingDate: new Date(firingDate),
        colleagues: []
      }

      props.onApply(employee)
      props.hideForm()
    } else {
      event.preventDefault()
      event.stopPropagation()
    }

    setValidated(true)
  }

  const handleChange = (event: ChangeEvent, f: (value: string) => void) => {
    const input = event.target as HTMLInputElement
    f(input.value)
  }

  const handleFirstName = (e: ChangeEvent) => handleChange(e, setFirstName)
  const handleMiddleName = (e: ChangeEvent) => handleChange(e, setMiddleName)
  const handleSecondName = (e: ChangeEvent) => handleChange(e, setSecondName)

  const handleBirthday = (e: ChangeEvent) => handleChange(e, setBirthday)
  const handleDrivingLicense = (event: ChangeEvent) => {
    const input = event.target as HTMLInputElement
    setHasDrivingLicense(input.checked)
  }

  const handlePosition = (e: ChangeEvent) => handleChange(e, setPosition)
  const handleEmploymentDateChange = (e: ChangeEvent) => handleChange(e, setEmploymentDate)
  const handleFiringDateChange = (e: ChangeEvent) => handleChange(e, setFiringDate)

  return (
    <Modal show={props.show} onHide={props.hideForm}>
      <Modal.Header>
        <Modal.Title className="px-3">Add new employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="employee-form" noValidate validated={validated} onSubmit={handleSubmit} onReset={props.hideForm}>
          <Form.Label>Personal info</Form.Label>
          <FloatingInput id="first-name" type="text" label="First name" placeholder="Ivan" required
                         value={firstName} onChange={handleFirstName}/>
          <FloatingInput id="middle-name" type="text" label="Middle name" placeholder="Ivanovich"
                         value={middleName} onChange={handleMiddleName}/>
          <FloatingInput id="second-name" type="text" label="Second name" placeholder="Ivanov" required
                         value={secondName} onChange={handleSecondName}/>
          <FloatingInput id="birthday" type="date" label="Birthday" placeholder={new Date().toDateString()} required
                         value={birthday} onChange={handleBirthday}/>

          <Container fluid>
            <Row className="mt-3">
              <Col sm={2}>
                <Form.Label>Gender</Form.Label>
              </Col>
              <Col sm={10}>
                <Form.Check inline>
                  <Form.Check.Input id="gender-male" type="radio" name="gender"
                                    checked={gender === Gender.male} onChange={() => setGender(Gender.male)}/>
                  <Form.Check.Label htmlFor="gender-male">male</Form.Check.Label>
                </Form.Check>

                <Form.Check inline>
                  <Form.Check.Input id="gender-female" type="radio" name="gender"
                                    checked={gender === Gender.female} onChange={() => setGender(Gender.female)}/>
                  <Form.Check.Label htmlFor="gender-female">female</Form.Check.Label>
                </Form.Check>
              </Col>
            </Row>

            <Form.Check>
              <Form.Check.Input id="driving-license" type="checkbox"
                                checked={hasDrivingLicense} onChange={handleDrivingLicense}/>
              <Form.Check.Label htmlFor="driving-license">Driving license</Form.Check.Label>
            </Form.Check>
          </Container>

          <Form.Label className="mt-3">Employment</Form.Label>
          <FloatingInput id="position" type="text" label="Position" placeholder="Developer" required
                         value={position} onChange={handlePosition}/>
          <FloatingInput id="employment-date" type="date" label="Employment date"
                         placeholder={new Date().toDateString()} required
                         value={employmentDate} onChange={handleEmploymentDateChange}/>
          <FloatingInput id="firing-date" type="date" label="Firing date"
                         placeholder={new Date().toDateString()} min={employmentDate}
                         value={firingDate} onChange={handleFiringDateChange}/>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button form="employee-form" variant="secondary" type="reset">Close</Button>
        <Button form="employee-form" variant="primary" type="submit">Save changes</Button>
      </Modal.Footer>
    </Modal>
  )
}
