import { StyleSheet } from 'react-native'
import colors from './colors'

const Style_Edit_Address = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
    name: {
        fontSize: 16,
        color: '#7F7F7F',
        marginRight: 325,
        width: '100%',
        marginTop: 10
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.Black,
        marginBottom: 8
    },
    input: {
        width: '100%',
        height: 56,
        borderWidth: 1,
        borderColor: '#E9F1FB',
        borderRadius: 16,
        paddingHorizontal: 16,
        backgroundColor: '#E9F1FB',
        marginBottom: 16,
        marginTop: 5
    },
    containerBTN: {
        flexDirection: 'row',
        gap: 16,
        zIndex: 1000
    },
    loginButton: {
        flex: 1,
        height: 56,
        backgroundColor: colors.Blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'Inter Bold'
    },
    deleteButton: {
        flex: 1,
        height: 56,
        backgroundColor: '#E43727',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
    deleteButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'Inter Bold'
    }
})

export default Style_Edit_Address

