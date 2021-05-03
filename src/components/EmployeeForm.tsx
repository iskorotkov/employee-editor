import Form from 'react-bootstrap/Form'
import React from 'react'
import { Employee, Position } from '../data/employee'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const FloatingInput = (props: {
  id: string
  type: string
  label: string
  placeholder: string
  defaultValue?: string | string[] | number
}) => {
  return (
    <div className="form-floating mb-2">
      <Form.Control value={props.defaultValue} id={props.id} type={props.type} placeholder={props.placeholder}/>
      <Form.Label htmlFor={props.id}>{props.label}</Form.Label>
    </div>
  )
}

export function EmployeeForm (props: {
  positions: Position[]
  colleagues: Employee[]
  show: boolean
  onHide: () => void
  employee?: Employee
}) {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header>
        <Modal.Title className='px-3'>Add new employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Personal info</Form.Label>
          <FloatingInput id="first-name" type="text" label="First name" placeholder="Ivan"/>
          <FloatingInput id="middle-name" type="text" label="Middle name" placeholder="Ivanovich"/>
          <FloatingInput id="second-name" type="text" label="Second name" placeholder="Ivanov"/>
          <FloatingInput id="birthday" type="date" label="Birthday" placeholder={new Date().toDateString()}/>

          <Container fluid>
            <Row className="mt-3">
              <Col sm={2}>
                <Form.Label>Gender</Form.Label>
              </Col>
              <Col sm={10}>
                <Form.Check inline>
                  <Form.Check.Input id="gender-male" type="radio" name="gender" defaultChecked/>
                  <Form.Check.Label htmlFor="gender-male">male</Form.Check.Label>
                </Form.Check>

                <Form.Check inline>
                  <Form.Check.Input id="gender-female" type="radio" name="gender"/>
                  <Form.Check.Label htmlFor="gender-female">female</Form.Check.Label>
                </Form.Check>
              </Col>
            </Row>

            <Form.Check>
              <Form.Check.Input id="driving-license" type="checkbox"/>
              <Form.Check.Label htmlFor="driving-license">Driving license</Form.Check.Label>
            </Form.Check>
          </Container>

          <Form.Label className="mt-3">Employment</Form.Label>
          <FloatingInput id="position" type="text" label="Position" placeholder="Developer"/>
          <FloatingInput id="employment-date" type="date" label="Employment date" placeholder={new Date().toDateString()}/>
          <FloatingInput id="firing-date" type="date" label="Firing date" placeholder={new Date().toDateString()}/>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" type="cancel" onClick={props.onHide}>Close</Button>
        <Button variant="primary" type="submit" onClick={props.onHide}>Save changes</Button>
      </Modal.Footer>
    </Modal>
  )
}
