import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from './colors'

const Style_Notification = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.White,
        paddingHorizontal: 20,
        paddingTop: 20
    },

    title: {
        fontFamily: 'Inter Bold',
        color: colors.Black,
        fontSize: 24,
        marginBottom: 24
    },

    title_body: {
        fontFamily: 'Inter Medium',
        color: colors.Black,
        fontSize: 16,
        marginBottom: 16
    },

    container_cart: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 24
    },

    container_icon_cart: {
        width: 56,
        height: 56,
        backgroundColor: colors.Light_Blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginRight: 16
    },

    icon_cart: {
        width: 24,
        height: 24
    },

    container_info: {
        width: '100%',
        flex: 1,
        flexDirection: 'column',
    },

    content: {
        fontFamily: 'Inter Regular',
        fontSize: 14,
        color: colors.Black,
        lineHeight: 22,
        marginBottom: 8
    },

    date: {
        width: '100%',
        textAlign: 'right',
        fontSize: 12,
        color: colors.Grey,
        fontFamily: 'Inter Regular'
    }
})

export default Style_Notification