import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from './colors'

const Style_Verify_OTP = StyleSheet.create({
    codeFieldRoot: {
        marginBottom: 24,
        justifyContent: 'center',
    },

    cell: {
        width: 50,
        height: 50,
        lineHeight: 48,
        fontSize: 24,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        textAlign: 'center',
        marginHorizontal: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },

    cellText: {
        fontSize: 18,
        color: colors.Black
    },

    focusCell: {
        borderColor: '#007BFF',
    },

    btnVerity: {
        width: '100%',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: colors.Red
    },

    textVerity: {
        color: colors.White,
        fontFamily: 'Inter Bold',
        fontSize: 16
    }
})

export default Style_Verify_OTP