import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Alert } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons'
import api from '../../services/api'
import SubmitButton from '../../components/Button'

import Screen from '../../components/Screen'

import {
  Container,
  Card,
  CardTitle,
  Title,
  CardInfo,
  CardLabel,
  CardText,
  CardData,
  CardButton,
  TButton,
  TButtonCenter,
  ButtonText,
} from './styles'

export default function Details() {
  const route = useRoute()
  const navigation = useNavigation()
  const [details] = useState(route.params)
  const [loading, setLoading] = useState(false)

  function navigationToProblemReport() {
    if (details.end_date !== '__/__/____') {
      Alert.alert('Atenção', 'Encomenda entregue!')
      return
    }

    navigation.navigate('ProblemReport', { id: details.id })
  }

  function navigationToProblemView() {
    navigation.navigate('ProblemView', { id: details.id })
  }

  function navigationToConfirmDelivery() {
    if (details.end_date !== '__/__/____') {
      Alert.alert('Atenção', 'Encomenda entregue!')
      return
    }

    navigation.navigate('ConfirmDelivery', {
      orderId: details.id,
      deliverymanId: details.deliveryman_id,
    })
  }

  async function handleSubmit() {
    try {
      setLoading(true)
      await api.put(`/orderstart/${details.id}`, {
        deliveryman_id: details.deliveryman_id,
      })

      setLoading(false)
      navigation.navigate('Deliverie')
    } catch (error) {
      setLoading(false)
      Alert.alert(
        'Atenção',
        'Erro ao retirar encomenda ou atingiu 5 retiradas no dia!'
      )
    }
  }

  return (
    <Screen>
      <Container>
        <Card>
          <CardTitle>
            <Icon name="local-shipping" size={25} color="#7d40e7" />
            <Title>Informações da entrega</Title>
          </CardTitle>

          <CardInfo>
            <CardLabel>DETINATÁRIO</CardLabel>
            <CardText>{route.params.recipient.name}</CardText>
          </CardInfo>
          <CardInfo>
            <CardLabel>ENDEREÇO DE ENTREGA</CardLabel>
            <CardText>
              {details.recipient.street}, {details.recipient.number},{' '}
              {details.recipient.city} - {details.recipient.state} -{' '}
              {details.recipient.zip_code}{' '}
            </CardText>
          </CardInfo>
          <CardInfo>
            <CardLabel>PRODUTO</CardLabel>
            <CardText>{details.product}</CardText>
          </CardInfo>
        </Card>

        <Card>
          <CardTitle>
            <Icon name="event" size={25} color="#7d40e7" />
            <Title>Situação da entrega</Title>
          </CardTitle>

          <CardInfo>
            <CardLabel>STATUS</CardLabel>
            <CardText>{details.status}</CardText>
          </CardInfo>

          <CardData>
            <CardInfo>
              <CardLabel>DATA DE RETIRADA</CardLabel>
              <CardText>{details.start_date}</CardText>
            </CardInfo>
            <CardInfo>
              <CardLabel>DATA DE ENTREGA</CardLabel>
              <CardText>{details.end_date}</CardText>
            </CardInfo>
          </CardData>
        </Card>
        {details.start_date === '__/__/____' ? (
          <SubmitButton
            loading={loading}
            onPress={handleSubmit}
            color="#7D40E7"
          >
            Retirar encomenda
          </SubmitButton>
        ) : (
          <CardButton>
            <TButton onPress={navigationToProblemReport}>
              <Icon name="highlight-off" size={25} color="#E74040" />
              <ButtonText> Informar{'\n'}Problema</ButtonText>
            </TButton>
            <TButtonCenter onPress={navigationToProblemView}>
              <Icon name="info-outline" size={25} color="#E7BA40" />
              <ButtonText> Visualizar{'\n'}Problemas</ButtonText>
            </TButtonCenter>
            <TButton onPress={navigationToConfirmDelivery}>
              <Iconn name="check-circle-outline" size={25} color="#7D40E7" />
              <ButtonText>Confirmar{'\n'} Entrega</ButtonText>
            </TButton>
          </CardButton>
        )}
      </Container>
    </Screen>
  )
}
