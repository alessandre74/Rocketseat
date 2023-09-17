import React, { createContext, useState, useContext, useEffect } from 'react'
import { AuthContextData, AuthProviderProps, User, SignInCredencials } from './types'
import { Alert } from 'react-native'

import { api } from '../../services/api'
import { database } from '../../database'
import { User as ModelUser } from '../../database/model/User'

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<User>({} as User)
  const [loading, setLoading] = useState(true)

  async function signIn({ email, password }: SignInCredencials) {
    try {
      const response = await api.post('/sessions', { email, password })

      const { token, user } = response.data

      api.defaults.headers.common['authorization'] = `Bearer ${token}`

      const userCollection = database.get<ModelUser>('users')
      await database.write(async () => {
        const dataUser = await userCollection.create(newUser => {
          ;(newUser.user_id = user.id),
            (newUser.name = user.name),
            (newUser.email = user.email),
            (newUser.driver_license = user.driver_license),
            (newUser.avatar = user.avatar),
            (newUser.token = token)
        })

        const userData = dataUser._raw as unknown as User

        setData(userData)
      })
    } catch (error) {
      // @ts-ignore
      console.log('signin', error.message)
      Alert.alert('Email ou senha inválido')
    }
  }

  async function signOut() {
    try {
      const userCollection = database.get<ModelUser>('users')
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id)
        await userSelected.destroyPermanently()
      })

      setData({} as User)
    } catch (error) {
      // @ts-ignore
      console.log(error.message)
      Alert.alert('Erro ao sair do aplicativo')
    }
  }

  async function updatedUser(user: User) {
    try {
      const userCollection = database.get<ModelUser>('users')
      await database.write(async () => {
        const userSelected = await userCollection.find(user.id)

        await userSelected.update(userData => {
          ;(userData.name = user.name),
            (userData.driver_license = user.driver_license),
            (userData.avatar = user.avatar)
        })

        setData(user)
      })
    } catch (error) {
      // @ts-ignore
      console.log(error.message)
    }
  }

  useEffect(() => {
    async function loadUserdata() {
      const userColletion = database.get<ModelUser>('users')
      const response = await userColletion.query().fetch()

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as User

        api.defaults.headers.common['authorization'] = `Bearer ${userData.token}`
        setData(userData)
        setLoading(false)
      }
    }

    loadUserdata()
  }, [])
  return (
    <AuthContext.Provider value={{ user: data, signIn, signOut, updatedUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
