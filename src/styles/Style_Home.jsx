import { StyleSheet } from 'react-native'
import colors from './colors'

const Style_Home = StyleSheet.create({
    container: {
        backgroundColor: colors.White,
        paddingTop: 20,
    },

    container_title: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        paddingHorizontal: 16
    },

    img_logo: {
        width: 110,
        height: 40
    },

    img_icon: {
        width: 24,
        height: 24
    },

    container_filer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 24,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 40,
    },

    title: {
        fontFamily: 'Inter Medium',
        fontSize: 20,
        color: colors.Black
    },

    container_category: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: 16,
        marginBottom: 24,
    },

    render_category: {
        height: 40,
        paddingHorizontal: 16,
        backgroundColor: colors.Light_Blue,
        marginRight: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },

    render_text_category: {
        fontFamily: 'Inter Medium',
        fontSize: 16,
        color: colors.Black,
    },

    container_product: {
        paddingHorizontal: 10,
    },

    card_product: {
        width: '45%',
        marginHorizontal: 10,
        marginBottom: 20
    },

    loading_img_product: {
        width: '100%',
        height: 160,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },

    img_product: {
        width: '100%',
        height: 160,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 8
    },

    name_product: {
        fontFamily: 'Inter SemiBold',
        fontSize: 16,
        color: colors.Black,
        marginBottom: 4
    },

    type_product: {
        fontFamily: 'Inter Regular',
        fontSize: 14,
        color: colors.Grey,
    },

    price_product: {
        fontFamily: 'Inter Bold',
        fontSize: 24,
        color: colors.Red,
    },

    label_outStock: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
        bottom: 16,
        right: 8
    },

    text_outStock: {
        fontFamily: 'Inter Bold',
        color: colors.White,
        fontSize: 12
    },

    container_loading: {
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

export default Style_Home