import styled, { css } from 'styled-components/native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    align-items: center;
    background-color: ${theme.colors.background_primary};
  `}
`
export const Header = styled.View`
  ${({ theme }) => css`
    width: 100%;
    height: 325px;
    padding: 24px;
    padding-top: ${getStatusBarHeight() + 30}px;
    background-color: ${theme.colors.header};
  `}
`

export const HeaderBackButton = styled.View`
  height: 32px;
  justify-content: center;
`

export const TextWrapper = styled.View`
  width: 100%;
  flex: 1;
  justify-content: center;
`

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.shape};
    font-family: ${theme.fonts.secondary_600};
    font-size: ${RFValue(30)}px;
  `}
`
export const SubTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.shape};
    font-family: ${theme.fonts.secondary_400};
    font-size: ${RFValue(15)}px;

    margin-top: 24px;
  `}
`
export const Content = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 16px;
`
export const Appointments = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 24px 0;
`
export const AppointmentsTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.text};
    font-family: ${theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;
  `}
`
export const AppointmentsQuantity = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.title};
    font-family: ${theme.fonts.primary_500};
    font-size: ${RFValue(15)}px;
  `}
`
export const CarWrapper = styled.View`
  margin-bottom: 16px;
`
export const CarFooter = styled.View`
  ${({ theme }) => css`
    width: 100%;
    padding: 12px;
    margin-top: -10px;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    background-color: ${theme.colors.background_secondary};
  `}
`
export const CarFooterTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.text_detail};
    font-family: ${theme.fonts.secondary_500};
    font-size: ${RFValue(10)}px;
  `}
`
export const CarFooterPeriod = styled.View`
  flex-direction: row;
  align-items: center;
`
export const CarFooterDate = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.title};
    font-family: ${theme.fonts.primary_400};
    font-size: ${RFValue(13)}px;
  `}
`
