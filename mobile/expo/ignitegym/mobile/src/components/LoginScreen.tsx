import { VStack, Image, ScrollView } from 'native-base'
import BackgroundImg from '@assets/png/background.png'

type Props = {
  children: React.ReactNode
}

export function LoginScreen({ children }: Props) {
  return (
    <VStack flex={1} bg="gray.700">
      <Image
        source={BackgroundImg}
        defaultSource={BackgroundImg}
        alt="Pessoas treinando"
        resizeMode="contain"
        position="absolute"
      />
      <ScrollView
        contentContainerStyle={{
          marginTop: 96,
          marginBottom: 96,
          paddingLeft: 40,
          paddingRight: 40
        }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </VStack>
  )
}
