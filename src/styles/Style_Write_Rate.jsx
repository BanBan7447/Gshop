import { StyleSheet } from 'react-native'
import colors from './colors'

const Style_Write_Rate = StyleSheet.create({
    container: {
        backgroundColor: colors.White,
        paddingHorizontal: 20
    },

    navigation: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 56,
        marginTop: 8,
        marginBottom: 16
    },

    img_icon: {
        width: 24,
        height: 24,
        marginRight: 16
    },

    img_icon_2: {
        width: 24,
        height: 24,
        marginRight: 12
    },

    text_navigation: {
        fontFamily: 'Inter Medium',
        color: colors.Black,
        fontSize: 16
    },

    img_product: {
        width: 80,
        height: 80,
        borderRadius: 16,
        marginRight: 16
    },

    container_product: {
        marginBottom: 32,
    },

    container_info: {
        flexDirection: 'row',
    },

    text_name: {
        fontFamily: 'Inter Bold',
        fontSize: 14,
        color: colors.Black,
        marginBottom: 4,
        lineHeight: 20
    },

    text_price: {
        fontFamily: 'Inter Bold',
        fontSize: 14,
        color: colors.Red
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
        fontSize: 14,
        marginTop: 16,
        marginBottom: 8
    },

    text_input: {
        width: '100%',
        height: 120,
        backgroundColor: colors.Light_Blue,
        borderRadius: 12,
        padding: 16,
        textAlignVertical: 'top',
        marginBottom: 16,
        color: colors.Black
    },

    btn_upload: {
        width: '100%',
        height: 48,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.Blue
    },

    text_upload: {
        fontSize: 16,
        fontFamily: 'Inter SemiBold',
        color: colors.White
    },

    btn_review: {
        height: 56,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: -24
    },

    text_review: {
        fontSize: 16,
        fontFamily: 'Inter SemiBold',
        color: colors.White
    },

    text_deleteAll: {
        fontFamily: "Inter Bold",
        textAlign: 'right',
        marginBottom: 16,
        fontSize: 16,
        color: colors.Red

    },

    text_empty: {
        textAlign: 'center',
        color: colors.Grey,
        marginBottom: 16,
        fontSize: 16,
    }
})

export default Style_Write_Rate