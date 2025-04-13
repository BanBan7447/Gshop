import { View, Text, TouchableOpacity, Image, TextInput, Alert, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Style_Search from '../../styles/Style_Search'
import Style_Find_Email from '../../styles/Style_Find_Email'
import { api_sendOTP } from '../../helper/ApiHelper'
import colors from '../../styles/colors'

const Page_Find_Email = (props) => {
    const { navigation } = props
    const [email, setEmail] = useState("phongntps37397@fpt.edu.vn");

    const sendOTP = async () => {
        if (!email) {
            Alert.alert("Cảnh báo", "Vui lòng nhập email để nhận mã xác minh");
            return;
        }

        try {
            const response = await api_sendOTP(email);
            console.log("Data OTP: ", response)
            if (response?.status) {
                const code = response.code;
                ToastAndroid.show("Gửi mã OTP thành công", ToastAndroid.SHORT);
                navigation.navigate("VerityOTP", { email });
            } else {
                Alert.alert("Lỗi", response.message || "Gửi mã OTP thất bại");
            }
        } catch (e) {
            Alert.alert("Lỗi", "Tìm email thất bại")
        }

        // navigation.navigate("VerityOTP", { email });
    }

    return (
        <View style={Style_Find_Email.container}>
            <TouchableOpacity
                style={Style_Find_Email.navigation}
                onPress={() => navigation.goBack()}>
                <Image
                    source={require('../../assets/icon/icon_long_arrow.png')}
                    style={Style_Find_Email.img_icon} />

                <Text style={Style_Find_Email.text_navigation}>Quay lại</Text>
            </TouchableOpacity>

            <Text style={Style_Find_Email.title}>Tìm tài khoản</Text>
            <Text style={Style_Find_Email.label}>Nhập địa chỉ email của bạn</Text>
            <TextInput
                style={Style_Find_Email.text_input}
                placeholder='Email'
                placeholderTextColor={colors.Black}
                value={email}
                onChangeText={setEmail} />

            <TouchableOpacity
                style={Style_Find_Email.btn_next}
                onPress={() => sendOTP()}>
                <Text style={Style_Find_Email.text_next}>Tiếp tục</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Page_Find_Email