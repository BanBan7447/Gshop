import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from './colors'

const Style_ForgotPass = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.White,
        paddingHorizontal: 20,
        paddingTop: 32
    },

    container_btn: {
        width: '100%',
        flexDirection: 'row',
        gap: 16,
        marginBottom: 24
    },

    btnChange: {
        flex: 1,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16
    },

    textBtn: {
        fontFamily: 'Inter Bold',
        fontSize: 14,
        color: colors.White
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.Light_Blue,
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 16
    },

    textInput: {
        flex: 1,
        height: 56,
        fontSize: 14,
        color: colors.Black
    },

    eyeIcon: {
        width: 24,
        height: 24,
        marginLeft: 16,
    },
})

export default Style_ForgotPass