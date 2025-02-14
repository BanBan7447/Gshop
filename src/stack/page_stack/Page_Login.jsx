import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Alert, ToastAndroid } from 'react-native';
import colors from '../../styles/colors';
import Style_Login from '../../styles/Style_Login';

import { api_login } from '../../helper/ApiHelper';
import { AppContext } from '../../context';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Page_Login = (props) => {
    const { navigation } = props;
    const { users, setUsers } = useContext(AppContext);

    const [email, setEmail] = useState("tranbichngoc@gmail.com");
    const [password, setPassword] = useState("1234");
    const [hidePassword, setHidePassword] = useState("false");

    // Hàm đăng nhập
     const onLogin = async () => {
        if (!email || !password) {
            Alert.alert('Chưa nhập thông tin', 'Vui lòng nhập thông tin đầy đủ');
            return;
        }
        try{
            const body = {
                email: email,
                password: password
            }
            const response = await api_login(body);

            console.log("Dữ liệu user trả về: ", response);

            if (response) {
                setUsers(response); //  Luu thong tin nguoi dung vao user Context;

                // Luu thong tin nguoi dung vao AsyncStorage
                await AsyncStorage.setItem('userInfo', JSON.stringify(response));


                ToastAndroid.show('Đăng nhập thành công', ToastAndroid.LONG);
                navigation.navigate('Tab', { screen: 'Profile'});
            } else {
                Alert.alert('Sai thông tin', 'Email/SĐT hoặc Mật khẩu không đúng');
            }
        } catch (e) {
            Alert.alert('Lỗi kết nối', 'Có lỗi xảy ra khi kết nối đến máy chủ. Vui lòng thử lại sau');
        }
     }

    return (
        <View style={Style_Login.container}>
            <Image
                style={Style_Login.logoContainer}
                source={require('../../assets/image/logo_app_2.png')} />

            <Text style={Style_Login.title}>Đăng nhập</Text>

            <View style={Style_Login.inputGroup}>
                <Text style={Style_Login.label}>Email</Text>
                <TextInput
                    style={Style_Login.input}
                    value={email}
                    onChangeText={text => setEmail(text)}/>
            </View>

            <View style={Style_Login.inputGroup}>
                <Text style={Style_Login.label}>Mật khẩu</Text>
                <View style={Style_Login.passwordContainer}>
                    <TextInput
                        style={[Style_Login.input, Style_Login.passwordInput]}
                        secureTextEntry={!hidePassword}
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    <TouchableOpacity>
                        <Image source={require('../../assets/icon/icon_show.png')} style={Style_Login.eyeIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={Style_Login.forgotPasswordContainer}>
                <Text style={Style_Login.forgotPassword}>Quên mật khẩu?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={Style_Login.loginButton}
                onPress={() => onLogin()}>

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
