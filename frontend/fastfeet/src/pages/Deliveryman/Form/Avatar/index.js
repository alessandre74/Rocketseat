import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useField } from '@unform/core'

import { MdInsertPhoto } from 'react-icons/md'
import api from '~/services/api'

import { Container, Avatar } from './styles'

export default function AvatarInput({ name, resetImage, avatarData }) {
  const avatarRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  const [file, setFile] = useState(defaultValue && defaultValue.id)
  const [preview, setPreview] = useState(defaultValue && defaultValue.url)

  useEffect(() => {
    if (avatarRef.current) {
      registerField({
        name: fieldName,
        ref: avatarRef.current,
        path: 'dataset.file',
      })
    }
  }, [fieldName, registerField])

  useEffect(() => {
    if (resetImage) {
      setFile(null)
      setPreview(null)
    }

    if (avatarData) {
      setFile(avatarData.id)
      setPreview(avatarData.url)
    }
  }, [avatarData, resetImage])

  async function handleChange(e) {
    const data = new FormData()

    data.append('file', e.target.files[0])

    const response = await api.post('files', data)

    const { id, url } = response.data

    setFile(id)
    setPreview(url)
  }

  return (
    <Container>
      <label htmlFor="avatar">
        {preview ? (
          <img src={preview} alt="" />
        ) : (
          <Avatar>
            <MdInsertPhoto size={50} color="#ddd" />
            <p>Adicionar foto</p>
          </Avatar>
        )}

        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={avatarRef}
        />
      </label>
      {error && <strong style={{ color: '#7d40e7' }}>{error}</strong>}
    </Container>
  )
}

AvatarInput.propTypes = {
  name: PropTypes.string.isRequired,
  resetImage: PropTypes.bool.isRequired,
  avatarData: PropTypes.shape({
    id: PropTypes.number,
    url: PropTypes.string,
  }).isRequired,
}
