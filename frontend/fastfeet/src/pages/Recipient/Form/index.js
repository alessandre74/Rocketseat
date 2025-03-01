import React, { useRef, useState, useEffect } from 'react'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Form } from '@unform/web'

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md'

import msg from '~/utils/message'
import mask from '~/utils/mask'
import clearCharacters from '~/utils/clearCharacters'
import api from '~/services/api'
import history from '~/services/history'

import Input from '~/components/Input'
import {
  Container,
  ErrForm,
  Fields,
  FieldName,
  FieldStreet,
  FieldNumber,
  FieldComplement,
  FieldCity,
  FieldState,
  FieldZipCode,
  FieldCPF,
} from './styles'

export default function FormOrder({ match }) {
  const [errForm, setErrForm] = useState(false)
  const [zipCode, setZipCode] = useState('')
  const [newCPF, setNewCPF] = useState('')
  const [oledCPF, setOldCPF] = useState('')
  const { id } = match.params
  const formRef = useRef(null)

  async function addForm(data) {
    try {
      await api.post('/recipients', data)
      setZipCode('')
      setNewCPF('')
      msg.box('Cadastro realizado com sucesso!', 'success')
    } catch (err) {
      msg.box('Não foi possível realizar o cadastro!', 'error')
    }
  }

  async function editForm(data) {
    try {
      await api.put(`/recipients/${id}`, data)
      msg.box('Edição realizada com sucesso!', 'success')
      history.push('/recipient')
    } catch (error) {
      msg.box('Não foi possível realizar a edição!', 'error')
    }
  }

  async function handleSubmit(data, { reset }) {
    try {
      const zip_code = clearCharacters.zipCode(data.zip_code)
      const cpf = clearCharacters.cpf(data.cpf)

      const schema = Yup.object().shape({
        name: Yup.string().required('*'),
        street: Yup.string().required('*'),
        number: Yup.string().required('*'),
        complement: Yup.string().required('*'),
        city: Yup.string().required('*'),
        state: Yup.string().required('*'),
        zip_code: Yup.string().required('*'),
        cpf: Yup.string().required('*'),
      })
      await schema.validate(data, {
        abortEarly: false,
      })

      reset()
      setErrForm(false)
      formRef.current.setErrors({})

      if (!id) addForm({ ...data, zip_code, cpf })

      if (id) editForm({ ...data, zip_code, cpf })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {}

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message
        })
        setErrForm(true)
        formRef.current.setErrors(errorMessages)
      }
    }
  }

  async function handleOnBlur() {
    if (!formRef.current.getFieldValue('cpf') || oledCPF === newCPF) return

    const response = await api.get(
      `/recipientsfindcpf/${clearCharacters.cpf(newCPF)}`
    )

    const { data } = response

    if (data) {
      formRef.current.clearField('cpf')
      formRef.current.getFieldRef('cpf').focus()
      msg.box('CPF já está cadastrado!', 'warning')
    }
  }

  useEffect(() => {
    if (!id) return

    async function loadFields() {
      const response = await api.get(`/recipients/${id}`)

      const { data } = response

      formRef.current.setData({
        ...data,
        zip_code: mask.zipCode(data.zip_code),
        cpf: mask.cpf(data.cpf),
      })

      setZipCode(mask.zipCode(data.zip_code))
      setNewCPF(mask.cpf(data.cpf))
      setOldCPF(mask.cpf(data.cpf))
    }
    loadFields()
  }, [id])

  return (
    <Container>
      <header>
        <h1>{!id ? 'Cadastro de ' : 'Edição de '} entregadores</h1>
        <section>
          <Link to="/recipient">
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
        {errForm && <ErrForm>Todos os campos são obrigatórios!</ErrForm>}
        <Fields>
          <FieldName>
            <strong>Nome</strong>
            <Input name="name" type="text" maxLength="90" />
          </FieldName>

          <FieldCPF>
            <strong>CPF</strong>
            <Input
              name="cpf"
              type="text"
              maxLength="14"
              value={mask.cpf(newCPF)}
              onBlur={handleOnBlur}
              onChange={e => setNewCPF(e.target.value)}
            />
          </FieldCPF>
        </Fields>

        <Fields>
          <FieldStreet>
            <strong>Rua</strong>
            <Input name="street" type="text" maxLength="80" />
          </FieldStreet>

          <FieldNumber>
            <strong>Número</strong>
            <Input name="number" type="text" maxLength="4" />
          </FieldNumber>

          <FieldComplement>
            <strong>Complemento</strong>
            <Input name="complement" type="text" maxLength="100" />
          </FieldComplement>
        </Fields>

        <Fields>
          <FieldCity>
            <strong>Cidade</strong>
            <Input name="city" type="text" maxLength="40" />
          </FieldCity>

          <FieldState>
            <strong>Estado</strong>
            <Input name="state" type="text" maxLength="40" />
          </FieldState>

          <FieldZipCode>
            <strong>CEP</strong>
            <Input
              name="zip_code"
              type="text"
              maxLength="9"
              value={zipCode && mask.zipCode(zipCode)}
              onChange={e => setZipCode(e.target.value)}
            />
          </FieldZipCode>
        </Fields>
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
