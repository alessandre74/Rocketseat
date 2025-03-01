import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Alert } from 'react-native'

import api from '../../services/api'
import Screen from '../../components/Screen'
import SubmitButton from '../../components/Button'

import { Container, Card, CardProblem, CardInput } from './styles'

export default function ProblemReport() {
  const route = useRoute()
  const { id } = route.params
  const navigation = useNavigation()
  const [problem, setProblem] = useState()
  const [loading, setLoading] = useState()

  async function handleSubmit() {
    if (!problem) {
      Alert.alert('Atenção', 'Preechimento obrigatório!')
      return
    }

    try {
      setLoading(true)

      await api.post(`/delivery/${id}/problems`, {
        description: problem,
      })

      setLoading(false)
      navigation.navigate('Detail')
    } catch (error) {
      Alert.alert('Atenção', 'Erro ao salvar os dados!')
    }
  }

  return (
    <Screen>
      <Container>
        <Card>
          <CardProblem>
            <CardInput
              autoCorrect={false}
              onSubmitEditing={handleSubmit}
              multiline
              placeholder="Inclua aqui o problema que ocorreu na entrega"
              placeholderTextColor="#999999"
              returnKeyType="send"
              value={problem}
              maxLength={35}
              onChangeText={setProblem}
              autoFocus
            />
          </CardProblem>
        </Card>

        <SubmitButton loading={loading} onPress={handleSubmit} color="#7D40E7">
          Enviar
        </SubmitButton>
      </Container>
    </Screen>
  )
}
