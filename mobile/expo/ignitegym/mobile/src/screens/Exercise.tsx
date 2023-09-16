import { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { Box, HStack, Heading, Icon, Image, Text, VStack, useToast } from 'native-base'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { Button } from '@components/Button'
import { Loading } from '@components/Loading'
import { BodySvg } from '@assets/svg/Body'
import { SeriesSvg } from '@assets/svg/Series'
import { RepetitionsSvg } from '@assets/svg/Repetitions'
import { AppNavigatorRoutesProps, AppRoutes } from '@routes/app.routes'

type RouteParamsProps = RouteProp<AppRoutes, 'exercise'>

export function Exercise() {
  const [sendingRegister, setSendingRegister] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)

  const toast = useToast()
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const { id } = useRoute<RouteParamsProps>().params

  function HandleGoBack() {
    navigation.goBack()
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/exercises/${id}`)

      setExercise(data)
    } catch (error) {
      toast.show({
        title: AppError.isAppError(error, ''),
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleExercisesHistoryRegister() {
    try {
      setSendingRegister(true)
      await api.post('/history', { exercise_id: id })

      toast.show({
        title: 'Parabéns! Exercício registrado no seu histórico.',
        placement: 'top',
        bgColor: 'green.700'
      })

      navigation.navigate('history')
    } catch (error) {
      toast.show({
        title: AppError.isAppError(error, 'Não foi possível registrar o exercício.'),
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setSendingRegister(false)
    }
  }

  useEffect(() => {
    fetchExerciseDetails()
  }, [id])

  return (
    <VStack flex={1}>
      <VStack bg="gray.600" px={8} pt={12}>
        <TouchableOpacity onPress={HandleGoBack}>
          <Icon as={<Feather name="arrow-left" />} color="green.500" size={6} />
        </TouchableOpacity>

        <HStack justifyContent="space-between" alignItems="center" mt={4} mb={8}>
          <Heading color="gray.100" fontSize="lg" fontFamily="heading" flexShrink={1}>
            {exercise.name}
          </Heading>

          <HStack>
            <BodySvg />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <VStack p={8}>
          <Box rounded="lg" mb={3} overflow="hidden">
            {/* {exercise.demo && ( */}
            <Image
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`
              }}
              w="full"
              h={80}
              resizeMode="cover"
              alt="Nome do exercício"
              rounded="lg"
            />
            {/* )} */}
          </Box>

          <Box bg="gray.600" rounded="md" pb={4} px={4}>
            <HStack justifyContent="space-around" alignItems="center" mb={6} mt={5}>
              <HStack>
                <SeriesSvg />
                <Text color="gray.200" ml={2}>
                  {exercise.series} Séries
                </Text>
              </HStack>
              <HStack>
                <RepetitionsSvg />
                <Text color="gray.200" ml={2}>
                  {exercise.repetitions} repetições
                </Text>
              </HStack>
            </HStack>
            <Button
              isLoading={sendingRegister}
              title="Marcar como realizado"
              onPress={handleExercisesHistoryRegister}
            />
          </Box>
        </VStack>
      )}
    </VStack>
  )
}
