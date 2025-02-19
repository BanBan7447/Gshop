import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from './colors';

const Style_SignUp = StyleSheet.create({
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
    logoText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FF5722',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000000',
        textAlign: 'center'
    },
    name:{
        fontSize: 16,
        color: '#7F7F7F',
        marginBottom: 10
    },
    phone:{
        fontSize: 16,
        color: '#7F7F7F',
        marginBottom: 10
    },
    email:{
        fontSize: 16,
        color: '#7F7F7F',
        marginBottom: 10
    },
    welcom:{
        fontSize: 16,
        color: '#7F7F7F',
        marginBottom: 10
    },
    passs:{
        fontSize: 16,
        color: '#7F7F7F',
        marginBottom: 10
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#E9F1FB',
        borderRadius: 16,
        paddingHorizontal: 16,
        backgroundColor: '#E9F1FB',
        marginBottom: 16,
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
        marginTop: -14,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        color: '#000',
        marginBottom: 24,
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
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    newUserText: {
        fontSize: 16,
        color: '#000000',
        marginBottom: 8,
        textAlign: 'center'
    },
    registerButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#266FDA',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        padding: 10,
    },
    registerButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Style_SignUp;