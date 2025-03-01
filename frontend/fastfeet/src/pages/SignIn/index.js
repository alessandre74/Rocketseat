import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { Form } from '@unform/web'

import { signInRequest } from '~/store/modules/auth/actions'

import Input from '~/components/Input'
import logo from '~/assets/logo.png'
import { Container, Email, Senha } from './styles'

export default function SignIn() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.auth.loading)
  const formRef = useRef(null)

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('formato do email inválido!')
          .required('Preenchimento obrigatório!'),
        password: Yup.string().required('Preenchimento obrigatório!'),
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      formRef.current.setErrors({})

      dispatch(signInRequest(data.email, data.password))
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
  return (
    <Container>
      <img src={logo} alt="FastFeet" />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Email>
          <span>SEU E-MAIL</span>
          <Input name="email" type="email" placeholder="exemplo@email.com" />
        </Email>

        <Senha>
          <span>SUA SENHA</span>
          <Input name="password" type="password" placeholder="**************" />
        </Senha>

        <button type="submit">
          {loading ? 'Carregando...' : 'Entrar no sistema'}
        </button>
      </Form>
    </Container>
  )
}
