import { StyleSheet } from 'react-native'
import colors from './colors'

const Style_Cart = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.White,
        paddingTop: 20,
        paddingHorizontal: 20,
    },

    container_cart: {
        flex: 1,
        width: '100%'
    },

    container_title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24
    },

    title_cart: {
        fontFamily: 'Inter Bold',
        fontSize: 20,
        color: colors.Black
    },

    container_product: {
        flexDirection: 'row',
        width: '100%',
        height: 88,
        marginBottom: 24,
        alignItems: 'center'
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

    checkBoxAll: {
        width: 24,
        height: 24,
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

    img_product: {
        width: 88,
        height: 88,
        borderRadius: 16,
        marginRight: 12
    },

    loading_img_product: {
        width: 88,
        height: 88,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 8,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
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
        backgroundColor: colors.White
    },

    container_checkAll: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
    },

    content_checkAll: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    text_totalPrice: {
        fontFamily: 'Inter Bold',
        color: colors.Red,
        fontSize: 24
    },

    label_checkAll: {
        fontFamily: 'Inter SemiBold',
        color: colors.Black,
        fontSize: 16
    },

    btn_payment: {
        width: '100%',
        height: 56,
        backgroundColor: colors.Red,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 12,
    },

    text_payment: {
        fontFamily: 'Inter Bold',
        fontSize: 18,
        color: colors.White
    },

    container_loading: {
        flex: 1,
        backgroundColor: colors.White
    },

    text_name_skeleton: {
        width: '100%',
        height: 16,
        borderRadius: 100,
        marginBottom: 4
    },

    text_price_skeleton: {
        width: '50%',
        height: 16,
        borderRadius: 100,
        marginBottom: 4
    },

    text_quantity_skeleton: {
        width: '25%',
        height: 16,
        borderRadius: 100,
        marginBottom: 8
    }
})

export default Style_Cart