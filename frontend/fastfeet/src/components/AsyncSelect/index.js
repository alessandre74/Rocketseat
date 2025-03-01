import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select/async'
import { useField } from '@unform/core'

import api from '~/services/api'

const AsyncSelect = ({ name, path, ...rest }) => {
  const [elements, setElements] = useState([])
  const selectRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      getValue(ref) {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return []
          }
          return ref.select.state.value.map(option => option.value)
        }
        if (!ref.select.state.value) {
          return ''
        }
        return ref.select.state.value.value
      },
      clearValue(ref) {
        ref.select.state.value = ''
      },
    })
  }, [fieldName, registerField, rest.isMulti])

  useEffect(() => {
    async function loadElements() {
      const response = await api.get(path)

      const data = response.data.map(e => ({
        value: e.id,
        label: e.name,
      }))

      setElements(data)
    }

    loadElements()
  }, [path])

  const datafilter = inputValue => {
    return elements.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    )
  }

  const loadOptions = (inputValue, callback) => {
    callback(datafilter(inputValue))
  }

  return (
    <>
      {error && <strong style={{ color: '#7d40e7' }}>{error}</strong>}
      <Select
        cacheOptions
        defaultValue={defaultValue}
        loadOptions={loadOptions}
        noOptionsMessage={() => 'busca não encontrada'}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />
    </>
  )
}
export default AsyncSelect

AsyncSelect.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
}
