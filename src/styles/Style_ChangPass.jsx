import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Style_ChangPass = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
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
        color: '#000000',
        marginTop: 40,
    },
    inputContainer: {
        width: 367,
        height: 56,
        backgroundColor: '#E9F1FB',
        borderRadius: 16,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        color: '#000000',
        fontSize: 16,
        marginLeft: 15,
    },
    placeholder: {
        color: '#000000',
    },
    inputIcon: {
        marginRight: 15,
        width: 24,
        height: 24
    },
    infoText: {
        fontSize: 18,
        color: '#000000',
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
        color: '#000000',
    },
    saveButton: {
        width: 365,
        height: 56,
        backgroundColor: '#E43727',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginTop: 350,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
})
  

export default Style_ChangPass