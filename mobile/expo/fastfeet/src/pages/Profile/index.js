import React, { useEffect, useState } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native'

import storage from '../../utils/storage'
import Container from '../../components/Container'
import SubmitButton from '../../components/Button'

import { Avatar, DataProfile, DataGroup, DataLabel, DataText } from './styles'

export default function Profile() {
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const [profile, setProfile] = useState()

  useEffect(() => {
    if (isFocused) {
      storage.get('profile').then((response) => {
        setProfile(JSON.parse(response))
      })
    }
  }, [isFocused])

  function handleSubmit() {
    storage.remove('profile')
    navigation.navigate('SignIn')
  }

  return (
    <Container background>
      <Avatar source={{ uri: profile && profile.data.avatar.url }} />
      <DataProfile>
        <DataGroup>
          <DataLabel>Nome completo</DataLabel>
          <DataText>{profile && profile.data.name}</DataText>
        </DataGroup>
        <DataGroup>
          <DataLabel>Email</DataLabel>
          <DataText>{profile && profile.data.email}</DataText>
        </DataGroup>
        <DataGroup>
          <DataLabel>Data de cadastro</DataLabel>
          <DataText>{profile && profile.data.createdAt}</DataText>
        </DataGroup>
      </DataProfile>
      <SubmitButton loading={false} onPress={handleSubmit} color="#E74040">
        Logout
      </SubmitButton>
    </Container>
  )
}
