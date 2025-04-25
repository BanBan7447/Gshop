import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from './colors'

const Style_FQA = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 20,
        paddingTop: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },
    backIcon: {
        width: 20,
        height: 20,
    },
    headerTitle: {
        fontFamily: 'Inter Medium',
        fontSize: 16,
        marginLeft: 14,
        textAlignVertical: 'center',
        color: colors.Black,
    },
    backButton: {
        marginRight: 16,
    },
    item: {
        paddingVertical: 16,
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
        color: colors.Red,
        fontFamily: 'Inter SemiBold',
        lineHeight: 20
    },
    answer: {
        paddingTop: 8,
    },
    answerText: {
        fontSize: 14,
        color: '#282828',
        lineHeight: 24,
        fontFamily: 'Inter Regular',
        textAlign: "justify",
        marginTop: 12
    }
});

export default Style_FQA