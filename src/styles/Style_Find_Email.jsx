import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from './colors'

const Style_Find_Email = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.White,
        paddingHorizontal: 20
    },

    navigation: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 56,
        marginTop: 8,
        marginBottom: 8
    },

    img_icon: {
        width: 24,
        height: 24,
        marginRight: 16
    },

    text_navigation: {
        fontFamily: 'Inter Medium',
        color: colors.Black,
        fontSize: 16
    },

    text_input: {
        width: '100%',
        height: 56,
        backgroundColor: colors.Light_Blue,
        paddingLeft: 16,
        borderRadius: 12,
        marginBottom: 24,
        fontSize: 14,
        fontFamily: 'Inter Regular'
    },

    title: {
        fontFamily: 'Inter Bold',
        color: colors.Black,
        fontSize: 16,
        marginBottom: 8
    },

    label: {
        fontFamily: 'Inter Medium',
        color: colors.Black,
        fontSize: 14,
        marginBottom: 16,
        lineHeight: 24,
        color: colors.Grey
    },

    btn_next: {
        width: '100%',
        height: 56,
        backgroundColor: colors.Red,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16
    },

    text_next: {
        fontFamily: 'Inter SemiBold',
        fontSize: 14,
        color: colors.White
    }
})

export default Style_Find_Email