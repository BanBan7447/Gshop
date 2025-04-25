import { View, Text, TouchableOpacity, Image, ActivityIndicator, Alert, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'
import Style_Find_Email from '../../styles/Style_Find_Email';
import Style_Verify_OTP from '../../styles/Style_Verify_OTP';
import { AppContext } from '../../context';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import colors from '../../styles/colors';
import { api_verifyOTP } from '../../helper/ApiHelper';
const CELL_COUNT = 6;

const Page_Verify_OTP = ({ navigation, route }) => {
    const { email, otpCode } = route.params;
    const { users } = useContext(AppContext);
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    console.log("Email: ", email)
    console.log("Mã otp: ", otpCode)

    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const handleVerityfyOTP = async () => {
        if (value.length !== 6) {
            Alert.alert("Lỗi xác nhận", "Mã OTP phải đủ 6 chữ số");
            return;
        };

        // if (value === otpCode) {
        //     ToastAndroid.show("Xác nhận thành công", ToastAndroid.SHORT);
        //     navigation.navigate("ForgotPass", { email });
        // } else {
        //     Alert.alert("Cảnh báo", "Mã xác nhận không hợp lệ");
        // }

        setLoading(true);
        try {
            const response = await api_verifyOTP(email, value);
            console.log("Email: ", email);
            console.log("Mã xác nhận nhập vào: ", value);
        
            if (response?.status) {
                ToastAndroid.show("Xác nhận thành công", ToastAndroid.SHORT);
                navigation.navigate("ForgotPass", { email });
            } else {
                Alert.alert("Cảnh báo", response?.message || "Mã xác nhận không hợp lệ");
            }
        } catch (e) {
            Alert.alert("Thông báo", "Xác minh thất bại");
            console.log("Lỗi xác minh OTP:", e);
        } finally{
            setLoading(false);
        }
        
        // navigation.navigate("ForgotPass", { email });
    };

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

            <Text style={Style_Find_Email.title}>Nhập mã xác gồm 6 số</Text>
            <Text style={Style_Find_Email.label}>Để đặt lại mật khẩu, hãy nhập mã 6 chữ số đã được gửi đến mail {'\n'}<Text style={{ color: colors.Blue }}>{email}</Text></Text>

            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={Style_Verify_OTP.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <View
                        key={index}
                        style={[Style_Verify_OTP.cell, isFocused && Style_Verify_OTP.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        <Text style={Style_Verify_OTP.cellText}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    </View>
                )} />

            <TouchableOpacity
                onPress={handleVerityfyOTP}
                style={[Style_Verify_OTP.btnVerity, loading && { opacity: 0.5 }]}
                disabled={loading}>
                {
                    loading ? (
                        <ActivityIndicator size='small' color={colors.White} />
                    ) : (
                        <Text style={Style_Verify_OTP.textVerity}>Xác nhận</Text>
                    )
                }
            </TouchableOpacity>
        </View>
    )
}

export default Page_Verify_OTP