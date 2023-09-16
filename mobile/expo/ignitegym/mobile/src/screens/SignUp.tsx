import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { Center, Text, Heading, useToast } from 'native-base'

import * as yup from 'yup'
import { api } from '@services/api'
import { useAuth } from '@hooks/useAuth'
import { AppError } from '@utils/AppError'
import { yupResolver } from '@hookform/resolvers/yup'

import { LogoSvg } from '@assets/svg/Logo'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { LoginScreen } from '@components/LoginScreen'

type FormDataProps = {
  name: string
  email: string
  password: string
  password_confirm: string
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: yup
    .string()
    .required('Informe a senha.')
    .min(6, 'A senha deve ter pelo menos 6 digitos.'),
  password_confirm: yup
    .string()
    .required('Informe a senha.')
    .oneOf([yup.ref('password')], 'A confirmação da senha não confere.')
})

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const { signIn } = useAuth()
  const navigation = useNavigation()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataProps>({ resolver: yupResolver(signUpSchema) })

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleSignUp({ name, email, password }: FormDataProps) {
    try {
      setIsLoading(true)
      await api.post('/users', { name, email, password })
      await signIn(email, password)
    } catch (error) {
      setIsLoading(false)
      toast.show({
        title: AppError.isAppError(
          error,
          'Não foi possível cria a conta. Tente mais tarde.'
        ),
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  return (
    <LoginScreen>
      <Center mb={8}>
        <LogoSvg />
        <Text color="gray.100" fontSize="sm">
          Treine sua mente e o seu corpo
        </Text>
      </Center>

      <Center>
        <Heading color="gray.100" mb={8} fontSize="xl" fontFamily="heading">
          Crie sua conta
        </Heading>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Nome"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
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
              onChangeText={onChange}
              value={value}
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password_confirm"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Confirme a senha"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              returnKeyType="send"
              onSubmitEditing={handleSubmit(handleSignUp)}
              errorMessage={errors.password_confirm?.message}
            />
          )}
        />
        <Button
          title="Criar e Acessar"
          isLoading={isLoading}
          onPress={handleSubmit(handleSignUp)}
        />
      </Center>

      <Button
        title="Voltar para o login"
        variant="outline"
        mt={12}
        onPress={handleGoBack}
      />
    </LoginScreen>
  )
}
