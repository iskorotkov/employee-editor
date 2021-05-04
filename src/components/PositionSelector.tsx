import { OptionsType } from 'react-select'
import AsyncCreatableSelect from 'react-select/async-creatable'
import React from 'react'
import { mustNotBeEmpty } from '../styles/validation'

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

export const PositionsSelector = (props: {
  value: string | undefined
  validated: boolean
  onChange: (value: string) => void
}) => {
  const handleChange = (e: { value: string } | OptionsType<{ value: string }> | null) => {
    if (e && 'value' in e) {
      props.onChange(e.value)
    }
  }

  const customStyle = (provided: any, state: any) => mustNotBeEmpty(props.validated, provided, state)

  const value = props.value
    ? { value: props.value, label: props.value }
    : undefined

  return <AsyncCreatableSelect cacheOptions styles={{ container: customStyle }} value={value}
                               placeholder="Position"
                               loadOptions={loadOptions} onChange={handleChange}/>
}
