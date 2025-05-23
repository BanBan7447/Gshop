import { View, Text, Image } from 'react-native'
import React from 'react'

import Page_Home from '../stack/tab_stack/Page_Home'
import Page_News from '../stack/tab_stack/Page_News'
import Page_Cart from '../stack/tab_stack/Page_Cart'
import Page_Notification from '../stack/tab_stack/Page_Notification'
import Page_Profile from '../stack/tab_stack/Page_Profile'
import Page_Payment from '../stack/page_stack/Page_Payment'
import Page_Search from '../stack/page_stack/Page_Search'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import colors from '../styles/colors'
const TabStack = createBottomTabNavigator();

const Tab_Navigation = () => {
  const iconSize = 24;

  return (
    <TabStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.White,
          height: 56,
          paddingTop: 6,
        },

        tabBarIcon: ({ focused }) => {
          if (route.name === 'Home') {
            if (focused) {
              return (
                <Image
                  source={require('../assets/icon/icon_home_red.png')}
                  style={{ width: iconSize, height: iconSize }} />
              )
            } else {
              return (
                <Image
                  source={require('../assets/icon/icon_home.png')}
                  style={{ width: iconSize, height: iconSize }} />
              )
            }
          }

          if (route.name === 'Search') {
            if (focused) {
              return (
                <Image
                  source={require('../assets/icon/icon_search_red.png')}
                  style={{ width: iconSize, height: iconSize }} />
              )
            } else {
              return (
                <Image
                  source={require('../assets/icon/icon_search.png')}
                  style={{ width: iconSize, height: iconSize }} />
              )
            }
          }

          if (route.name === 'Cart') {
            if (focused) {
              return (
                <Image
                  source={require('../assets/icon/icon_shopping_cart_red.png')}
                  style={{ width: iconSize, height: iconSize }} />
              )
            } else {
              return (
                <Image
                  source={require('../assets/icon/icon_shopping_cart.png')}
                  style={{ width: iconSize, height: iconSize }} />
              )
            }
          }

          if (route.name === 'News') {
            if (focused) {
              return (
                <Image
                  source={require('../assets/icon/icon_newspaper_red.png')}
                  style={{ width: iconSize, height: iconSize }} />
              )
            } else {
              return (
                <Image
                  source={require('../assets/icon/icon_newspaper.png')}
                  style={{ width: iconSize, height: iconSize }} />
              )
            }
          }

          if (route.name === 'Profile') {
            if (focused) {
              return (
                <Image
                  source={require('../assets/icon/icon_profile_red.png')}
                  style={{ width: iconSize, height: iconSize }} />
              )
            } else {
              return (
                <Image
                  source={require('../assets/icon/icon_profile.png')}
                  style={{ width: iconSize, height: iconSize }} />
              )
            }
          }
        },

        tabBarShowLabel: false
      })}>

      <TabStack.Screen name='Home' component={Page_Home} />
      <TabStack.Screen name='Search' component={Page_Search} />
      <TabStack.Screen name='Cart' component={Page_Cart} />
      <TabStack.Screen name='News' component={Page_News} />
      <TabStack.Screen name='Profile' component={Page_Profile} />

    </TabStack.Navigator>
  )
}

export default Tab_Navigation