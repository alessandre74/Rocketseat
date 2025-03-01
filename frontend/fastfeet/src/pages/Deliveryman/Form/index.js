import React, { useRef, useState, useEffect } from 'react'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Form } from '@unform/web'

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md'

import msg from '~/utils/message'
import api from '~/services/api'
import history from '~/services/history'

import Input from '~/components/Input'
import Avatar from './Avatar'
import { Container, FormInput } from './styles'

export default function FormOrder({ match }) {
  const [preview, setPreview] = useState(false)
  const [avatarData, setAvatarData] = useState({})

  const { id } = match.params
  const formRef = useRef(null)

  async function addForm(data) {
    try {
      await api.post('/deliveryman', data)

      setPreview(true)
      formRef.current.clearField('name')
      formRef.current.clearField('email')
      setPreview(false)

      msg.box('Cadastro realizado com sucesso!', 'success')
    } catch (err) {
      msg.box('Não foi possível realizar o cadastro!', 'error')
    }
  }

  async function editForm(data) {
    try {
      await api.put(`/deliveryman/${id}`, data)

      msg.box('Edição realizada com sucesso!', 'success')

      history.push('/deliveryman')
    } catch (error) {
      msg.box('Não foi possível realizar a edição!', 'error')
    }
  }

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        avatar_id: Yup.number().required('Preenchimento obrigatório!'),
        name: Yup.string().required('Preenchimento obrigatório!'),
        email: Yup.string()
          .email('formato do email inválido!')
          .required('Preenchimento obrigatório!'),
      })

      await schema.validate(data, {
        abortEarly: false,
      })
      formRef.current.setErrors({})

      if (!id) addForm(data)
      if (id) editForm(data)
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {}

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message
        })

        formRef.current.setErrors(errorMessages)
      }
    }
  }

  useEffect(() => {
    if (!id) return

    async function loadFields() {
      const response = await api.get(`/deliveryman/${id}`)

      const { name, email, avatar_id, avatar } = response.data

      setAvatarData({ id: avatar_id, url: avatar.url })
      formRef.current.setData({ name, email })
    }
    loadFields()
  }, [id])

  return (
    <Container>
      <header>
        <h1>{!id ? 'Cadastro de ' : 'Edição de '} entregadores</h1>
        <section>
          <Link to="/deliveryman">
            <MdKeyboardArrowLeft size={25} color="#fff" />
            VOLTAR
          </Link>
          <button type="submit" form="form-order">
            <MdCheck size={25} color="#fff" />
            SALVAR
          </button>
        </section>
      </header>
      <Form id="form-order" ref={formRef} onSubmit={handleSubmit}>
        <Avatar name="avatar_id" avatarData={avatarData} resetImage={preview} />
        <FormInput>
          <strong>Nome</strong>
          <Input name="name" type="text" placeholder="Nome do entregador" />
        </FormInput>
        <FormInput>
          <strong>Email</strong>
          <Input name="email" type="text" placeholder="email do entregador" />
        </FormInput>
      </Form>
    </Container>
  )
}
FormOrder.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
}
