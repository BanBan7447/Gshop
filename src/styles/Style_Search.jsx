import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from './colors'

const Style_Search = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.White
    },

    navigation: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 56,
        marginHorizontal: 24,
        marginTop: 8
    },

    img_icon: {
        width: 24,
        height: 24,
        marginRight: 16
    },

    text_navigation: {
        fontFamily: 'Inter Medium',
        color: colors.Black,
        fontSize: 20
    },

    contain_text_input: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        backgroundColor: colors.Light_Blue,
        marginHorizontal: 24,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginTop: 16,
        marginBottom: 24
    },

    text_input: {
        flex: 1,
        fontSize: 16,
        marginStart: -4
    }
})

export default Style_Search