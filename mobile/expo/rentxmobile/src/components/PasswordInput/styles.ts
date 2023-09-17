import styled, { css, DefaultTheme } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { BorderlessButton } from 'react-native-gesture-handler'

type Props = {
  isFocused: boolean
}

const focusPasswordVisibilityButton = {
  focused: (theme: DefaultTheme) =>
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `
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

    ${isFocused && focusPasswordVisibilityButton.focused(theme)};
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

    ${isFocused && focusPasswordVisibilityButton.focused(theme)};
  `}
`
export const PasswordVisibilityButton = styled(BorderlessButton)``

export const ContainerPasswordVisibilityButton = styled.View<Props>`
  ${({ theme, isFocused }) => css`
    flex-direction: row;
    align-items: center;
    padding: 0 16px 0 16px;
    background-color: ${theme.colors.background_secondary};

    ${isFocused && focusPasswordVisibilityButton.focused(theme)};
  `}
`
