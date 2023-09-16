import { useEffect } from 'react'
import { FlatList } from 'react-native'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { ButtonIcon } from '@components/ButtonIcon'
import { Filter } from '@components/Filter'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { Loading } from '@components/Loading'

import { Container, Form, HeaderList, NumberOfPlayers } from './styles'
import { usePlayers } from './usePlayers'

export function Players() {
  const {
    team,
    teams,
    group,
    players,
    isLoading,
    newPlayerName,
    newPlayerNameInputRef,
    setTeam,
    setNewPlayerName,
    fetchPlayersByTeam,
    handleAddPlayer,
    handleGroupRemove,
    handlePlayerRemove
  } = usePlayers()

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subTitle="adicione a galera e separe os times" />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />

        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={teams}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter title={item} isActive={item === team} onPress={() => setTeam(item)} />
          )}
          horizontal
        />

        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard name={item.name} onRemove={() => handlePlayerRemove(item.name)} />
          )}
          ListEmptyComponent={() => <ListEmpty message="Não há pessoas nesse time" />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 }
          ]}
        />
      )}

      <Button
        title="Remover turma"
        type="SECONDARY"
        style={{ marginTop: 12 }}
        onPress={handleGroupRemove}
      />
    </Container>
  )
}
