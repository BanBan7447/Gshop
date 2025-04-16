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
        marginBottom: 32,
        alignSelf: 'flex-start', // Đưa logo về góc trái
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: colors.Black,
        textAlign: 'center'
    },
    name:{
        fontSize: 14,
        color: colors.Grey,
        marginBottom: 8
    },
    phone:{
        fontSize: 14,
        color: colors.Grey,
        marginBottom: 8
    },
    email:{
        fontSize: 14,
        color: colors.Grey,
        marginBottom: 8
    },
    welcom:{
        fontSize: 16,
        color: colors.Grey,
        marginBottom: 8
    },
    passs:{
        fontSize: 16,
        color: colors.Grey,
        marginBottom: 8
    },
    input: {
        width: '100%',
        height: 56,
        borderWidth: 1,
        borderColor: colors.Light_Blue,
        borderRadius: 16,
        paddingHorizontal: 16,
        backgroundColor: colors.Light_Blue,
        marginBottom: 16,
    },
    error: {
        fontFamily: "Inter Regular",
        marginTop: 0,
        marginBottom: 16,
        color: colors.Red
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
        backgroundColor: colors.Blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 24,
    },
    loginButtonText: {
        color: colors.White,
        fontSize: 16,
        fontFamily: 'Inter Bold'
    },
    newUserText: {
        fontSize: 14,
        color: colors.Black,
        marginBottom: 12,
        textAlign: 'center'
    },
    registerButton: {
        width: '100%',
        height: 56,
        backgroundColor: colors.Red,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        padding: 10,
        marginTop: 16,
        marginBottom: 24
    },
    registerButtonText: {
        color: colors.White,
        fontSize: 16,
        fontFamily: 'Inter Bold'
    },
});

export default Style_SignUp;