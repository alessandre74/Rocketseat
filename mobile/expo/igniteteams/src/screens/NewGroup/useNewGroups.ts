import { useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AppError } from '@utils/AppError'
import { groupCreate } from '@storage/group/groupCreate'

export function useNewGroups() {
  const [group, setGroup] = useState('')
  const navigation = useNavigation()

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Nova Turma', 'Informe o nome da turma.')
      }

      await groupCreate(group)
      navigation.navigate('players', { group })
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova Turma', error.message)
      } else {
        Alert.alert('Nova Turma', 'Não foi possível criar uma nova turma.')
        console.log(error)
      }
    } finally {
      setGroup('')
    }
  }
  return {
    group,
    setGroup,
    handleNew
  }
}
