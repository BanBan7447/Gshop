import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Demo from './src/Stack/Demo'

const App = () => {
  return (
    <View style={style_app.container}>
      <Text>Hello World</Text>
    </View>
  )
}

export default App

const style_app = StyleSheet.create({
  container: {
    flex: 1
  }
})