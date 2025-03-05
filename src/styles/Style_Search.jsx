import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from './colors'

const Style_Search = StyleSheet.create({
    container: {
        backgroundColor: colors.White
    },

    navigation: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 56,
        marginHorizontal: 24,
        marginTop: 8
    },

    img_icon: {
        width: 24,
        height: 24,
        marginRight: 16
    },

    text_navigation: {
        fontFamily: 'Inter Medium',
        color: colors.Black,
        fontSize: 20
    },

    contain_text_input: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        backgroundColor: colors.Light_Blue,
        marginHorizontal: 20,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginTop: 8,
        marginBottom: 24
    },

    text_input: {
        flex: 1,
        fontSize: 16,
        marginStart: -4
    },

    container_loading:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
    },

    img_skeleton: {
        width: '100%',
        height: 160,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 8,
        backgroundColor: colors.Grey
    },

    name_skeleton: {
        width: '80%',
        height: 12,
        borderRadius: 100,
        marginBottom: 4,
        backgroundColor: colors.Black
    },

    type_product_skeleton: {
        width: '50%',
        height: 12,
        borderRadius: 100,
        marginBottom: 4,
        backgroundColor: colors.Grey
    },

    price_product_skeleton: {
        width: '80%',
        height: 12,
        borderRadius: 100,
        backgroundColor: colors.Black
    }
})

export default Style_Search