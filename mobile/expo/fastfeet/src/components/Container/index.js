import React from 'react'

import { StatusBar } from 'react-native'
import { SafeArea, Content } from './styles'

export default function Container({ children, style, background, barStyle }) {
  return (
    <SafeArea background={background}>
      <StatusBar barStyle={barStyle ? 'light-content' : 'dark-content'} />
      <Content style={{ style }} background={background}>
        {children}
      </Content>
    </SafeArea>
  )
}
