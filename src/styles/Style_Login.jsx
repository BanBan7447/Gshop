import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from './colors'

const Style_Login = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.White,
        padding: 20,
    },
    logoContainer: {
        width: 112,
        height: 40,
        marginBottom: 56,
        alignSelf: 'flex-start', // Đưa logo về góc trái
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: colors.Black,
        textAlign: 'center'
    },
    inputGroup: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: colors.Grey,
        marginBottom: 8,
    },
    input: {
        width: '100%',
        height: 56,
        borderRadius: 16,
        paddingHorizontal: 16,
        backgroundColor: colors.Light_Blue,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    passwordInput: {
        flex: 1,
    },
    eyeIcon: {
        width: 24,
        height: 14,
        position: 'absolute',
        right: 16,
        marginTop: -8,
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
    },
    forgotPassword: {
        fontFamily: 'Inter Medium',
        color: colors.Black,
        fontSize: 14,
    },
    loginButton: {
        width: '100%',
        height: 56,
        backgroundColor: colors.Red,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 24,
        marginTop: 24
    },
    loginButtonText: {
        color: colors.White,
        fontSize: 16,
        fontFamily: 'Inter Bold',
    },
    newUserContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    newUserText: {
        fontSize: 14,
        color: colors.Black,
        marginBottom: 12,
    },
    registerButton: {
        width: '100%',
        height: 56,
        backgroundColor: colors.Blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
    registerButtonText: {
        color: colors.White,
        fontSize: 16,
        fontFamily: 'Inter Bold',
    },
})

export default Style_Login