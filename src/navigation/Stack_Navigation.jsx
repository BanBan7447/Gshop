import React from 'react'

import Tab_Navigation from './Tab_Navigation'
import Page_Splash from '../stack/page_stack/Page_Splash'
import Page_Search from '../stack/page_stack/Page_Search'
import Page_Detail from '../stack/page_stack/Page_Detail'
import Page_Login from '../stack/page_stack/Page_Login'
import Page_SignUp from '../stack/page_stack/Page_SignUp'
import Page_Payment from '../stack/page_stack/Page_Payment'
import Page_Write_Rate from '../stack/page_stack/Page_Write_Rate'

import Page_ChangPass from '../stack/page_stack/Page_ChangPass'
import Page_Edit_Profile from '../stack/page_stack/Page_Edit_Profile'
import Page_MyAddress from '../stack/page_stack/Page_MyAddress'
import Page_MyOder from '../stack/page_stack/Page_MyOder'
import Page_Detail_News from '../stack/page_stack/Page_Detail_News'
import Page_Rating from '../stack/page_stack/Page_Rating'
import Page_FQA from '../stack/page_stack/Page_FQA'
import Page_Detail_Order from '../stack/page_stack/Page_Detail_Order'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator();

const Stack_Navigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Splash'>
      <Stack.Screen name='Splash' component={Page_Splash} />
      <Stack.Screen name='Tab' component={Tab_Navigation} />
      <Stack.Screen name='Search' component={Page_Search} />
      <Stack.Screen name='Detail' component={Page_Detail} />
      <Stack.Screen name='Login' component={Page_Login} />
      <Stack.Screen name='SignUp' component={Page_SignUp} />
      <Stack.Screen name='EditProfile' component={Page_Edit_Profile} />
      <Stack.Screen name='MyOrder' component={Page_MyOder} />
      <Stack.Screen name='Location' component={Page_MyAddress} />
      <Stack.Screen name='ChangePass' component={Page_ChangPass} />
      <Stack.Screen name='DetailNews' component={Page_Detail_News} />
      <Stack.Screen name='Rating' component={Page_Rating} />
      <Stack.Screen name='FQA' component={Page_FQA} />
      <Stack.Screen name='Payment' component={Page_Payment} />
      <Stack.Screen name='DetailOrder' component={Page_Detail_Order} />
      <Stack.Screen name='WriteRate' component={Page_Write_Rate} />
    </Stack.Navigator>
  )
}

export default Stack_Navigation