import styled, { css } from 'styled-components/native'
import { Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  padding: ${Platform.OS === 'android' ? '12px 24px 16px' : '0 24px'};
`
export const Form = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`

export const HeaderList = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin: 32px 0 12px;
`

export const NumberOfPlayers = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_200};
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
`
