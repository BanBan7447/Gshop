import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import Stack_Navigation from './src/navigation/Stack_Navigation'
import { NavigationContainer } from '@react-navigation/native'
import { AppProvider } from './src/context'
import { CartProvider } from './src/context/CartContext'
import { ToastProvider } from 'react-native-toast-notifications'

const App = () => {
  return (
    <ToastProvider>
    <AppProvider>
      <CartProvider>
        <NavigationContainer>
          <View style={style_app.container}>
            <Stack_Navigation />
          </View>
        </NavigationContainer>
      </CartProvider>
    </AppProvider>
    </ToastProvider>
  )
}

export default App

const style_app = StyleSheet.create({
  container: {
    flex: 1,
  }
})