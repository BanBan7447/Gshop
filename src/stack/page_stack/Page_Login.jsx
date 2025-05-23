import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Alert, ToastAndroid, ActivityIndicator } from 'react-native';
import colors from '../../styles/colors';
import Style_Login from '../../styles/Style_Login';
import { api_login } from '../../helper/ApiHelper';
import { AppContext } from '../../context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Style_ForgotPass from '../../styles/Style_ForgotPass';

const Page_Login = ({ navigation, route }) => {
    const { users, setUsers } = useContext(AppContext);
    const [email_phone, setEmail_phone] = useState(route.params?.email || '');
    const [password, setPassword] = useState(route.params?.password || '');
    const [hidePassword, setHidePassword] = useState(true);
    const [loading, setLoading] = useState(false);

    // Hàm tự động định dạng số điện thoại khi nhập
    const formatPhone = (text) => {
        // Xóa tất cả các ký tự không phải số
        const cleaned = text.replace(/\D/g, "");

        let pattern;
        // Xác định pattern phù hợp theo độ dài của số điện thoại
        if (cleaned.length >= 4 && cleaned.length <= 6) {
            // Nếu số có từ 4 đến 6 chữ số, format dạng "000 000"
            pattern = /(\d{3})(\d{1,3})/; // Bắt từ 1 đến 3 chữ số cuối (có thể có hoặc không)
        } else if (cleaned.length >= 7 && cleaned.length <= 10) {
            // Nếu số có từ 7 đến 10 chữ số, format dạng "000 000 0000"
            pattern = /(\d{3})(\d{3})(\d{1,4})/; //Bắt từ 1 đến 4 chữ số cuối (có thể có hoặc không)
        } else {
            return cleaned; // Nếu quá dài (hơn 10 số), giữ nguyên
        }

        // Thay thế số theo pattern đã chọn
        return cleaned.replace(pattern, (match, p1, p2, p3) => {
            return [p1, p2, p3].filter(Boolean).join(" ");
            // filter(Boolean): Loại bỏ giá trị `undefined` để tránh lỗi khi nối chuỗi
            // và ghép các phần còn lại lại với nhau bằng dấu cách " "
        });
    };

    const handleChangeText = (text) => {
        // Xóa tất cả ký tự không phải số
        const cleaned = text.replace(/\D/g, "");

        // Kiểm tra số điện thoại hợp lệ
        if (cleaned.length > 10) {
            setEmail_phone(cleaned);
        } else if (/^\d+$/.test(cleaned) && cleaned.length > 5) {
            setEmail_phone(formatPhone(cleaned))
        } else {
            setEmail_phone(text)
        }
    }

    // Hàm đăng nhập
    const onLogin = async () => {
        if (!email_phone || !password) {
            Alert.alert('Chưa nhập thông tin', 'Vui lòng nhập thông tin đầy đủ');
            return;
        }

        setLoading(true);
        try {
            const body = {
                email_phone: email_phone.includes('@') ? email_phone : null, // Tra ve email neu co @ hoac nguoc lai
                phone_number: email_phone.includes('@') ? null : email_phone,
                password: password
            }
            const response = await api_login(body);

            console.log("Dữ liệu user trả về: ", response);

            if (response) {
                setUsers(response); //  Luu thong tin nguoi dung vao user Context;

                // Luu thong tin nguoi dung vao AsyncStorage
                await AsyncStorage.setItem('userInfo', JSON.stringify(response));

                ToastAndroid.show('Đăng nhập thành công', ToastAndroid.LONG);
                navigation.navigate('Tab', { screen: 'Home' });
            } else {
                Alert.alert('Sai thông tin', 'Email/SĐT hoặc Mật khẩu không đúng');
            }
        } catch (e) {
            Alert.alert('Lỗi kết nối', 'Có lỗi xảy ra khi kết nối đến máy chủ. Vui lòng thử lại sau');
        } finally{
            setLoading(false);
        }
    }

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
                    value={email_phone}
                    onChangeText={setEmail_phone}
                    keyboardType='default' />
            </View>

            <Text style={Style_Login.label}>Mật khẩu</Text>
            <View style={Style_ForgotPass.inputContainer}>
                <TextInput
                    style={Style_ForgotPass.textInput}
                    secureTextEntry={hidePassword}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                    <Image
                        source={
                            hidePassword
                                ? require('../../assets/icon/icon_hide.png')
                                : require('../../assets/icon/icon_show.png')
                        }
                        style={Style_ForgotPass.eyeIcon}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={Style_Login.forgotPasswordContainer}
                onPress={() => navigation.navigate('FindEmail')}>
                <Text style={Style_Login.forgotPassword}>Quên mật khẩu?</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={Style_Login.loginButton}
                onPress={() => onLogin()}>
                    {
                        loading ? (
                            <ActivityIndicator size='small' color={colors.White}/>
                        ) : (
                            <Text style={Style_Login.loginButtonText}>Đăng nhập</Text>
                        )
                    }
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
