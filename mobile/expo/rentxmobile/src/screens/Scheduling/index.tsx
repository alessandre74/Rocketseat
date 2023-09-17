import React, { useState } from 'react'
import { format } from 'date-fns'
import { StatusBar } from 'react-native'

import { useHooks } from '../../Hooks/useHooks'
import ArrowSvg from '../../assets/arrow.svg'

import { CarDTO } from '../../dtos/CarDTO'
import { getPlatformDate } from '../../utils/getPlatformdate'
import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { Calendar, DayProps, generateIntervals, MarkedDateProps } from '../../components/Calendar'

import * as S from './styles'

type RentalPeriod = {
  startFormatted: string
  endFormatted: string
}

type Params = {
  car: CarDTO
}

export function Scheduling() {
  const [lastSelectdate, setLastSelectdate] = useState<DayProps>({} as DayProps)
  const [makedDates, setMakedDates] = useState<MarkedDateProps>({} as MarkedDateProps)
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

  const { route, navigation, theme } = useHooks()
  const { car } = route.params as Params

  function handleBack() {
    navigation.goBack()
  }

  function handleConfirmRental() {
    navigation.navigate('SchedulingDetails', { car, dates: Object.keys(makedDates) })
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectdate.timestamp ? date : lastSelectdate
    let end = date

    if (start.timestamp > end.timestamp) {
      start = end
      end = start
    }

    setLastSelectdate(end)
    const interval = generateIntervals(start, end)
    setMakedDates(interval)

    const firstDate = Object.keys(interval)[0]
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1]

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy')
    })
  }

  return (
    <S.Container>
      <S.Header>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <BackButton onPress={handleBack} color={theme.colors.shape} />

        <S.Title>
          Escolha uma {'\n'}data de início e {'\n'}fim do aluguel
        </S.Title>

        <S.RentalPeriod>
          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>

            <S.DateValueContainer selected={!!rentalPeriod.startFormatted}>
              <S.DateValue>{rentalPeriod.startFormatted}</S.DateValue>
            </S.DateValueContainer>
          </S.DateInfo>

          <ArrowSvg />

          <S.DateInfo>
            <S.DateTitle>Até</S.DateTitle>

            <S.DateValueContainer selected={!!rentalPeriod.endFormatted}>
              <S.DateValue>{rentalPeriod.endFormatted}</S.DateValue>
            </S.DateValueContainer>
          </S.DateInfo>
        </S.RentalPeriod>
      </S.Header>

      <S.Content>
        <Calendar markedDates={makedDates} onDayPress={handleChangeDate} />
      </S.Content>

      <S.Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRental}
          enabled={!!rentalPeriod.startFormatted}
        />
      </S.Footer>
    </S.Container>
  )
}
