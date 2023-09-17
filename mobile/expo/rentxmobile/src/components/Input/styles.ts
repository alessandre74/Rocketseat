import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

type Props = {
  isFocused: boolean
}

export const Container = styled.View`
  flex-direction: row;
`

export const IconContainer = styled.View<Props>`
  ${({ theme, isFocused }) => css`
    height: 56px;
    width: 55px;
    justify-content: center;
    align-items: center;
    margin-right: 2px;
    background-color: ${theme.colors.background_secondary};

    ${isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
  `}
`
export const InputText = styled.TextInput<Props>`
  ${({ theme, isFocused }) => css`
    flex: 1;
    padding: 0 23px;
    color: ${theme.colors.text};
    font-size: ${RFValue(15)}px;
    font-family: ${theme.fonts.primary_400};
    background-color: ${theme.colors.background_secondary};

    ${isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
  `}
`
