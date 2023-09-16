import styled from 'styled-components/native'
import { Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import UsersThree from 'phosphor-react-native/src/icons/UsersThree'

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  padding: ${Platform.OS === 'android' ? '12px 24px' : '0 24px'};
`
export const Content = styled.View`
  flex: 1;
  justify-content: center;
`

export const Icon = styled(UsersThree).attrs(({ theme }) => ({
  size: 56,
  color: theme.COLORS.GREEN_700,
  weight: 'fill'
}))`
  align-self: center;
`
