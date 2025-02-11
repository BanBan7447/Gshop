import { View, Text } from 'react-native'
import React, { useState } from 'react'

import Tab_Navigation from './Tab_Navigation'
import Page_Splash from '../stack/page_stack/Page_Splash'
import Page_Search from '../stack/page_stack/Page_Search'
import Page_Detail from '../stack/page_stack/Page_Detail'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator();

const Stack_Navigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Splash'>
      <Stack.Screen name='Splash' component={Page_Splash} />
      <Stack.Screen name='Tab' component={Tab_Navigation} />
      <Stack.Screen name='Search' component={Page_Search} />
      <Stack.Screen name='Detail' component={Page_Detail} />
    </Stack.Navigator>
  )
}

export default Stack_Navigation