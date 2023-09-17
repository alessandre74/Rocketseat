import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { BorderlessButtonProps } from 'react-native-gesture-handler'

import { useHooks } from '../../Hooks/useHooks'

import * as S from './styles'

interface Props extends BorderlessButtonProps {
  color?: string
}

export function BackButton({ color, ...rest }: Props) {
  const { theme } = useHooks()

  return (
    <S.Container {...rest}>
      <MaterialIcons name="chevron-left" size={24} color={color ? color : theme.colors.text} />
    </S.Container>
  )
}
