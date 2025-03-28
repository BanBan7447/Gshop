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
        width: 24,
        height: 20,
    },
    headerTitle: {
        fontSize: 20,
        marginLeft: 13,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        color: colors.Black,
    },
    eyeIcon: {
        width: 24,
        height: 14,
        position: 'absolute',
        right: 16,
        marginTop: -6,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.Black,
        marginTop: 40,
    },
    inputContainer: {
        width: '100%',
        height: 56,
        backgroundColor: colors.Light_Blue,
        borderRadius: 16,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        color: colors.Black,
        fontSize: 16,
        marginLeft: 15,
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
        fontSize: 18,
        color: colors.Black,
        marginTop: 20,
        fontWeight: 'bold',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    tickIcon: {
        width: 16,
        height: 16,
    },
    listText: {
        marginLeft: 5,
        fontSize: 16,
        color: colors.Black,
    },
    container_bottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginBottom: 24,
        marginHorizontal: 20
    },
    saveButton: {
        width: '100%',
        height: 56,
        backgroundColor: colors.Red,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16
    },
    saveButtonText: {
        color: colors.White,
        fontSize: 18,
        fontWeight: 'bold',
    },
})
  

export default Style_ChangPass