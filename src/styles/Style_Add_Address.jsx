import { StyleSheet, Platform } from 'react-native'
import colors from './colors'

const Style_Add_Address = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.White,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    backIcon: {
        width: 24,
        height: 20,
    },
    headerTitle: {
        fontSize: 16,
        marginLeft: 12,
        fontFamily: 'Inter Medium',
        textAlignVertical: 'center',
        color: colors.Black
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.Black,
        marginBottom: 8
    },
    name: {
        fontSize: 16,
        color: '#7F7F7F',
        marginRight: 325,
        width: '100%',
        marginTop: 10
    },
    // text: {
    //     fontSize: 16,
    //     color: '#7F7F7F',
    //     marginRight: 325,
    //     marginBottom: 10,
    //     width: '100%',
    // },
    input: {
        width: '100%',
        height: 56,
        borderRadius: 16,
        paddingHorizontal: 16,
        backgroundColor: colors.Light_Blue,
        marginBottom: 16,
        marginTop: 6,
        borderWidth: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: colors.White,
        padding: 16
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 1,
    },
    modalWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        zIndex: 2,
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: 'Inter Bold',
        padding: 16,
        color: colors.Black
    },
    modalItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#ccc'
    },
    modalItemText: {
        fontSize: 16
    },
    modalClose: {
        padding: 16,
        backgroundColor: colors.Red,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalCloseText: {
        fontFamily: 'Inter SemiBold',
        color: colors.White,
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#E43727',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 20,
        marginTop: 20
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    container_switch: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text_switch: {
        fontSize: 14,
        color: colors.Black
    }
})

export default Style_Add_Address
