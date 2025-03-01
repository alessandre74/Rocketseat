import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import Icon from 'react-native-vector-icons/MaterialIcons'

import Deliveries from '../Deliveries'
import Profile from '../Profile'
import Details from '../Details'
import ProblemView from '../ProblemView'
import ProblemReport from '../ProblemReport'
import ConfirmDelivery from '../ConfirmDelivery'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

export default function Dashboard() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#7d40e7',
        inactiveTintColor: '#999999',
      }}
    >
      <Tab.Screen
        name="Deliveries"
        options={{
          tabBarLabel: 'Entregas',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="reorder"
              size={25}
              color={focused ? '#7d40e7' : '#999999'}
            />
          ),
        }}
      >
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: '#7d40e7' },
              headerTintColor: '#fff',
              headerBackTitleVisible: false,
            }}
          >
            <Stack.Screen
              name="Deliverie"
              component={Deliveries}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Detail"
              component={Details}
              options={{ title: 'Detalhes da encomenda' }}
            />
            <Stack.Screen
              name="ProblemReport"
              component={ProblemReport}
              options={{ title: 'Informar Problemas' }}
            />
            <Stack.Screen
              name="ProblemView"
              component={ProblemView}
              options={{ title: 'Visualizar Problemas' }}
            />
            <Stack.Screen
              name="ConfirmDelivery"
              component={ConfirmDelivery}
              options={{ title: 'Confirmar entrega' }}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Meu Perfil',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="account-circle"
              size={25}
              color={focused ? '#7d40e7' : '#999999'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
