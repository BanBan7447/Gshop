import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from './colors'

const Style_FQA = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginBottom: 8
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    headerTitle: {
        fontFamily: 'Inter Medium',
        fontSize: 16,
        marginLeft: 16,
        textAlignVertical: 'center',
        color: colors.Black,
    },
    backButton: {
        marginRight: 16,
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    question: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    questionText: {
        width: '90%',
        fontSize: 14,
        color: "#d9534f",
    },
    answer: {
        paddingTop: 8,
    },
    answerText: {
        fontSize: 14,
        color: '#282828',
        lineHeight: 20,
        textAlign: "justify",

    }
});

export default Style_FQA