import { OptionsType } from 'react-select'
import AsyncCreatableSelect from 'react-select/async-creatable'
import React from 'react'

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

const invalidStyle = (provided: any) => {
  return {
    ...provided,
    border: '1px solid #dc3545 !important',
    borderRadius: '5px'
  }
}

const validStyle = (provided: any) => {
  return {
    ...provided,
    border: '1px solid #198754 !important',
    borderRadius: '4px'
  }
}

const customStyle = (provided: any, state: any) => {
  return state.hasValue ? validStyle(provided) : invalidStyle(provided)
}

export const PositionsSelector = (props: {
  onChange: (value: string) => void
}) => {
  const handleChange = (e: { value: string } | OptionsType<{ value: string }> | null) => {
    if (e && 'value' in e) {
      props.onChange(e.value)
    }
  }

  return <AsyncCreatableSelect cacheOptions loadOptions={loadOptions} styles={{ container: customStyle }}
                               onChange={handleChange}/>
}
