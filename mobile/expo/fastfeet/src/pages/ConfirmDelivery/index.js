import React, { useState, useEffect, useRef } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity, Alert } from 'react-native'

import api from '../../services/api'
import Screen from '../../components/Screen'
import SubmitButton from '../../components/Button'

import {
  Container,
  Card,
  CardIcon,
  CardCamera,
  CardRadius,
  CardImage,
  CardText,
} from './styles'

export default function ConfirmDelivery() {
  const camRef = useRef(null)
  const route = useRoute()
  const navigation = useNavigation()
  const [deliveries] = useState(route.params)
  const [hasPermission, setHaspermisson] = useState(null)
  const [capturedPhoto, setCapturedPhoto] = useState(null)
  const [open, setOpen] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { status } = await CardCamera.requestPermissionsAsync()
      setHaspermisson(status === 'granted')
    })()
  }, [])

  if (hasPermission == null) {
    return (
      <Card>
        <CardText>Error!</CardText>
      </Card>
    )
  }

  if (hasPermission === false) {
    return (
      <Card>
        <CardText>Acesso negado!</CardText>
      </Card>
    )
  }

  async function takePicture() {
    if (camRef) {
      const options = { quality: 0.3, base64: true }
      const data = await camRef.current.takePictureAsync(options)
      setCapturedPhoto(data.uri)
      setOpen(false)
    }
  }

  async function handleSubmit() {
    if (open) {
      Alert.alert('Atenção', 'Obrigatório ter uma imagem para envio!')
      return
    }
    setLoading(true)
    try {
      const formFile = new FormData()
      formFile.append('file', {
        uri: capturedPhoto,
        type: 'image/jpeg',
        name: `${Date.now()}_${deliveries.orderId}_${
          deliveries.deliverymanId
        }.jpg`,
      })

      const response = await api.post('files', formFile)
      const signature_id = response.data.id
      await api.put(`/orderend/${deliveries.orderId}`, {
        signature_id,
      })
      setLoading(false)
      navigation.navigate('Deliverie')
    } catch (err) {
      setLoading(false)
      setOpen(true)
      Alert.alert('Atenção', 'Erro ao enviar!')
    }
  }

  return (
    <Screen>
      <Container>
        {open ? (
          <Card>
            <CardCamera type={CardCamera.Constants.Type.back} ref={camRef}>
              <CardIcon>
                <CardRadius>
                  <TouchableOpacity onPress={takePicture}>
                    <Icon name="photo-camera" size={40} color="#fff" />
                  </TouchableOpacity>
                </CardRadius>
              </CardIcon>
            </CardCamera>
          </Card>
        ) : (
          <Card>
            <CardImage source={{ uri: capturedPhoto }} />
          </Card>
        )}

        <SubmitButton loading={loading} onPress={handleSubmit} color="#7D40E7">
          Enviar
        </SubmitButton>
      </Container>
    </Screen>
  )
}
