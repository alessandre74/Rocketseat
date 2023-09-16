import { Platform } from 'react-native'
import { useTheme } from 'native-base'
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

import { Home } from '@screens/Home'
import { Profile } from '@screens/Profile'
import { History } from '@screens/History'
import { Exercise } from '@screens/Exercise'

import { HomeSvg } from '@assets/svg/Home'
import { ProfileSvg } from '@assets/svg/Profile'
import { HistorySvg } from '@assets/svg/History'

export type AppRoutes = {
  home: undefined
  profile: undefined
  history: undefined
  exercise: { id: string }
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const { colors, sizes } = useTheme()

  const iconsSize = sizes[7]

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[600],
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingTop: sizes[6],
          paddingBottom: sizes[10]
        }
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <HomeSvg color={color} size={iconsSize} />
        }}
      />
      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => <HistorySvg color={color} size={iconsSize} />
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <ProfileSvg color={color} size={iconsSize} />
        }}
      />
      <Screen name="exercise" component={Exercise} options={{ tabBarButton: () => null }} />
    </Navigator>
  )
}
