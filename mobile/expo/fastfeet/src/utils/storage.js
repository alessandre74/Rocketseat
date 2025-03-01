import { Alert, AsyncStorage } from 'react-native'
// import AsyncStorage from '@react-native-community/async-storage'

const save = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível salvar os dados!')
  }
}

const get = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key)
    if (data !== null) {
      return data
    }
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível obter os dados!')
  }
}

const remove = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível remover os dados!')
  }
}

export default { save, get, remove }
