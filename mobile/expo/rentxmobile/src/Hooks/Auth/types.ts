import { ReactNode } from 'react'

type User = {
  id: string
  user_id: string
  name: string
  email: string
  driver_license: string
  avatar: string
  token: string
}

type SignInCredencials = {
  email: string
  password: string
}

type AuthContextData = {
  user: User
  signIn: (credencials: SignInCredencials) => Promise<void>
  signOut: () => Promise<void>
  updatedUser: (user: User) => Promise<void>
  loading: boolean
}

type AuthProviderProps = {
  children: ReactNode
}

export { User, SignInCredencials, AuthContextData, AuthProviderProps }
