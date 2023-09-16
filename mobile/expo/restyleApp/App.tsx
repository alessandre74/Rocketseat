import { StatusBar } from 'expo-status-bar'
import { ThemeProvider } from '@shopify/restyle'
import { theme } from './src/theme'
import { Home } from './src/screens/Home'
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins'

export default function App() {
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_700Bold })

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      {fontsLoaded && <Home />}
    </ThemeProvider>
  )
}
