import { StatusBar } from 'react-native'
import React from 'react'

import { Container, Top, Content } from './styles'

export default function Screen({ children }) {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />
      <Container>
        <Top />
        <Content>{children}</Content>
      </Container>
    </>
  )
}
