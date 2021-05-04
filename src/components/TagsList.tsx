import { Tag } from '../data/employee'
import React, { useState } from 'react'
import { TagInput } from './TagInput'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export function TagsList (props: {
  value: Tag[] | undefined,
  onChange: (tags: Tag[]) => void
}) {
  const [tags, setTags] = useState(props.value ?? [])

  const handleChange = (tag: Tag) => {
    const index = tags.findIndex(t => t.id === tag.id)
    if (index === -1) {
      return
    }

    const copy = [...tags.slice(0, index), tag, ...tags.slice(index + 1)]

    setTags(copy)
    props.onChange(copy)
  }

  const handleRemove = (tag: Tag) => {
    const index = tags.findIndex(t => t.id === tag.id)
    if (index === -1) {
      return
    }

    const copy = [...tags.slice(0, index), ...tags.slice(index + 1)]

    setTags(copy)
    props.onChange(copy)
  }

  const handleAdd = () => {
    const item = {
      id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
      name: '',
      type: 'text',
      value: ''
    }
    const copy = [...tags.slice(), item]

    setTags(copy)
    props.onChange(copy)
  }

  return (
    <>
      <div className="d-flex flex-nowrap flex-row mt-4 align-items-center">
        <Form.Label>Tags</Form.Label>
        <div className="flex-grow-1"/>
        <Button variant="success" onClick={handleAdd}>+</Button>
      </div>

      <Row className="row-cols-1 row-cols-md-2 mt-1 g-3">
        {tags.map(tag =>
          <Col key={tag.id} className="mt-3">
            <TagInput idPrefix={tag.id.toString()} value={tag}
                      onChange={handleChange} onRemove={handleRemove}/>
          </Col>
        )}
      </Row>
    </>
  )
}
