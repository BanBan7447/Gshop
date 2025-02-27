import { StyleSheet } from 'react-native'
import colors from './colors'

const Style_Detail = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.White,
    },

    navigation: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        marginTop: 8
    },

    card: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        backgroundColor: colors.White,
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 1000
    },

    text_card: {
        fontFamily: 'Inter Bold',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        color: colors.Green,
        marginStart: 12
    },

    text_numberCart: {
        fontSize: 11,
        color: colors.White
    },

    numberCart: {
        width: 16,
        height: 16,
        backgroundColor: colors.Red,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        position: 'absolute',
        right: 0,
        top: 0
    },

    img_icon: {
        width: 24,
        height: 24,
        marginRight: 16
    },

    img_icon_cart: {
        width: 24,
        height: 24,
        marginRight: 8
    },

    text_navigation: {
        fontFamily: 'Inter Medium',
        color: colors.Black,
        fontSize: 20
    },

    img_product: {
        width: 390,
        height: 300,
    },

    container_title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20
    },

    container_info: {
        marginTop: 16,
        marginHorizontal: 20
    },

    text_name: {
        fontFamily: 'Inter SemiBold',
        fontSize: 24,
        color: colors.Black,
        marginBottom: 4
    },

    text_price: {
        fontFamily: 'Inter Bold',
        fontSize: 28,
        color: colors.Red,
        marginBottom: 4
    },

    text_title_state: {
        fontFamily: 'Inter Medium',
        color: colors.Black,
        fontSize: 16,
        marginBottom: 16
    },

    text_title_describe: {
        fontFamily: 'Inter Medium',
        color: colors.Black,
        fontSize: 20
    },

    text_describe: {
        fontFamily: 'Inter Regular',
        color: colors.Black,
        fontSize: 14,
        marginBottom: 24,
        textAlign: 'justify'
    },

    btn_AddCart: {
        width: '100%',
        height: 56,
        backgroundColor: colors.Red,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16
    },

    text_AddCart: {
        fontFamily: 'Inter Bold',
        fontSize: 18,
        color: colors.White
    },

    container_error: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    img_icon_error: {
        width: 80,
        height: 80,
    },

    title_error: {
        fontFamily: 'Inter Bold',
        color: colors.Black,
        fontSize: 24,
        marginVertical: 8
    },

    container_view: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        opacity: 0.8,
        flexDirection: 'row',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },

    container_numberPic: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingVertical: 6,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        bottom: 10,
        right: 10
    },

    img_icon_view: {
        width: 20,
        height: 20,
        marginRight: 10
    },

    text_view: {
        fontFamily: 'Inter Medium',
        color: colors.White,
        fontSize: 14
    },

    container_loading:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
    },

    container_bottom: {
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.White,
        marginVertical: 16
    },

    text_rate: {
        fontFamily: 'Inter SemiBold',
        fontSize: 16,
        color: colors.Black,
        marginLeft: 6
    },

    btn_rate: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    info_rate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
    
})

export default Style_Detail