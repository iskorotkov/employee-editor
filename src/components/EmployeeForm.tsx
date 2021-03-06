import Form from 'react-bootstrap/Form'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Employee, Gender } from '../data/employee'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Floating } from './Floating'
import { PositionsSelector } from './PositionSelector'
import { ColleaguesSelector } from './ColleaguesSelector'
import { TagsList } from './TagsList'
import { toISODate } from '../formatting/toISODate'

export function EmployeeForm (props: {
  title: string
  others: Employee[]
  hideForm: () => void
  onApply: (employee: Employee) => void
  onDelete?: (employee: Employee) => void
  employee?: Employee
}) {
  const [validated, setValidated] = useState(false)

  const [firstName, setFirstName] = useState(props.employee?.firstName ?? '')
  const [middleName, setMiddleName] = useState(props.employee?.middleName ?? '')
  const [secondName, setSecondName] = useState(props.employee?.secondName ?? '')

  const [birthday, setBirthday] = useState(toISODate(props.employee?.birthday))
  const [gender, setGender] = useState(props.employee?.gender ?? Gender.male)
  const [hasDrivingLicense, setHasDrivingLicense] = useState(props.employee?.hasDrivingLicense ?? false)

  const [position, setPosition] = useState(props.employee?.position ?? '')
  const [employmentDate, setEmploymentDate] = useState(toISODate(props.employee?.employmentDate) ?? '')
  const [firingDate, setFiringDate] = useState(toISODate(props.employee?.firingDate))

  const [colleagues, setColleagues] = useState(props.employee?.colleagues ?? [])
  const [tags, setTags] = useState(props.employee?.tags ?? [])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    const form = event.currentTarget as unknown as { checkValidity: () => boolean }
    if (form.checkValidity() && position) {
      const employee = {
        id: props.employee?.id ?? 0,
        firstName,
        middleName,
        secondName,
        birthday: new Date(birthday),
        gender,
        hasDrivingLicense,
        position,
        employmentDate: new Date(employmentDate),
        firingDate: new Date(firingDate),
        colleagues,
        tags
      }

      props.onApply(employee)
      props.hideForm()
    } else {
      event.stopPropagation()
    }

    setValidated(true)
  }

  const handleInput = (event: ChangeEvent, f: (value: string) => void) => f((event.target as HTMLInputElement).value)
  const handleFirstName = (e: ChangeEvent) => handleInput(e, setFirstName)
  const handleMiddleName = (e: ChangeEvent) => handleInput(e, setMiddleName)
  const handleSecondName = (e: ChangeEvent) => handleInput(e, setSecondName)
  const handleBirthday = (e: ChangeEvent) => handleInput(e, setBirthday)
  const handleEmploymentDateChange = (e: ChangeEvent) => handleInput(e, setEmploymentDate)
  const handleFiringDateChange = (e: ChangeEvent) => handleInput(e, setFiringDate)

  const handleDrivingLicense = (event: ChangeEvent) => {
    const input = event.target as HTMLInputElement
    setHasDrivingLicense(input.checked)
  }

  const handleDelete = () => {
    if (props.onDelete && props.employee) {
      props.onDelete(props.employee)
    }
  }

  return (
    <Modal show={true} onHide={props.hideForm}>
      <Modal.Header>
        <Modal.Title className="px-3">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="employee-form" noValidate validated={validated} onSubmit={handleSubmit} onReset={props.hideForm}>
          <Form.Label>Personal info</Form.Label>

          <Floating className="mb-2">
            <Form.Control id="first-name" type="text" placeholder="" required
                          value={firstName} onChange={handleFirstName}/>
            <Form.Label htmlFor="first-name">First name</Form.Label>
          </Floating>

          <Floating className="mb-2">
            <Form.Control id="middle-name" type="text" placeholder=""
                          value={middleName} onChange={handleMiddleName}/>
            <Form.Label htmlFor="middle-name">Middle name</Form.Label>
          </Floating>

          <Floating className="mb-2">
            <Form.Control id="second-name" type="text" placeholder="" required
                          value={secondName} onChange={handleSecondName}/>
            <Form.Label htmlFor="second-name">Second name</Form.Label>
          </Floating>

          <Floating className="mb-2">
            <Form.Control id="birthday" type="date" placeholder="" required
                          value={birthday} onChange={handleBirthday}/>
            <Form.Label htmlFor="birthday">Birthday</Form.Label>
          </Floating>

          <Container fluid>
            <Row className="mt-3">
              <Col xs={3}>
                <Form.Label>Gender</Form.Label>
              </Col>
              <Col xs={9}>
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

            <Form.Check className="mt-1">
              <Form.Check.Input id="driving-license" type="checkbox"
                                checked={hasDrivingLicense} onChange={handleDrivingLicense}/>
              <Form.Check.Label htmlFor="driving-license">Driving license</Form.Check.Label>
            </Form.Check>
          </Container>

          <Form.Label className="mt-4">Employment</Form.Label>

          <Floating className="mb-2">
            <PositionsSelector value={position} validated={validated}
                               onChange={setPosition}/>
          </Floating>

          <Floating className="mb-2">
            <Form.Control id="employment-date" type="date" placeholder="" required
                          value={employmentDate} onChange={handleEmploymentDateChange}/>
            <Form.Label htmlFor="employment-date">Employment date</Form.Label>
          </Floating>

          <Floating className="mb-2">
            <Form.Control id="firing-date" type="date" placeholder="" min={employmentDate}
                          value={firingDate} onChange={handleFiringDateChange}/>
            <Form.Label htmlFor="firing-date">Firing date</Form.Label>
          </Floating>

          <ColleaguesSelector value={colleagues} options={props.others} validated={validated}
                              onChange={setColleagues}/>

          <TagsList value={tags} onChange={setTags}/>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {props.onDelete && props.employee
          ? <Button form="employee-form" variant="danger" type="reset"
                    onClick={handleDelete}>Delete</Button>
          : null}

        <div className="flex-grow-1"/>
        <Button form="employee-form" variant="secondary" type="reset">Close</Button>
        <Button form="employee-form" variant="success" type="submit">Save changes</Button>
      </Modal.Footer>
    </Modal>
  )
}
