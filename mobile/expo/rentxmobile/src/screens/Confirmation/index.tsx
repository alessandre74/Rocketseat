import React from 'react'
import { StatusBar, useWindowDimensions } from 'react-native'

import { useHooks } from '../../Hooks/useHooks'
import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'

import { ConfirmButton } from '../../components/ConfirmButton'

import * as S from './styles'

type Params = {
  title: string
  message: string
  nextScreenRoute: any
}

export function Confirmation() {
  const { width } = useWindowDimensions()

  const { navigation, route } = useHooks()
  const { title, message, nextScreenRoute } = route.params as Params

  function handleConfirm() {
    navigation.navigate(nextScreenRoute)
  }
  return (
    <S.Container>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LogoSvg width={width} />

      <S.Content>
        <DoneSvg width={80} height={80} />
        <S.Title>{title}</S.Title>

        <S.Message>{message}</S.Message>

        <S.Footer>
          <ConfirmButton title="OK" onPress={handleConfirm} />
        </S.Footer>
      </S.Content>
    </S.Container>
  )
}
