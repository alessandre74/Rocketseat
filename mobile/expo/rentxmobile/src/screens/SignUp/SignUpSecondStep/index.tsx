import React, { useState } from 'react'
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'

import { useHooks } from '../../../Hooks/useHooks'
import { api } from '../../../services/api'
import { UserDTO } from '../../../dtos/userDTO'

import { BackButton } from '../../../components/BackButton'
import { Bullet } from '../../../components/Bullet'
import { Button } from '../../../components/Button'
import { PasswordInput } from '../../../components/PasswordInput'
import { Spacer } from '../../../components/Spacer'

import * as S from '../SignUpSecondStep/styles'

export function SignUpSecondStep() {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const { theme, navigation, route } = useHooks()

  const { user } = route.params as UserDTO

  function handleBack() {
    navigation.goBack()
  }

  async function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert('Inform a senha e a confirmação')
    }

    if (password != passwordConfirm) {
      return Alert.alert('As senhas não são iguais')
    }

    try {
      const data = {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password
      }

      await api.post('/users', { ...data })

      navigation.navigate('Confirmation', {
        nextScreenRoute: 'SignIn',
        title: 'Conta criada!',
        message: `Agora é só fazer login \ne aproveitar.`
      })
    } catch (error) {
      Alert.alert('Opa', 'Não foi possível cadastar')
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <S.Header>
            <BackButton onPress={handleBack} />
            <S.Steps>
              <Bullet active={false} />
              <Bullet active />
            </S.Steps>
          </S.Header>

          <S.Title>Crie sua{'\n'}conta</S.Title>

          <S.SubTitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil
          </S.SubTitle>

          <S.Form>
            <S.FormTitle>2. Senha</S.FormTitle>

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <Spacer />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir Senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </S.Form>

          <Button title="Cadastrar" color={theme.colors.success} onPress={handleRegister} />
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
