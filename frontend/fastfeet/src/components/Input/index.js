import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useField } from '@unform/core'

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null)
  const { fieldName, registerField, defaultValue, error } = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  return (
    <>
      {error && <strong style={{ color: '#7d40e7' }}>{error}</strong>}
      <input ref={inputRef} defaultValue={defaultValue} {...rest} />
    </>
  )
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
}
