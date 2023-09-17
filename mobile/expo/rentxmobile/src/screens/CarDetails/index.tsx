import React, { useState, useEffect } from 'react'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { StatusBar, LogBox } from 'react-native'
import { useNetInfo } from '@react-native-community/netinfo'

import {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated'

import { useHooks } from '../../Hooks/useHooks'
import { api } from '../../services/api'

import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import { Button } from '../../components/Button'

import { CarDTO } from '../../dtos/CarDTO'
import { Car as ModelCar } from '../../database/model/Car'

import { formatCurrency } from '../../utils/formatted'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'

import * as S from './styles'

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state'])

type Params = {
  car: ModelCar
}

export function CarDetails() {
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO)

  const netInfo = useNetInfo()
  const { route, navigation } = useHooks()
  const { car } = route.params as Params

  const statusBarHeight = getStatusBarHeight()

  const scrollY = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y
  })

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, 200], [200, statusBarHeight + 50], Extrapolate.CLAMP)
    }
  })

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP)
    }
  })

  function handleBack() {
    navigation.goBack()
  }

  function handleConfirmRental() {
    navigation.navigate('Scheduling', { car })
  }

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`)
      setCarUpdated(response.data)
    }

    if (netInfo.isConnected === true) {
      fetchCarUpdated()
    }
  }, [netInfo.isConnected])

  return (
    <S.Container>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <S.AnimatedHeaderAndSlider style={headerStyleAnimation}>
        <S.Header>
          <BackButton onPress={handleBack} />
        </S.Header>

        <S.AnimatedCarImages style={sliderCarsStyleAnimation}>
          <ImageSlider
            imagesUrl={
              !!carUpdated.photos
                ? carUpdated.photos
                : [{ id: car.thumbnail, photo: car.thumbnail }]
            }
          />
        </S.AnimatedCarImages>
      </S.AnimatedHeaderAndSlider>

      <S.AnimatedContent onScroll={scrollHandler} scrollEventThrottle={16}>
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>
            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{car.period}</S.Period>
            <S.Price>
              {netInfo.isConnected === true ? formatCurrency(car.price) : 'R$ ******'}
            </S.Price>
          </S.Rent>
        </S.Details>

        {carUpdated.accessories && (
          <S.Accessories>
            {carUpdated.accessories.map(accessory => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))}
          </S.Accessories>
        )}
        <S.About>{car.about}</S.About>
      </S.AnimatedContent>

      <S.Footer>
        <Button
          title="Escolher período de aluguel"
          onPress={handleConfirmRental}
          enabled={netInfo.isConnected === true}
        />

        {netInfo.isConnected === false && (
          <S.OfflineInfo>
            Conecte-se a Internet para ver mais detalhes e agendar seu carro.
          </S.OfflineInfo>
        )}
      </S.Footer>
    </S.Container>
  )
}
