import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import Style_SignUp from '../../styles/Style_SignUp';


const Page_SignUp = () => {
    return (
        <View style={Style_SignUp.container}>
        <Image
            style={Style_SignUp.logoContainer}
            source={require('../../assets/image/logo_app_2.png')} />
        

            <Text style={Style_SignUp.title}>Đăng ký</Text>
            <View>
                <Text style={Style_SignUp.name}>Họ tên</Text>
            </View>

            <TextInput
                style={Style_SignUp.input}
                placeholder="Value"
                placeholderTextColor="#000000"
            />
            <View>
                <Text style={Style_SignUp.phone}>Số điện thoại</Text>
            </View>

            <TextInput
                style={Style_SignUp.input}
                placeholder="Value"
                placeholderTextColor="#000000"
            />
            <View>
                <Text style={Style_SignUp.email}>Email</Text>
            </View>

            <TextInput
                style={Style_SignUp.input}
                placeholder="Value"
                placeholderTextColor="#000000"
            />
            <View>
                <Text style={Style_SignUp.passs}>Mật khẩu</Text>
            </View>

            <View style={Style_SignUp.passwordContainer}>
                <TextInput
                    style={[Style_SignUp.input, Style_SignUp.passwordInput]}
                    placeholder="Value"
                    placeholderTextColor="#000000"
                    secureTextEntry
                />
                <TouchableOpacity>
                    <Image source={require('../../assets/icon/icon_show.png')} style={Style_SignUp.eyeIcon}/>
                </TouchableOpacity>
            </View>

            <TouchableOpacity>
                <Text style={Style_SignUp.forgotPassword}>Quên mật khẩu?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={Style_SignUp.loginButton}>
                <Text style={Style_SignUp.loginButtonText}>Đăng ký</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={Style_SignUp.newUserText}>Bạn mới sử dụng GShop?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style_SignUp.registerButton}>
                <Text style={Style_SignUp.registerButtonText}>Đăng nhập</Text>
            </TouchableOpacity>
        </View>
    );
}


export default Page_SignUp;
