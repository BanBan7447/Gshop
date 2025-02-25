import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from './colors'

const Style_Rating = StyleSheet.create({
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

    container_loading:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
    },

    container: {
        paddingHorizontal: 20,
        paddingTop: 8
    },

    text_name: {
        fontFamily: 'Inter Bold',
        color: colors.Black,
        fontSize: 24
    },

    container_rating: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 24
    },

    text_rating: {
        fontFamily: 'Inter Medium',
        color: colors.Grey,
        fontSize: 18
    },

    text_rateNumber: {
        fontFamily: 'Inter Medium',
        color: colors.Black,
        fontSize: 18,
        marginStart: 4
    },

    container_customer: {
        gap: 8,
        marginBottom: 24
    },

    contain_name_date: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    name_customer: {
        fontFamily: 'Inter Medium',
        color: colors.Black,
        fontSize: 18,
    },

    content_rating: {
        fontFamily: 'Inter Regular',
        color: colors.Black,
        fontSize: 14
    },

    container_empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    text_noRating: {
        fontSize: 18,
        fontFamily: 'Inter Bold',
        color: colors.Black,
        marginTop: 16
    },

    btn_Rating: {
        width: '100%',
        height: 56,
        backgroundColor: colors.Red,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16
    },

    btn_empty_Rating: {
        width: '80%',
        height: 48,
        backgroundColor: colors.Red,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        marginTop: 16,
    },

    text_btnRating: {
        fontFamily: 'Inter Bold',
        fontSize: 18,
        color: colors.White
    },

    container_bottom: {
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.White,
        marginVertical: 16
    },

    container_model: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    content_model: {
        width: '85%',
        backgroundColor: colors.White,
        borderRadius: 24,
        padding: 20,
    },

    title_model: {
        fontFamily: 'Inter Bold',
        fontSize: 20,
        color: colors.Black,
        textAlign: 'center'
    },

    name_model: {
        fontFamily: 'Inter SemiBold',
        fontSize: 16,
        color: colors.Black,
        marginBottom: 16,
    },

    img_model: {
        width: 120,
        height: 120,
        borderRadius: 16,
        marginVertical: 12,
        alignSelf: 'center'
    },

    star_model: {
        width: 35,
        height: 35,
        marginHorizontal: 8,
    },

    star_text: {
        fontSize: 14,
        marginTop: 8,
        fontFamily: 'Inter Medium',
        color: colors.Black,
    },

    label_text_input: {
        fontFamily: 'Inter Medium',
        color: colors.Grey,
        fontSize: 16,
        marginTop: 16,
        marginBottom: 8
    },

    text_input: {
        width: '100%',
        height: 100,
        backgroundColor: colors.Light_Blue,
        borderRadius: 12,
        padding: 12,
        textAlignVertical: 'top',
        marginBottom: 16
    },

    contaner_btn:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    btn_submit: {
        flex: 1,
        height: 48,
        backgroundColor: colors.Blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginRight: 6
    },

    btn_cancel: {
        flex: 1,
        height: 48,
        backgroundColor: colors.Red,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginLeft: 6
    },

    text_submit_cancel: {
        fontFamily: 'Inter Bold',
        fontSize: 16,
        color: colors.White
    },

    name_skeleton: {
        width: 120,
        height: 16,
        borderRadius: 4
    },

    date_skeleton: {
        width: 40,
        height: 16,
        borderRadius: 4,
        marginTop: 4
    },

    star_skeleton: {
        width: 20,
        height: 20,
        borderRadius: 4,
        backgroundColor: colors.Grey,
        marginRight: 4
    },

    body_1_skeleton: {
        width: '90%',
        height: 16,
        borderRadius: 4
    },

    body_2_skeleton: {
        width: '70%',
        height: 16,
        borderRadius: 4,
        marginTop: 4
    }
})

export default Style_Rating