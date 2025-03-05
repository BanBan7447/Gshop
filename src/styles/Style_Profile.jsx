import { View, Text, StyleSheet } from 'react-native'
import colors from './colors';

const Style_Profile = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.White,
        paddingHorizontal: 20,
        paddingTop: 20
    },

    avatar: {
        width: 80,
        height: 80,
        marginRight: 20,
        borderRadius: 50
    },

    icon_img: {
        width: 24,
        height: 24
    },

    container_info: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24
    },

    info: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    title_welcome: {
        fontFamily: 'Inter SemiBold',
        fontSize: 18,
        marginBottom: 6
    },

    title_name: {
        fontFamily: 'Inter SemiBold',
        fontSize: 22,
        marginBottom: 4,
        color: colors.Black
    },

    title_phone: {
        fontFamily: 'Inter Medium',
        fontSize: 16,
        color: colors.Black
    },

    btn_Login_SignUp: {
        width: '100%',
        height: 48,
        backgroundColor: colors.Red,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16
    },

    text_btn_Login_SignUp: {
        fontFamily: 'Inter SemiBold',
        color: colors.White,
        fontSize: 16
    },

    btn_page: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    text_btn_page: {
        fontFamily: 'Inter SemiBold',
        fontSize: 16,
        color: colors.Black
    }
});
 

export default Style_Profile