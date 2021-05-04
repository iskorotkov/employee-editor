import React, { ChangeEvent, useState } from 'react'
import { Floating } from './Floating'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Tag } from '../data/employee'

const supportedTypes = ['text', 'number', 'tel', 'email', 'color', 'datetime-local', 'time', 'date', 'week', 'month']

export function TagInput (props: {
  idPrefix: string
  value: Tag | undefined
  onChange: (tag: Tag) => void
  onRemove: (tag: Tag) => void
}) {
  const [name, setName] = useState(props.value?.name)
  const [type, setType] = useState(props.value?.type ?? supportedTypes[0])
  const [value, setValue] = useState(props.value?.value)

  const handleChange = (e: ChangeEvent, f: (value: string) => void) => {
    f((e.target as HTMLInputElement).value)
    props.onChange({
      id: props.value?.id ?? 0,
      name: name ?? '',
      type: type,
      value: value ?? ''
    })
  }

  const handleNameChange = (e: ChangeEvent) => handleChange(e, setName)
  const handleTypeChange = (e: ChangeEvent) => handleChange(e, setType)
  const handleValueChange = (e: ChangeEvent) => handleChange(e, setValue)

  const handleRemoveClick = () => {
    if (props.value) {
      props.onRemove(props.value)
    }
  }

  return <Card>
    <Card.Body>
      <Row>
        <Col sm={5}>
          <Floating className="mb-2">
            <Form.Control id={props.idPrefix + '-tag-name'} type="text" placeholder="" value={name} required
                          onChange={handleNameChange}/>
            <Form.Label htmlFor={props.idPrefix + '-tag-name'}>Name</Form.Label>
          </Floating>
        </Col>

        <Col sm={5}>
          <Floating className="mb-2">
            <Form.Control id={props.idPrefix + '-tag-type'} as="select" value={type} required
                          onChange={handleTypeChange}>
              {supportedTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </Form.Control>
            <Form.Label htmlFor={props.idPrefix + '-tag-type'}>Type</Form.Label>
          </Floating>
        </Col>

        <Col sm={2}>
          <Button variant="close" className="float-end" onClick={handleRemoveClick}/>
        </Col>
      </Row>

      <Row>
        <Col sm={10}>
          <Floating>
            <Form.Control id={props.idPrefix + '-tag-value'} type={type} placeholder="" value={value} required
                          onChange={handleValueChange}/>
            <Form.Label htmlFor={props.idPrefix + '-tag-value'}>Value</Form.Label>
          </Floating>
        </Col>
      </Row>
    </Card.Body>
  </Card>
}
