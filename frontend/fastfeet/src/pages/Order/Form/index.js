import React, { useRef, useState, useEffect } from 'react'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Form } from '@unform/web'

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md'

import api from '~/services/api'
import history from '~/services/history'

import Input from '~/components/Input'
import Select from '~/components/AsyncSelect'
import msg from '~/utils/message'

import {
  Container,
  Title,
  Button,
  FormData,
  FormSelect,
  FormInput,
} from './styles'

export default function FormOrder({ match }) {
  const [recipients, setRecipients] = useState([])
  const [deliveries, setDeliveries] = useState([])

  const { id } = match.params
  const formRef = useRef(null)

  async function addForm(data) {
    try {
      await api.post('/orders', data)

      msg.box('Cadastro realizado com sucesso!', 'success')
    } catch (error) {
      msg.box('Não foi possível realizar o cadastro!', 'error')
    }
  }

  async function editForm(data) {
    try {
      await api.put(`/orders/${id}`, data)

      msg.box('Edição realizada com sucesso!', 'success')

      history.push('/order')
    } catch (error) {
      msg.box('Não foi possível realizar a edição!', 'error')
    }
  }

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        recipient_id: Yup.string().required('Preenchimento obrigatório!'),
        deliveryman_id: Yup.string().required('Preenchimento obrigatório!'),
        product: Yup.string().required('Preenchimento obrigatório!'),
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      reset()
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
    async function loadAll() {
      const [recipient, deliverie] = await Promise.all([
        api.get('/recipients'),
        await api.get('/deliveryman'),
      ])

      const dataRecipient = recipient.data.map(item => {
        return {
          label: item.name,
          value: item.id,
        }
      })

      const dataDeliveries = deliverie.data.map(item => {
        return {
          label: item.name,
          value: item.id,
        }
      })
      setRecipients(dataRecipient)
      setDeliveries(dataDeliveries)
    }
    loadAll()
  }, [])

  useEffect(() => {
    if (!id) return
    async function loadFields() {
      const response = await api.get(`/orders/${id}`)

      const { product, recipient, deliveryman } = response.data

      formRef.current.setFieldValue('recipient_id', {
        label: recipient.name,
        value: recipient.id,
      })
      formRef.current.setFieldValue('deliveryman_id', {
        label: deliveryman.name,
        value: deliveryman.id,
      })

      formRef.current.setData({
        product,
      })
    }
    loadFields()
  }, [id])

  return (
    <Container>
      <Title>
        <h1>{!id ? 'Cadastro de ' : 'Edição de '} encomendas</h1>
        <Button>
          <Link to="/order">
            <MdKeyboardArrowLeft size={25} color="#fff" />
            VOLTAR
          </Link>
          <button type="submit" form="form-order">
            <MdCheck size={25} color="#fff" />
            SALVAR
          </button>
        </Button>
      </Title>
      <Form id="form-order" ref={formRef} onSubmit={handleSubmit}>
        <FormData>
          <FormSelect>
            <div>
              <strong>Destinatário</strong>
              <Select
                className="asyncSelect-css"
                name="recipient_id"
                path="/recipients"
                defaultOptions={recipients}
                options={recipients}
                placeholder="Selecione o destinatário"
              />
            </div>

            <div>
              <strong>Entregador</strong>
              <Select
                className="asyncSelect-css"
                name="deliveryman_id"
                path="/deliveryman"
                defaultOptions={deliveries}
                options={deliveries}
                placeholder="Selecione o entregador"
              />
            </div>
          </FormSelect>

          <FormInput>
            <div>
              <strong>Nome do produto</strong>
              <Input name="product" type="text" placeholder="nome do produto" />
            </div>
          </FormInput>
        </FormData>
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
