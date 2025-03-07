import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from './colors'

const Style_Payment = StyleSheet.create({
    container: {
        flex: 1,
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

    text_title: {
        fontFamily: 'Inter Bold',
        color: colors.Black,
        fontSize: 20,
        marginBottom: 8
    },

    text_body_1: {
        fontSize: 16,
        fontFamily: 'Inter Bold',
        color: colors.Black,
        marginBottom: 4
    },

    text_body_2: {
        fontSize: 16,
        fontFamily: 'Inter Regular',
        color: colors.Black,
        lineHeight: 24
    },

    btn_text: {
        fontSize: 16,
        fontFamily: 'Inter Bold',
        color: colors.Blue
    },

    container_info: {
        marginHorizontal: 20
    },

    container_title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    container_product: {
        marginHorizontal: 20,
    },

    container_item: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 88,
        width: '100%',
        marginBottom: 16
    },

    container_item_info: {
        flex: 1
    },

    img_product: {
        width: 88,
        height: 88,
        borderRadius: 16,
        marginRight: 12
    },

    text_name: {
        fontFamily: 'Inter SemiBold',
        fontSize: 18,
        color: colors.Black,
        marginBottom: 4
    },

    text_price: {
        fontFamily: 'Inter SemiBold',
        fontSize: 18,
        color: colors.Red,
        marginBottom: 4
    },

    container_quantity: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    icon_quantity: {
        width: 12,
        height: 12
    },

    btn_quantity: {
        width: 24,
        height: 24,
        backgroundColor: colors.Light_Blue,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },

    text_quantity: {
        fontFamily: 'Inter SemiBold',
        color: colors.Black,
        fontSize: 16
    },

    btn_delete: {
        width: 24,
        height: 24
    },

    container_payment_method: {
        marginHorizontal: 20,
        marginBottom: 4
    },

    item_payment: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    text_name_paymentMethod: {
        fontFamily: 'Inter Medium',
        fontSize: 14,
        color: colors.Black
    },

    checkBox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: colors.Black,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16
    },

    checkBox_selected: {
        backgroundColor: colors.Blue
    },

    container_payment: {
        marginHorizontal: 20
    },

    container_totalPrice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    text_totalPrice: {
        fontFamily: 'Inter Bold',
        color: colors.Black,
        fontSize: 20
    },

    container_bottom: {
        marginHorizontal: 20,
        marginVertical: 20
    },

    btn_order: {
        backgroundColor: colors.Red,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        borderRadius: 16
    },

    text_oder: {
        color: colors.White,
        fontFamily: 'Inter Bold',
        fontSize: 20
    }
})

export default Style_Payment