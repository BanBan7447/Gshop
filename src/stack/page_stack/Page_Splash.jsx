import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'

// Style
import Style_Splash from '../../styles/Style_Splash'

const Page_Splash = (props) => {
  const { navigation } = props;

  // Hàm tự động chuyển vô Home
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Tab');
    }, 979)
  })

  return (
    <View style={Style_Splash.container}>
      <Image
        source={require('../../assets/image/logo_app_1.png')}
        style={Style_Splash.img_logo} />
    </View>
  )
}

export default Page_Splash