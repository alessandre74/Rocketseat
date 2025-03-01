import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'

import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { format, parseISO } from 'date-fns'

import api from '../../services/api'
import OrderStatus from '../../components/OrderStatus'
import Container from '../../components/Container'

import {
  ProfileHeader,
  ProfileAvatar,
  ProfileGroup,
  ProfileMessage,
  ProfileName,
  Deliverie,
  Title,
  Options,
  OptionItem,
  OptionText,
  CardList,
  Card,
  CardHeader,
  CardTitle,
  CardStatus,
  CardInfo,
  CardData,
  CardLabel,
  CardText,
  CardButton,
  CardEmpty,
  CardTextEmpty,
  Loading,
} from './styles'

export default function Deliveries() {
  const route = useRoute()
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const [profile] = useState(route.params.data)
  const [deliveries, setDeliveries] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [path, setPath] = useState('pending')
  const [pending, setPending] = useState(true)
  const [delivered, setDelivered] = useState(false)

  function navigationToSignIn() {
    navigation.navigate('SignIn')
  }

  function navigationToDetail(id) {
    const data = deliveries.find((item) => item.id === id)
    navigation.navigate('Detail', data)
  }

  async function loadPage(
    pageNumber = page,
    shouldRefresh = false,
    apiPath = path
  ) {
    if (total && pageNumber > total) return

    setLoading(true)

    const response = await api.get(
      `/deliveryman/${profile.id}/${apiPath}?page=${pageNumber}`
    )

    const totalItens = response.headers['x-total-count']

    const data = response.data.map((order) => ({
      ...order,
      id: String(order.id),
      start_date: order.start_date
        ? format(parseISO(order.start_date), 'dd/MM/yyyy')
        : '__/__/____',
      end_date: order.end_date
        ? format(parseISO(order.end_date), 'dd/MM/yyyy')
        : '__/__/____',
      createdAt: format(parseISO(order.createdAt), 'dd/MM/yyyy'),
    }))

    setTotal(Math.ceil(totalItens / 4))
    setDeliveries(shouldRefresh ? data : [...deliveries, ...data])
    setPage(pageNumber + 1)
    setLoading(false)

    if (apiPath === 'pending') {
      setPending(true)
      setDelivered(false)
      setPath(apiPath)
    } else {
      setPending(false)
      setDelivered(true)
      setPath(apiPath)
    }
  }

  async function refreshList() {
    setRefreshing(true)
    await loadPage(1, true)
    setRefreshing(false)
  }

  function handleStatus(itemStatus) {
    switch (itemStatus) {
      case 'Pendente':
        return 0
      case 'Retirada':
        return 1
      case 'Entregue':
        return 2
      default:
        return 0
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadPage(1, true, path)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused])

  return (
    <Container background>
      <ProfileHeader>
        <ProfileAvatar source={{ uri: profile.avatar.url }} />
        <ProfileGroup>
          <ProfileMessage>Bem Vindo de Volta</ProfileMessage>
          <ProfileName>{profile.name}</ProfileName>
        </ProfileGroup>
        <TouchableOpacity onPress={navigationToSignIn}>
          <Icon name="exit-to-app" size={25} color="#E74040" />
        </TouchableOpacity>
      </ProfileHeader>

      <Deliverie>
        <Title>Entregas</Title>
        <Options>
          <TouchableOpacity onPress={() => loadPage(1, true, 'pending')}>
            <OptionItem select={pending}>
              <OptionText select={pending}>Pendentes</OptionText>
            </OptionItem>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => loadPage(1, true, 'delivered')}>
            <OptionItem select={delivered}>
              <OptionText select={delivered}>Entregues</OptionText>
            </OptionItem>
          </TouchableOpacity>
        </Options>
      </Deliverie>

      <CardList
        data={deliveries}
        keExtractor={(item) => item.id}
        onEndReached={() => loadPage()} // quando usuario chega no final da lista
        onEndReachedThreshold={0.2} // quando estiver em 10% do final da lista carrega mais
        onRefresh={refreshList}
        refreshing={refreshing}
        LisFooterComponent={loading && <Loading />}
        renderItem={({ item }) => (
          <Card>
            <CardHeader>
              <Icon name="local-shipping" size={25} color="#7d40e7" />
              <CardTitle>{`Encomenda ${item.id.padStart(4, '0')}`}</CardTitle>
            </CardHeader>

            <CardStatus>
              <OrderStatus position={handleStatus(item.status)} />
            </CardStatus>

            <CardInfo>
              <CardData>
                <CardLabel>Data</CardLabel>
                <CardText>{item.createdAt}</CardText>
              </CardData>
              <CardData>
                <CardLabel>Cidade</CardLabel>
                <CardText>{item.recipient.city}</CardText>
              </CardData>
              <TouchableOpacity onPress={() => navigationToDetail(item.id)}>
                <CardButton>Ver detalhes</CardButton>
              </TouchableOpacity>
            </CardInfo>
          </Card>
        )}
        ListEmptyComponent={() => (
          <CardEmpty>
            <CardTextEmpty>
              {`Não há encomendas ${
                path === 'pending' ? 'pendentes!' : 'entregues!'
              }`}
            </CardTextEmpty>
          </CardEmpty>
        )}
      />
    </Container>
  )
}
