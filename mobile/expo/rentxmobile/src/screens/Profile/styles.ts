import styled, { css } from 'styled-components/native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { RFValue } from 'react-native-responsive-fontsize'

type OptionProps = {
  active: boolean
}

export const Container = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.background_primary};
  `}
`
export const Header = styled.View`
  ${({ theme }) => css`
    height: 227px;
    width: 100%;
    padding: 0 24px;
    background-color: ${theme.colors.header};
    align-items: center;
  `}
`
export const HeaderTop = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${getStatusBarHeight() + 30}px;
`
export const HeaderTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.background_secondary};
    font-family: ${theme.fonts.secondary_600};
    font-size: ${RFValue(25)}px;
  `}
`
export const LogoutButton = styled(BorderlessButton)``

export const PhotoContainer = styled.View`
  ${({ theme }) => css`
    height: 180px;
    width: 180px;
    border-radius: 90px;
    margin-top: 48px;
    background-color: ${theme.colors.shape};
    border: 1px solid red;
  `}
`
export const Photo = styled.Image`
  height: 180px;
  width: 180px;
  border-radius: 90px;
`
export const PhotoButton = styled(RectButton)`
  ${({ theme }) => css`
    height: 40px;
    width: 40px;
    background-color: ${theme.colors.main};
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 10px;
    right: 10px;
  `}
`
export const Content = styled.View`
  padding: 0 24px;
  margin-top: 122px;
`
export const Options = styled.View`
  ${({ theme }) => css`
    border-bottom-width: 1px;
    border-bottom-color: ${theme.colors.line};

    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 24px;
  `}
`
export const Option = styled.TouchableOpacity<OptionProps>`
  padding-bottom: 14px;
  ${({ theme, active }) =>
    active &&
    css`
      border-bottom-width: 3px;
      border-bottom-color: ${theme.colors.main};
    `}
`

export const OptionTitle = styled.Text<OptionProps>`
  ${({ theme, active }) => css`
    font-size: ${RFValue(20)}px;
    font-family: ${active ? theme.fonts.secondary_600 : theme.fonts.secondary_500};
    color: ${active ? theme.colors.header : theme.colors.text_detail};
  `}
`
export const Section = styled.View``
