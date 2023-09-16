import { TextInput } from 'react-native'
import { useEffect, useRef } from 'react'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'

import { useNewGroups } from './useNewGroups'
import { Container, Content, Icon } from './styles'

export function NewGroup() {
  const { group, setGroup, handleNew } = useNewGroups()
  const newGroupNameInputRef = useRef<TextInput>(null)

  useEffect(() => {
    newGroupNameInputRef.current?.focus()
  }, [])

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight title="Nova Turma" subTitle="crie a turma para adicionar as pessoas" />

        <Input
          inputRef={newGroupNameInputRef}
          value={group}
          placeholder="Nome da turma"
          onChangeText={setGroup}
        />

        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  )
}
