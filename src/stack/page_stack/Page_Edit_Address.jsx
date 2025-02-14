import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Page_Edit_Address() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.backIcon}
                    source={require('../../../src/assets/icon/icon_long_arrow.png')} />
                <Text style={styles.headerTitle}>Chỉnh sửa địa chỉ</Text>
            </View>
            <View>
                <Text style={styles.name}>Số nhà</Text>
            </View>

            <TextInput
                style={styles.input}
                placeholderTextColor="#000000"
            />
            <View>
                <Text style={styles.name}>Phường/xã</Text>
            </View>

            <TextInput
                style={styles.input}
                placeholderTextColor="#000000"
            />
            <View>
                <Text style={styles.name}>Quận/Huyện</Text>
            </View>

            <TextInput
                style={styles.input}
                placeholderTextColor="#000000"
            />
            <View>
                <Text style={styles.name}>Tỉnh thành</Text>
            </View>

            <TextInput
                style={styles.input}
                placeholderTextColor="#000000"
            />
            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Thêm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Xóa</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginBottom: 20
    },
    backIcon: {
        width: 24,
        height: 20,
    },
    headerTitle: {
        fontSize: 20,
        marginLeft: 13,
        fontWeight: 'bold',
        textAlignVertical: 'center',
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
        height: 50,
        borderWidth: 1,
        borderColor: '#E9F1FB',
        borderRadius: 16,
        paddingHorizontal: 16,
        backgroundColor: '#E9F1FB',
        marginBottom: 16,
        marginTop: 5
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
        fontSize: 18,
        fontWeight: 'bold',
    },
    deleteButton: {
        width: '100%',
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 20,
        borderWidth: 2, // Độ dày viền
        borderColor: '#E43727', // Màu đỏ
    },
    
    deleteButtonText:{
        color: '#E43727',
        fontSize: 18,
        fontWeight: 'bold',
    }
})