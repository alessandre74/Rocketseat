import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import * as S from './styles'

interface Props extends RectButtonProps {
  status: boolean | null
  size: number
  color?: string
}

export function AirplaneMode({ status, size, color, ...rest }: Props) {
  return (
    <S.Container {...rest}>
      <Feather
        name={status === true || status === null ? 'wifi' : 'wifi-off'}
        size={size}
        color={color}
      />
    </S.Container>
  )
}
