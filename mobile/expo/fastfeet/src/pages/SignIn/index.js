import React, { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { useNavigation } from '@react-navigation/native'
import { Image, Alert } from 'react-native'

import logo from '../../assets/logo.png'
import api from '../../services/api'
import storage from '../../utils/storage'
import { Container, Form, FormInput, SubmitButton } from './styles'

export default function SignIn() {
  const [id, setId] = useState()
  const [loading, setLoading] = useState()
  const navigation = useNavigation()

  async function handleSubmit() {
    try {
      if (!id) {
        Alert.alert('Atenção', 'Informe seu ID de cadastro')
        return
      }

      setLoading(true)

      const response = await api.get(`/deliveryman/${id}`)

      if (!response.data) {
        setId('')
        setLoading(false)
        Alert.alert('Atenção', 'Usuário não encontrado!')
        return
      }

      const data = {
        ...response.data,
        createdAt: format(parseISO(response.data.createdAt), 'dd/MM/yyyy'),
      }

      storage.save('profile', { data })

      setId('')
      setLoading(false)

      navigation.navigate('Dashboard', {
        screen: 'Deliveries',
        params: {
          screen: 'Deliverie',
          params: { data },
        },
      })
    } catch (error) {
      Alert.alert('Atenção', 'Erro ao logar')
    }
  }

  return (
    <Container barStyle>
      <Image source={logo} />

      <Form>
        <FormInput
          keyboardType="numeric"
          autoCorrect={false}
          placeholder="Informe seu ID de cadastro"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          maxLength={9}
          autoFocus
          value={id}
          textAlign="center"
          onChangeText={setId}
        />

        <SubmitButton loading={loading} onPress={handleSubmit} color="#82BF18">
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  )
}
