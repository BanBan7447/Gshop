import React from "react";
import {View, StyleSheet, Text, Image} from 'react-native'
import colors from "../Style/colors";

const Demo = () => {
    return (
        <View>
            <Image
                source={require('../Media/icon/icon_arrow_down.png')}
                style={{width: 100, height: 100}}
                tintColor={colors.white}
            />

            
        </View>
    )
}

export default Demo;