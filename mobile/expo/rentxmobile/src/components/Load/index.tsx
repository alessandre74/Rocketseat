import React from 'react'
import { ActivityIndicator } from 'react-native'
import { useHooks } from '../../Hooks/useHooks'

export function Load() {
  const { theme } = useHooks()
  return <ActivityIndicator color={theme.colors.main} size="large" style={{ flex: 1 }} />
}
