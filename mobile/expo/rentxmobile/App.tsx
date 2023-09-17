import React from 'react'
import AppLoading from 'expo-app-loading'
import { ThemeProvider } from 'styled-components'
import { AppProvider } from './src/Hooks/Auth'
import { Routes } from './src/routes'
import { fonts, useFonts } from './fonts'

import theme from './src/styles/theme'

export default function App() {
  const [fontsLoaded] = useFonts({ ...fonts })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  )
}
