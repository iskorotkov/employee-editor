import React, { ChangeEvent } from 'react'
import { Floating } from './Floating'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Tag } from '../data/employee'

const supportedTypes = ['text', 'number', 'tel', 'email', 'color', 'datetime-local', 'time', 'date', 'week', 'month']

export function TagInput (props: {
  idPrefix: string
  value: Tag
  onChange: (tag: Tag) => void
  onRemove: (tag: Tag) => void
}) {
  const handleNameChange = (e: ChangeEvent) => {
    props.onChange({
      id: props.value.id,
      name: (e.target as HTMLInputElement).value,
      type: props.value.type,
      value: props.value.value
    })
  }

  const handleTypeChange = (e: ChangeEvent) => {
    props.onChange({
      id: props.value.id,
      name: props.value.name,
      type: (e.target as HTMLInputElement).value,
      value: props.value.value
    })
  }

  const handleValueChange = (e: ChangeEvent) => {
    props.onChange({
      id: props.value.id,
      name: props.value.name,
      type: props.value.type,
      value: (e.target as HTMLInputElement).value
    })
  }

  const handleRemoveClick = () => {
    if (props.value) {
      props.onRemove(props.value)
    }
  }

  return (
    <Card>
      <Card.Header>
        <Card.Subtitle className="d-inline">Tag: {props.value.name}</Card.Subtitle>
        <Button variant="close" className="float-end" onClick={handleRemoveClick}/>
      </Card.Header>
      <Card.Body>
        <Floating className="mb-2">
          <Form.Control id={props.idPrefix + '-tag-name'} type="text" placeholder="" value={props.value.name} required
                        onChange={handleNameChange}/>
          <Form.Label htmlFor={props.idPrefix + '-tag-name'}>Name</Form.Label>
        </Floating>

        <Floating className="mb-2">
          <Form.Control id={props.idPrefix + '-tag-type'} as="select" value={props.value.type} required
                        onChange={handleTypeChange}>
            {supportedTypes.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </Form.Control>
          <Form.Label htmlFor={props.idPrefix + '-tag-type'}>Type</Form.Label>
        </Floating>

        <Floating>
          <Form.Control id={props.idPrefix + '-tag-value'} type={props.value.type} placeholder="" required
                        value={props.value.value} onChange={handleValueChange}/>
          <Form.Label htmlFor={props.idPrefix + '-tag-value'}>Value</Form.Label>
        </Floating>
      </Card.Body>
    </Card>
  )
}
