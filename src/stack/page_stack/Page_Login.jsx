import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import colors from '../../styles/colors';
import Style_Login from '../../styles/Style_Login';

const Page_Login = (props) => {
    const { navigation } = props;

    return (
        <View style={Style_Login.container}>
            <Image
                style={Style_Login.logoContainer}
                source={require('../../assets/image/logo_app_2.png')} />

            <Text style={Style_Login.title}>Đăng nhập</Text>

            <View style={Style_Login.inputGroup}>
                <Text style={Style_Login.label}>Email hoặc số điện thoại</Text>
                <TextInput
                    style={Style_Login.input}
                    placeholder="Value"
                    placeholderTextColor="#000000"
                />
            </View>

            <View style={Style_Login.inputGroup}>
                <Text style={Style_Login.label}>Mật khẩu</Text>
                <View style={Style_Login.passwordContainer}>
                    <TextInput
                        style={[Style_Login.input, Style_Login.passwordInput]}
                        placeholder="Value"
                        placeholderTextColor="#000000"
                        secureTextEntry
                    />
                    <TouchableOpacity>
                        <Image source={require('../../assets/icon/icon_show.png')} style={Style_Login.eyeIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={Style_Login.forgotPasswordContainer}>
                <Text style={Style_Login.forgotPassword}>Quên mật khẩu?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={Style_Login.loginButton}>
                <Text style={Style_Login.loginButtonText}>Đăng nhập</Text>
            </TouchableOpacity>

            <View style={Style_Login.newUserContainer}>
                <Text style={Style_Login.newUserText}>Bạn mới sử dụng GShop?</Text>
                <TouchableOpacity
                    style={Style_Login.registerButton}
                    onPress={() => navigation.navigate('SignUp')}>
                    <Text style={Style_Login.registerButtonText}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Page_Login;
