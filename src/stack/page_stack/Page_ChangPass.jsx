import React, { useState, useEffect, useContext } from 'react';
import { Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Alert, ActivityIndicator } from 'react-native';
import Style_ChangPass from '../../styles/Style_ChangPass';
import { api_changePassword } from '../../helper/ApiHelper';  // Import hàm gọi API
import colors from '../../styles/colors';
import { AppContext } from '../../context';

const Page_ChangPass = ({ navigation, route }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [hideOldPassword, setHideOldPassword] = useState(true);
    const [hideNewPassword, setHideNewPassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

    const [loading, setLoading] = useState(false);
    const { users, setUsers } = useContext(AppContext);
    console.log("User đã đăng nhập: ", users)

    // Hàm kiểm tra mật khẩu có hợp lệ không
    const isPasswordValid = (password) => {
        return (
            password.length >= 8 &&
            /[A-Za-z]/.test(password) &&
            /\d/.test(password) &&
            /[#?!$&@]/.test(password)
        );
    };

    // Kiểm tra điều kiện để nút lưu mật khẩu được kích hoạt
    const isSaveButtonEnabled = () => {
        return (
            oldPassword.trim() !== '' &&
            newPassword.trim() !== '' &&
            confirmPassword.trim() !== '' &&
            newPassword === confirmPassword &&
            isPasswordValid(newPassword)
        )
    };

    // Hàm đổi mật khẩu
    const handleChangePassword = async () => {
        setLoading(true);
        try {
            const response = await api_changePassword({
                user_id: users?._id,
                oldPassword: oldPassword,
                newPassword: newPassword
            });

            if (response.status) {
                Alert.alert("Thành công", "Mật khẩu đã được thay đổi!", [
                    { text: "OK", onPress: () => navigation.goBack() }
                ]);
            } else {
                if (users.password !== oldPassword) {
                    Alert.alert("Lỗi", "Mật khẩu cũ bạn nhập không chính xác. Vui lòng thử lại.");
                } else {
                    Alert.alert("Lỗi", response.message || "Đổi mật khẩu không thành công.");
                }
            }
        } catch (error) {
            console.log("Lỗi đổi mật khẩu:", error);
            Alert.alert("Lỗi", "Có lỗi xảy ra, vui lòng thử lại sau.");
        } finally{
            setLoading(false);
        }
    };

    // Kiểm tra từng phần của mật khẩu mới
    const isMinLength = newPassword.length >= 8;
    const isLetterAndNumber = /[A-Za-z]/.test(newPassword) && /\d/.test(newPassword);
    const isSpecialChar = /[#?!$&@]/.test(newPassword);

    return (
        <View style={Style_ChangPass.container}>
            <TouchableOpacity style={Style_ChangPass.header} onPress={() => navigation.goBack()}>
                <Image style={Style_ChangPass.backIcon} source={require('../../assets/icon/icon_long_arrow.png')} />
                <Text style={Style_ChangPass.headerTitle}>Bảo mật</Text>
            </TouchableOpacity>

            <Text style={Style_ChangPass.title}>Thay đổi mật khẩu</Text>

            <View style={Style_ChangPass.inputContainer}>
                <TextInput
                    placeholder="Nhập mật khẩu cũ"
                    style={Style_ChangPass.textInput}
                    secureTextEntry={hideOldPassword}
                    value={oldPassword}
                    onChangeText={setOldPassword}
                />
                <TouchableOpacity onPress={() => setHideOldPassword(!hideOldPassword)}>
                    <Image
                        source={
                            hideOldPassword
                                ? require('../../assets/icon/icon_hide.png')
                                : require('../../assets/icon/icon_show.png')
                        }
                        style={Style_ChangPass.eyeIcon}
                    />
                </TouchableOpacity>
            </View>


            <View style={Style_ChangPass.inputContainer}>
                <TextInput
                    placeholder="Nhập mật khẩu mới"
                    style={Style_ChangPass.textInput}
                    secureTextEntry={hideNewPassword}
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                <TouchableOpacity onPress={() => setHideNewPassword(!hideNewPassword)}>
                    <Image
                        source={hideNewPassword
                            ? require('../../assets/icon/icon_hide.png')
                            : require('../../assets/icon/icon_show.png')}
                        style={Style_ChangPass.eyeIcon}
                    />
                </TouchableOpacity>
            </View>

            <View style={Style_ChangPass.inputContainer}>
                <TextInput
                    placeholder="Xác nhận mật khẩu mới"
                    style={Style_ChangPass.textInput}
                    secureTextEntry={hideConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity onPress={() => setHideConfirmPassword(!hideConfirmPassword)}>
                    <Image
                        source={hideConfirmPassword
                            ? require('../../assets/icon/icon_hide.png')
                            : require('../../assets/icon/icon_show.png')}
                        style={Style_ChangPass.eyeIcon}
                    />
                </TouchableOpacity>
            </View>

            <Text style={Style_ChangPass.infoText}>Mật khẩu của bạn phải bao gồm:</Text>
            <View style={Style_ChangPass.listItem}>
                <Image
                    style={Style_ChangPass.tickIcon}
                    source={isMinLength
                        ? require('../../assets/icon/icon_tick_green.png')
                        : require('../../assets/icon/icon_tick.png')
                    } />
                <Text
                    style={[Style_ChangPass.listText, isMinLength && { color: colors.Green }]}>
                    Ít nhất 8 ký tự
                </Text>
            </View>

            <View style={Style_ChangPass.listItem}>
                <Image
                    style={Style_ChangPass.tickIcon}
                    source={isLetterAndNumber
                        ? require('../../assets/icon/icon_tick_green.png')
                        : require('../../assets/icon/icon_tick.png')
                    } />

                <Text
                    style={[Style_ChangPass.listText, isLetterAndNumber && { color: colors.Green }]}>
                    1 chữ cái và 1 số
                </Text>
            </View>

            <View style={Style_ChangPass.listItem}>
                <Image
                    style={Style_ChangPass.tickIcon}
                    source={isSpecialChar
                        ? require('../../assets/icon/icon_tick_green.png')
                        : require('../../assets/icon/icon_tick.png')
                    } />

                <Text
                    style={[Style_ChangPass.listText, isSpecialChar && { color: colors.Green }]}>
                    1 ký tự đặc biệt (# ? ! $ & @)
                </Text>
            </View>

            <TouchableOpacity
                style={[Style_ChangPass.saveButton, { opacity: isSaveButtonEnabled() ? 1 : 0.5 }]}
                onPress={handleChangePassword}
                disabled={!isSaveButtonEnabled()}>
                {
                    loading ? (
                        <ActivityIndicator size='small' color={colors.White}/>
                    ) : (
                        <Text style={Style_ChangPass.saveButtonText}>Lưu mật khẩu mới</Text>
                    )
                }
            </TouchableOpacity>
        </View>
    );
};

export default Page_ChangPass;
