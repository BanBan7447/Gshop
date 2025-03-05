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
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: colors.Black,
        textAlign: 'center'
    },
    name:{
        fontSize: 16,
        color: colors.Grey,
        marginBottom: 10
    },
    phone:{
        fontSize: 16,
        color: colors.Grey,
        marginBottom: 10
    },
    email:{
        fontSize: 16,
        color: colors.Grey,
        marginBottom: 10
    },
    welcom:{
        fontSize: 16,
        color: colors.Grey,
        marginBottom: 10
    },
    passs:{
        fontSize: 16,
        color: colors.Grey,
        marginBottom: 10
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: colors.Light_Blue,
        borderRadius: 16,
        paddingHorizontal: 16,
        backgroundColor: colors.Light_Blue,
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
        color: colors.Black,
        marginBottom: 24,
        fontSize: 16,
    },
    loginButton: {
        width: '100%',
        height: 56,
        backgroundColor: colors.Red,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 20,
    },
    loginButtonText: {
        color: colors.White,
        fontSize: 18,
        fontWeight: 'bold',
    },
    newUserText: {
        fontSize: 16,
        color: colors.Black,
        marginBottom: 8,
        textAlign: 'center'
    },
    registerButton: {
        width: '100%',
        height: 56,
        backgroundColor: colors.Blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        padding: 10,
    },
    registerButtonText: {
        color: colors.White,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Style_SignUp;