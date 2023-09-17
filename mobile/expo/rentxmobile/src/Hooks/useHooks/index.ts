import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native'
import { useTheme } from 'styled-components'

export function useHooks() {
  const route = useRoute()
  const theme = useTheme()
  const screenIsFocus = useIsFocused()
  const navigation = useNavigation()

  return {
    route,
    theme,
    screenIsFocus,
    navigation
  }
}
