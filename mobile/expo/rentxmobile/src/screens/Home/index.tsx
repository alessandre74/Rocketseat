import React, { useEffect, useState } from 'react'
import { Platform, StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useNetInfo } from '@react-native-community/netinfo'

import { synchronize } from '@nozbe/watermelondb/sync'
import { database } from '../../database'

import { useHooks } from '../../Hooks/useHooks'
import Logo from '../../assets/logo.svg'

import { api } from '../../services/api'
import { LoadAnimation } from '../../components/LoadAnimation'

import { Car } from '../../components/Car'

import { Car as ModelCar } from '../../database/model/Car'
import { AirplaneMode } from '../../components/AirplaneMode'

import * as S from './styles'

export function Home() {
  const netInfo = useNetInfo()
  const [connected, setConnected] = useState(netInfo.isConnected)
  const [cars, setCars] = useState<ModelCar[]>([])
  const [loading, setLoading] = useState(true)
  const [lastPulletState, setLastPulletState] = useState<number | null>(0)

  const { navigation, theme } = useHooks()

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`)

        const { changes, latestVersion } = response.data

        return { changes, timestamp: latestVersion }
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users

        if (user.updated.length > 0) {
          await api.post('/users/sync', user)
        }
      }
    })
  }

  function handleCarDetails(car: ModelCar) {
    navigation.navigate('CarDetails', { car })
  }

  useEffect(() => {
    let isMounted = true

    async function fetchCars() {
      try {
        const carCollection = database.get<ModelCar>('cars')
        const cars = await carCollection.query().fetch()

        if (isMounted) {
          setCars(cars)
        }
      } catch (error) {
        console.log(error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }
    fetchCars()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize()
    }
  }, [netInfo.isConnected])

  function Disconnected() {
    setConnected(
      connected === true || connected === null
        ? (netInfo.isConnected = false)
        : (netInfo.isConnected = true)
    )
  }

  return (
    <S.Container>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <S.Header>
        <S.HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && <S.TotalCars>{`Total de ${cars.length} carros`}</S.TotalCars>}
          {Platform.OS === 'ios' && (
            <AirplaneMode
              status={connected}
              size={20}
              color={theme.colors.background_secondary}
              onPress={Disconnected}
            />
          )}
        </S.HeaderContent>
      </S.Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <S.CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
        />
      )}
    </S.Container>
  )
}
