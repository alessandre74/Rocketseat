import React, { useState, useEffect } from 'react'
import { format, parseISO } from 'date-fns'

import { useRoute } from '@react-navigation/native'

import api from '../../services/api'

import Screen from '../../components/Screen'

import {
  Container,
  Card,
  CardList,
  CardTitle,
  CardProblem,
  CardText,
  CardData,
} from './styles'

export default function ProblemView() {
  const route = useRoute()
  const { id } = route.params
  const [problems, setProblems] = useState([])

  async function loadProblem() {
    const response = await api.get(`/delivery/${id}/problems`)

    const data = response.data.map((problem) => ({
      ...problem,
      id: String(problem.id),
      createdAt: format(parseISO(problem.createdAt), 'dd/MM/yyyy'),
    }))
    setProblems(data)
  }

  useEffect(() => {
    loadProblem()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Screen>
      <Container>
        <CardTitle>Encomenda {id} </CardTitle>
        <CardList
          data={problems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card>
              <CardProblem>
                <CardText>{item.description}</CardText>
                <CardData>{item.createdAt}</CardData>
              </CardProblem>
            </Card>
          )}
          ListEmptyComponent={() => (
            <Card>
              <CardProblem>
                <CardText>Não há dados para essa encomenda!</CardText>
              </CardProblem>
            </Card>
          )}
        />
      </Container>
    </Screen>
  )
}
