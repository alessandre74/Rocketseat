import React, { useState, useEffect } from 'react'
import { StatusBar, FlatList } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { useHooks } from '../../Hooks/useHooks'

import { api } from '../../services/api'
import { Car as ModelCar } from '../../database/model/Car'

import { Car } from '../../components/Car'
import { BackButton } from '../../components/BackButton'
import { LoadAnimation } from '../../components/LoadAnimation'

import * as S from './styles'
import { formatDate } from '../../utils/formatted'

type DataProps = {
  id: string
  car: ModelCar
  start_date: string
  end_date: string
}

export function MyCars() {
  const [cars, setCars] = useState<DataProps[]>([])
  const [loading, setLoading] = useState(true)

  const { navigation, theme, screenIsFocus } = useHooks()

  function handleBack() {
    navigation.goBack()
  }

  useEffect(() => {
    async function fetCars() {
      try {
        const response = await api.get('/rentals')
        const dataFormatted = response.data.map((data: DataProps) => {
          return {
            id: data.id,
            car: data.car,
            start_date: formatDate(data.start_date, 'digit'),
            end_date: formatDate(data.end_date, 'digit')
          }
        })
        setCars(dataFormatted)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetCars()
  }, [screenIsFocus])

  return (
    <S.Container>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <S.Header>
        <S.HeaderBackButton>
          <BackButton onPress={handleBack} color={theme.colors.shape} />
        </S.HeaderBackButton>

        <S.TextWrapper>
          <S.Title>Seus agendamentos, {'\n'}estão aqui.</S.Title>
          <S.SubTitle>Conforto, segurança e praticidade.</S.SubTitle>
        </S.TextWrapper>
      </S.Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <S.Content>
          <S.Appointments>
            <S.AppointmentsTitle>Agendamentos feitos</S.AppointmentsTitle>
            <S.AppointmentsQuantity>{cars.length}</S.AppointmentsQuantity>
          </S.Appointments>
          <FlatList
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <S.CarWrapper>
                <Car data={item.car} />
                <S.CarFooter>
                  <S.CarFooterTitle>Período</S.CarFooterTitle>
                  <S.CarFooterPeriod>
                    <S.CarFooterDate>{item.start_date}</S.CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <S.CarFooterDate>{item.end_date}</S.CarFooterDate>
                  </S.CarFooterPeriod>
                </S.CarFooter>
              </S.CarWrapper>
            )}
          />
        </S.Content>
      )}
    </S.Container>
  )
}
