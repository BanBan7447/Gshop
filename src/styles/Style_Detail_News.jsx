import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from './colors'

const Style_Detail_News = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },

    navigation: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 56,
        marginTop: 8,
    },

    img_icon: {
        width: 24,
        height: 24,
        marginRight: 16
    },

    text_navigation: {
        fontFamily: 'Inter Medium',
        color: colors.Black,
        fontSize: 18
    },

    thumbnails_news: {
        width: '100%',
        height: 200,
        marginTop: 16,
        marginBottom: 24,
        borderRadius: 24
    },

    title_news: {
        fontFamily: 'Inter Bold',
        color: colors.Black,
        fontSize: 24,
        marginBottom: 4
    },

    date_news: {
        textAlign: 'right',
        fontFamily: 'Inter Regular',
        color: colors.Grey,
        fontSize: 12
    },

    content_news: {
        fontFamily: 'Inter Regular',
        color: colors.Black,
        fontSize: 14,
        textAlign: 'justify',
        lineHeight: 24
    },

    images_news: {
        width: '100%',
        height: 200,
        marginTop: 16,
        marginBottom: 16,
        borderRadius: 16
    },

    container_loading:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
    }
})

export default Style_Detail_News