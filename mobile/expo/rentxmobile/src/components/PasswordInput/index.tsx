import React, { useState } from 'react'
import { TextInputProps, View } from 'react-native'
import { useTheme } from 'styled-components'
import { Feather } from '@expo/vector-icons'

import * as S from './styles'

interface PasswordInputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name']
  value?: string
}

export function PasswordInput({ iconName, value, ...rest }: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const theme = useTheme()

  function handleInputFocus() {
    setIsFocused(true)
  }

  function handleInputBlur() {
    setIsFocused(false)
    setIsFilled(!!value)
  }

  function handlePasswordVisible() {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <S.Container>
      <S.IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={isFocused || isFilled ? theme.colors.main : theme.colors.text_detail}
        />
      </S.IconContainer>

      <S.InputText
        {...rest}
        secureTextEntry={isPasswordVisible}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        autoCorrect={false}
      />

      <S.ContainerPasswordVisibilityButton isFocused={isFocused}>
        <S.PasswordVisibilityButton
          onPress={handlePasswordVisible}
          activeOpacity={1}
          rippleColor={theme.colors.background_secondary}
        >
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_detail}
          />
        </S.PasswordVisibilityButton>
      </S.ContainerPasswordVisibilityButton>
    </S.Container>
  )
}
