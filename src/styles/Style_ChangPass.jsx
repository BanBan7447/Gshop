import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from './colors'

const Style_ChangPass = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.White
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIcon: {
        width: 20,
        height: 20,
    },
    headerTitle: {
        fontSize: 16,
        marginLeft: 14,
        fontFamily: 'Inter Medium',
        textAlignVertical: 'center',
        color: colors.Black,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.Light_Blue,
        borderRadius: 16,
        paddingHorizontal: 12,
        marginVertical: 10,
    },
    textInput: {
        flex: 1,
        height: 56,
        fontSize: 14,
        color: colors.Black,
    },
    eyeIcon: {
        width: 24,
        height: 24,
        marginLeft: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.Black,
        marginTop: 24,
    },
    placeholder: {
        color: colors.Black,
    },
    inputIcon: {
        marginRight: 16,
        width: 24,
        height: 24
    },
    infoText: {
        fontSize: 16,
        color: colors.Black,
        marginTop: 24,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    tickIcon: {
        width: 16,
        height: 16,
    },
    listText: {
        marginLeft: 12,
        fontSize: 14,
        color: colors.Black,
        fontFamily: 'Inter Medium'
    },
    container_bottom: {
        paddingVertical: 24,
        paddingHorizontal: 20
    },
    saveButton: {
        width: '100%',
        height: 56,
        backgroundColor: colors.Red,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginTop: 24
    },
    saveButtonText: {
        color: colors.White,
        fontSize: 16,
        fontWeight: 'bold',
    },
})


export default Style_ChangPass