import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from './colors'

const Style_Detail_Order = StyleSheet.create({
    container:{
        backgroundColor: colors.White,
        paddingHorizontal: 20,
        flex: 1,
    },
    navigation: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 56,
        marginTop: 8,
        marginBottom: 8
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
    title_order: {
        fontFamily: 'Inter Bold',
        color: colors.Black,
        fontSize: 22,
        lineHeight: 32,
    },
    title: {
        fontFamily: 'Inter Bold',
        color: colors.Black,
        fontSize: 16,
        lineHeight: 32,
        marginBottom: 8,
        alignItems: 'center',
    },
    date: {
        fontFamily: 'Inter Medium',
        fontSize: 16,
        color: colors.Black
    },
    status: {
        fontFamily: 'Inter Semibold',
        fontSize: 17,
    },
    container_title: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 4,
        marginBottom: 24
    },
    container_user:{
        marginBottom: 24
    },
    content_user: {
        fontFamily: 'Inter Medium',
        fontSize: 16,
    },
    container_product: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    content_product: {
        fontFamily: 'Inter Medium',
        fontSize: 16,
    },
    container_payment: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16
    },
    content_payment: {
        fontFamily: ' Inter Medium',
        fontSize: 14
    },
    payment_totalPrice: {
        fontFamily: 'Inter Bold',
        fontSize: 18,
        color: colors.Black
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    centerText: {
        textAlign: 'center',
        paddingVertical: 5
    },
    textRating: {
        fontSize: 16,
        fontFamily: 'Inter Bold'
    }
})


export default Style_Detail_Order;


