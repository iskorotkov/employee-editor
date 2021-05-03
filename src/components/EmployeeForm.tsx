import Form from 'react-bootstrap/Form'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Employee, Gender, Position } from '../data/employee'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Floating } from './Floating'
import AsyncCreatableSelect from 'react-select/async-creatable'
import { OptionsType } from 'react-select'

const loadOptions = async (filter: string) => {
  const url = `https://api.hh.ru/vacancies?text="${filter}"`
  const result = await fetch(url)
  if (!result.ok) {
    return []
  }

  const json = await result.json()
  const names: string[] = json.items
    .map((item: { name: string }) => item.name)

  const unique: string[] = []
  names.forEach(name => {
    if (unique.indexOf(name) === -1) {
      unique.push(name)
    }
  })

  return unique.map(name => ({
    value: name,
    label: name
  }))
}

const PositionsSelector = (props: {
  onChange: (value: string) => void
}) => {
  const handleChange = (e: { value: string } | OptionsType<{ value: string }> | null) => {
    if (e && 'value' in e) {
      props.onChange(e.value)
    }
  }

  return <AsyncCreatableSelect cacheOptions loadOptions={loadOptions} onChange={handleChange}/>
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

    if (form.checkValidity() && position !== '') {
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

          <Floating className="mb-2">
            <Form.Control id="first-name" type="text" placeholder="Ivan" required
                          value={firstName} onChange={handleFirstName}/>
            <Form.Label htmlFor="first-name">First name</Form.Label>
          </Floating>

          <Floating className="mb-2">
            <Form.Control id="middle-name" type="text" placeholder="Ivanovich"
                          value={middleName} onChange={handleMiddleName}/>
            <Form.Label htmlFor="middle-name">Middle name</Form.Label>
          </Floating>

          <Floating className="mb-2">
            <Form.Control id="second-name" type="text" placeholder="Ivanov" required
                          value={secondName} onChange={handleSecondName}/>
            <Form.Label htmlFor="second-name">Second name</Form.Label>
          </Floating>

          <Floating className="mb-2">
            <Form.Control id="birthday" type="date" placeholder={new Date().toDateString()} required
                          value={birthday} onChange={handleBirthday}/>
            <Form.Label htmlFor="birthday">Birthday</Form.Label>
          </Floating>

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

          <Floating className="mb-2">
            <PositionsSelector onChange={setPosition}/>
          </Floating>

          <Floating className="mb-2">
            <Form.Control id="employment-date" type="date" placeholder={new Date().toDateString()} required
                          value={employmentDate} onChange={handleEmploymentDateChange}/>
            <Form.Label htmlFor="employment-date">Employment date</Form.Label>
          </Floating>

          <Floating className="mb-2">
            <Form.Control id="firing-date" type="date" placeholder={new Date().toDateString()} min={employmentDate}
                          value={firingDate} onChange={handleFiringDateChange}/>
            <Form.Label htmlFor="firing-date">Firing date</Form.Label>
          </Floating>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button form="employee-form" variant="secondary" type="reset">Close</Button>
        <Button form="employee-form" variant="primary" type="submit">Save changes</Button>
      </Modal.Footer>
    </Modal>
  )
}
