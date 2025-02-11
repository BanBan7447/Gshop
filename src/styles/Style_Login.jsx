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
      marginBottom: 56
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000000',
        textAlign: 'center'
    },
    inputGroup: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        color: '#7F7F7F',
        marginBottom: 8,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#E9F1FB',
        borderRadius: 16,
        paddingHorizontal: 16,
        backgroundColor: '#E9F1FB',
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
        marginTop: -6,
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
    },
    forgotPassword: {
        color: '#000',
        fontSize: 16,
    },
    loginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#E43727',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 20,
        marginTop: 30
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    newUserContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    newUserText: {
        fontSize: 16,
        color: '#000000',
        marginBottom: 5,
    },
    registerButton: {
        width: 370,
        height: 56,
        backgroundColor: '#266FDA',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 20,
    },
    registerButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
})

export default Style_Login