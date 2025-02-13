import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from './colors'

const Styles_News = StyleSheet.create({
    container: {
        backgroundColor: colors.White,
        paddingHorizontal: 20,
        paddingTop: 20
    },

    img_icon: {
        width: 24,
        height: 24,
        marginRight: 16
    },

    title: {
        fontFamily: 'Inter Bold',
        color: colors.Black,
        fontSize: 24
    },

    container_input: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        backgroundColor: colors.Light_Blue,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginTop: 16,
        marginBottom: 24
    },

    text_input: {
        flex: 1,
        fontSize: 16,
        marginStart: -4
    },

    container_news: {
        width: '100%',
        marginBottom: 24
    },

    thumbnails_news: {
        width: '100%',
        height: 180,
        borderRadius: 16,
        marginBottom: 8
    },

    title_news: {
        fontFamily: 'Inter Bold',
        color: colors.Black,
        fontSize: 20,
        marginBottom: 4
    },

    date_news: {
        textAlign: 'right',
        fontFamily: 'Inter Regular',
        color: colors.Grey,
        fontSize: 12
    }
})

export default Styles_News