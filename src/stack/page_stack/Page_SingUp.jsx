import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, ToastAndroid, Alert, ScrollView } from 'react-native';
import Style_SignUp from '../../styles/Style_SignUp';

import { api_signUp } from '../../helper/ApiHelper';
import { AppContext } from '../../context';

AppContext

const Page_SignUp = (props) => {
    const { navigation } = props;
    const { users, setUsers } = useContext(AppContext);

    const [name, setName] = useState("Khang");
    const [email, setEmail] = useState("khangmojito1996@gmail.com");
    const [phone_number, setPhone_number] = useState("");
    const [password, setPassword] = useState("Khang1111@");

    const [hidePassword, setHidePassword] = useState(false);

    // Hàm tự động định dạng số điện thoại khi đăng nhập
    const formatPhone = (text) => {
        // Xoá tất cả các ký tự không phải số
        const cleaned = text.replace(/\D/g, "");

        let pattern;
        if (cleaned.length >= 4 && cleaned.length <= 6) {
            // Nếu số có từ 4 đến 6 chữ số, format định dạng "000 000"
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
        // Xoá tất cả các ký tự không phải số
        const cleaned = text.replace(/\D/g, "");

        // Kiểm tra số điện thoại hợp lệ
        if (cleaned.length > 10) {
            setPhone_number(cleaned);
        } else if (/^\d+$/.test(cleaned) && cleaned.length > 3) {
            setPhone_number(formatPhone(cleaned))
        } else {
            setPhone_number(text)
        }
    }
    // Hàm đăng ký
    // 
    const onSignUp = async () => {
        try {
            const body = {
                name: name,
                email: email,
                phone_number: phone_number,
                password: password
            };

            // const onSignUp = async () => {
            //     try {
            //         const body = {
            //             name,
            //             email,
            //             phone_number,
            //             password
            //         };

            // Kiểm tra mật khẩu (ít nhất 1 chữ hoa, 1 chữ thường và 1 số)
            const checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
            if (!checkPassword.test(password)) {
                Alert.alert('Sai mật khẩu', 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số');
                return;
            }

            const response = await api_signUp(body);

            if (response) {
                ToastAndroid.show('Đăng ký thành công', ToastAndroid.LONG);

                // Chuyển đến màn hình đăng nhập và truyền email + password
                navigation.navigate('Login', { email, password });
            } else {
                Alert.alert('Đăng ký thất bại', 'Email hoặc SĐT đã tồn tại');
            }
        } catch (e) {
            Alert.alert('Lỗi', 'Có lỗi xảy ra trong quá trình đăng ký.');
        }
    };
    //         const response = await api_signUp(body);

    //         if (response) {
    //             ToastAndroid.show('Đăng ký thành công', ToastAndroid.LONG);

    //             // Điều hướng sang trang đăng nhập và truyền dữ liệu
    //             navigation.navigate('Login', { email, password });
    //         } else {
    //             Alert.alert('Đăng ký thất bại', 'Email hoặc SĐT đã tồn tại');
    //         }
    //     } catch (e) {
    //         Alert.alert('Lỗi', 'Có lỗi xảy ra trong quá trình đăng ký.');
    //     }
    // };

    return (
        <ScrollView>
            <View style={Style_SignUp.container}>
                <Image
                    style={Style_SignUp.logoContainer}
                    source={require('../../assets/image/logo_app_2.png')} />


                <Text style={Style_SignUp.title}>Đăng ký</Text>

                <Text style={Style_SignUp.name}>Họ tên</Text>
                <TextInput
                    style={Style_SignUp.input}
                    value={name}
                    onChangeText={text => setName(text)}
                />

                <Text style={Style_SignUp.phone}>Số điện thoại</Text>
                <TextInput
                    style={Style_SignUp.input}
                    keyboardType='phone-pad'
                    value={phone_number}
                    onChangeText={handleChangeText}
                />

                <Text style={Style_SignUp.email}>Email</Text>
                <TextInput
                    style={Style_SignUp.input}
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <View>
                    <Text style={Style_SignUp.passs}>Mật khẩu</Text>
                </View>

                <View style={Style_SignUp.passwordContainer}>
                    <TextInput
                        style={[Style_SignUp.input, Style_SignUp.passwordInput]}
                        value={password}
                        secureTextEntry={!hidePassword}
                        onChangeText={text => setPassword(text)}
                    />
                    <TouchableOpacity
                        onPress={() => setHidePassword(!hidePassword)}>
                        <Image
                            source={hidePassword
                                ? require('../../assets/icon/icon_show.png')
                                : require('../../assets/icon/icon_show.png')}
                            style={Style_SignUp.eyeIcon} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity>
                    <Text style={Style_SignUp.forgotPassword}>Quên mật khẩu?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={Style_SignUp.loginButton}
                    onPress={() => onSignUp()}>
                    <Text style={Style_SignUp.loginButtonText}>Đăng ký</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={Style_SignUp.newUserText}>Bạn mới sử dụng GShop?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Style_SignUp.registerButton}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={Style_SignUp.registerButtonText}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}


export default Page_SignUp;
