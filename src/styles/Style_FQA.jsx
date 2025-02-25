import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from './colors'

const Style_FQA = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    headerTitle: {
        fontSize: 18,
        marginLeft: 10,
        textAlignVertical: 'center',
        color: '#282828',
    },
    backButton: {
        marginRight: 16,
    },
    // headerTitle: {
    //     fontSize: 18,
    //     fontWeight: 'bold',
    // },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    question: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    questionText: {
        fontSize: 18,
        color: "#d9534f",
    },
    answer: {
        paddingTop: 8,
    },
    answerText: {
        fontSize: 15,
        color: '#282828',

    }
});

export default Style_FQA