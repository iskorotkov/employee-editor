export const invalidStyle = (provided: any) => {
  return {
    ...provided,
    border: '1px solid #dc3545 !important',
    borderRadius: '5px'
  }
}

export const validStyle = (provided: any) => {
  return {
    ...provided,
    border: '1px solid #198754 !important',
    borderRadius: '4px'
  }
}

export const mustNotBeEmpty = (validated: boolean, provided: any, state: any) => {
  return !validated
    ? provided
    : state.hasValue ? validStyle(provided) : invalidStyle(provided)
}
