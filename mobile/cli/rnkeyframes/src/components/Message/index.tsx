import { Text } from 'react-native'
import Animated, { Keyframe } from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { styles } from './styles'

export function Message() {
  const enteringKeyFrame = new Keyframe({
    0: { opacity: 0, transform: [{ translateY: -100 }] },
    70: { opacity: 0.3 },
    100: { opacity: 1, transform: [{ translateY: 0 }] }
  })

  const exitingKeyFrame = new Keyframe({
    from: { opacity: 1, transform: [{ translateY: 0 }] },
    to: { opacity: 0, transform: [{ translateY: -100 }] }
  })

  return (
    <Animated.View
      style={styles.container}
      entering={enteringKeyFrame.duration(400)}
      exiting={exitingKeyFrame}
    >
      <Icon name="notifications" color="#FFF" size={22} />
      <Text style={styles.title}>Mike lindo!</Text>
    </Animated.View>
  )
}
