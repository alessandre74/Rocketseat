import styled from 'styled-components/native'
import { Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  padding: ${Platform.OS === 'android' ? '0 24px 16px' : '0 24px'};
`
