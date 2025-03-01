import 'react-native-gesture-handler'
import React from 'react'
import { YellowBox } from 'react-native'

// import { name as appName } from './app.json'
import Routes from './src/routes'

// require('react-native').unstable_enableLogBox()

YellowBox.ignoreWarnings([
  'Warning: componentWillReceiveProps',
  'Animated: `useNativeDriver`',
])

// AppRegistry.registerComponent(appName, () => App)

export default function App() {
  return <Routes />
}
