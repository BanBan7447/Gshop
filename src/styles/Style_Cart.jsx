import { StyleSheet } from 'react-native'
import colors from './colors'

const Style_Cart = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: colors.White,
        paddingTop: 20,
        paddingHorizontal: 20,
    },

    container_cart: {
        width: '100%',
        flex: 1
    },

    title_cart: {
        fontFamily: 'Inter Bold',
        fontSize: 20,
        color: colors.Black,
        marginBottom: 24
    },

    container_product: {
        flexDirection: 'row',
        width: '100%',
        height: 88,
        marginBottom: 24
    },

    img_product: {
        width: 88,
        height: 88,
        borderRadius: 12,
        marginRight: 12
    },

    container_info: {
        flex: 1,
        justifyContent: 'space-between'
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
        marginBottom: 10
    },

    container_quantity: {
        flexDirection: 'row',
        alignItems: 'center'
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
        marginHorizontal: 16,
        letterSpacing: 1
    },

    btn_delete: {
        width: 24,
        height: 24,
        position: 'absolute',
        bottom: 0,
        right: 0
    },

    container_empty: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },

    img_icon_empty: {
        width: 80,
        height: 80,
    },

    title_empty: {
        fontFamily: 'Inter Bold',
        color: colors.Black,
        fontSize: 24,
        marginVertical: 8
    },

    text_empty: {
        width: '90%',
        fontFamily: 'Inter Regular',
        color: colors.Black,
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24
    },

    btn_shopping: {
        width: '60%',
        height: 48,
        backgroundColor: colors.Red,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        marginTop: 16,
    },
    
    text_shopping:{
        fontFamily: 'Inter Bold',
        fontSize: 16,
        color: colors.White
    },

    container_bottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },

    btn_payment: {
        width: '100%',
        height: 56,
        backgroundColor: colors.Red,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 24,
    },

    text_payment: {
        fontFamily: 'Inter Bold',
        fontSize: 18,
        color: colors.White
    },
})

export default Style_Cart