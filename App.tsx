import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import Stack_Navigation from './src/navigation/Stack_Navigation'
import { NavigationContainer } from '@react-navigation/native'
import { AppProvider } from './src/context'

const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <View style={style_app.container}>
          <Stack_Navigation/>
        </View>
      </NavigationContainer>
    </AppProvider>
  )
}

export default App

const style_app = StyleSheet.create({
  container: {
    flex: 1,
  }
})