import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, ToastAndroid, Alert, ScrollView, ActivityIndicator } from 'react-native';
import Style_SignUp from '../../styles/Style_SignUp';
import { api_getAllUser, api_signUp } from '../../helper/ApiHelper';
import { AppContext } from '../../context';
import colors from '../../styles/colors';
import Style_ForgotPass from '../../styles/Style_ForgotPass';
import Style_Login from '../../styles/Style_Login';

const Page_SignUp = (props) => {
    const { navigation } = props;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);

    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [passError, setPassError] = useState("");
    const [loading, setLoading] = useState(false);

    const isFormValid =
        name.trim() !== "" &&
        email.trim() !== "" &&
        phone_number.trim() !== "" &&
        password.trim() !== "" &&
        emailError === "" &&
        phoneError === "" &&
        passError.length === 0;


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

    const validateEmail = (text) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(text)) {
            setEmailError("Email không hợp lệ");
        } else {
            setEmailError("");
        }
        setEmail(text);
    };

    const validatePhoneNumber = (text) => {
        const cleaned = text.replace(/\D/g, "");
        if (cleaned.length !== 10) {
            setPhoneError("Số điện thoại phải có đúng 10 số");
        } else {
            setPhoneError("");
        }
        setPhone_number(text);
        //setPhone_number(formatPhone(cleaned));
    };

    const validatePassword = (text) => {
        const hasUpperCase = /[A-Za-z]/.test(text) && /\d/.test(text);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(text);
        const isValidLength = text.length >= 8;

        let errors = [];

        if (!isValidLength) errors.push("• Ít nhất 8 ký tự");
        if (!hasUpperCase) errors.push("• 1 chữ cái và 1 số");
        if (!hasSpecialChar) errors.push("• 1 ký tự đặc biệt (# ? ! $ & @)");

        if (errors.length > 0) {
            setPassError(["Mật khẩu không hợp lệ:", ...errors]);
        } else {
            setPassError([]);
        }

        setPassword(text);
    };


    // Hàm đăng ký
    const onSignUp = async () => {
        validateEmail(email);
        validatePhoneNumber(phone_number);
        validatePassword(password);

        setLoading(true);
        try {
            const body = {
                name: name,
                email: email,
                phone_number: phone_number,
                password: password
            };

            const response = await api_signUp(body);

            if (response) {
                ToastAndroid.show('Đăng ký thành công', ToastAndroid.LONG);
                navigation.navigate('Login', { email, password });
            }else{
                Alert.alert("Lỗi đăng ký", "Email hoặc Số điện thoại đã được đăng ký trước đó");
            }
        } catch (e) {
            Alert.alert('Lỗi', 'Có lỗi xảy ra trong quá trình đăng ký.');
        } finally{
            setLoading(false);
        }
    };


    return (
        <ScrollView style={{ backgroundColor: colors.White }}>
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
                    onChangeText={validatePhoneNumber}
                />
                {phoneError ? <Text style={Style_SignUp.error}>{phoneError}</Text> : null}

                <Text style={Style_SignUp.email}>Email</Text>
                <TextInput
                    style={Style_SignUp.input}
                    value={email}
                    onChangeText={validateEmail}
                />
                {emailError ? <Text style={Style_SignUp.error}>{emailError}</Text> : null}

                <Text style={Style_Login.label}>Mật khẩu</Text>
                <View style={Style_ForgotPass.inputContainer}>
                    <TextInput
                        style={Style_ForgotPass.textInput}
                        secureTextEntry={hidePassword}
                        value={password}
                        onChangeText={validatePassword}
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
                {/* {passError ? <Text style={Style_SignUp.error}>{passError}</Text> : null} */}

                {passError.length > 0 && (
                    <View style={{ marginTop: 8 }}>
                        {passError?.map((err, index) => (
                            <Text key={index} style={{ color: 'red', marginBottom: 4 }}>
                                {err}
                            </Text>
                        ))}
                    </View>
                )}


                <TouchableOpacity
                    style={[
                        Style_SignUp.registerButton,
                        !isFormValid && { backgroundColor: '#ccc' } // đổi màu xám nếu form chưa hợp lệ
                    ]}
                    disabled={!isFormValid}
                    onPress={onSignUp}
                >
                    {
                        loading ? (
                            <ActivityIndicator size='small' color={colors.White}/>
                        ) : (
                            <Text style={Style_SignUp.registerButtonText}>Đăng ký</Text>
                        )
                    }
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={Style_SignUp.newUserText}>Bạn mới sử dụng GShop?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Style_SignUp.loginButton}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={Style_SignUp.loginButtonText}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}


export default Page_SignUp;
