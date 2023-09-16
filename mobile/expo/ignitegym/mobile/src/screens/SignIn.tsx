import { useState } from 'react'
import { Center, Text, Heading, useToast } from 'native-base'
import { Controller, useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'

import { useAuth } from '@hooks/useAuth'
import { AppError } from '@utils/AppError'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { LogoSvg } from '@assets/svg/Logo'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { LoginScreen } from '@components/LoginScreen'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

type FormDataProps = {
  email: string
  password: string
}

const signInSchema = yup.object({
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: yup.string().required('Informe a senha.')
})

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const { signIn } = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataProps>({ resolver: yupResolver(signInSchema) })

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true)
      await signIn(email, password)
    } catch (error) {
      setIsLoading(false)

      toast.show({
        title: AppError.isAppError(
          error,
          'Não foi possível fazer o login. Tente mais tarde.'
        ),
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  return (
    <LoginScreen>
      <Center mb={12}>
        <LogoSvg />
        <Text color="gray.100" fontSize="sm">
          Treine sua mente e o seu corpo
        </Text>
      </Center>

      <Center>
        <Heading color="gray.100" mb={12} fontSize="xl" fontFamily="heading">
          Acesse sua conta
        </Heading>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="senha"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              returnKeyType="send"
              onSubmitEditing={handleSubmit(handleSignIn)}
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Button
          title="Acessar"
          isLoading={isLoading}
          onPress={handleSubmit(handleSignIn)}
        />
      </Center>

      <Center mt={24}>
        <Text mb={3} color="gray.100" fontSize="sm" fontFamily="body">
          Ainda não tem acesso
        </Text>
        <Button
          title="Criar conta"
          variant="outline"
          onPress={handleNewAccount}
        />
      </Center>
    </LoginScreen>
  )
}
