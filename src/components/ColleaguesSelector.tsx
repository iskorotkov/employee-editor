import Select, { OptionsType } from 'react-select'
import React from 'react'
import { Employee } from '../data/employee'
import { validStyle } from '../styles/validation'
import { toFullName } from '../formatting/toFullName'

export const ColleaguesSelector = (props: {
  value: number[] | undefined
  options: Employee[]
  validated: boolean
  onChange: (selected: number[]) => void
}) => {

  const selected = props.value?.map(id => {
    const employee = props.options.find(e => e.id === id)
    return {
      value: id,
      label: employee ? toFullName(employee) : `ID:${id}`
    }
  })

  const options = props.options.map(e => ({
    value: e.id,
    label: toFullName(e)
  }))

  const handleChange = (e: OptionsType<{ value: number }>) => props.onChange(e.map(e => e.value))

  const customStyles = (provided: any) => props.validated ? validStyle(provided) : provided

  return <Select isMulti value={selected} placeholder="Colleagues" options={options}
                 styles={{ container: customStyles }}
                 onChange={e => handleChange(e)}/>
}
