import React, { useState, useEffect, useContext } from 'react';
import { Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import Style_ChangPass from '../../styles/Style_ChangPass';
import { api_changePassword } from '../../helper/ApiHelper';  // Import hàm gọi API
import colors from '../../styles/colors';
import { AppContext } from '../../context';

const Page_ChangPass = ({ navigation, route }) => {
    const [newPassword, setNewPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const { users, setUsers } = useContext(AppContext);

    // Hàm kiểm tra mật khẩu có hợp lệ không
    const isPasswordValid = (password) => {
        return (
            password.length >= 8 &&
            /[A-Za-z]/.test(password) &&
            /\d/.test(password) &&
            /[#?!$&@]/.test(password)
        );
    };

    // Hàm đổi mật khẩu
    const handleChangePassword = async () => {
        if (!isPasswordValid(newPassword)) {
            Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái, số và ký tự đặc biệt.");
            return;
        }

        try {
            const response = await api_changePassword({
                user_id: users?._id,
                email: users?.email,
                newPassword: newPassword
            });

            if (response.status) {
                Alert.alert("Thành công", "Mật khẩu đã được thay đổi!", [
                    { text: "OK", onPress: () => navigation.goBack() }
                ]);
            } else {
                Alert.alert("Thất bại", response.message || "Đổi mật khẩu không thành công, vui lòng thử lại.");
            }
        } catch (error) {
            console.log("Lỗi đổi mật khẩu:", error);
            Alert.alert("Lỗi", "Có lỗi xảy ra, vui lòng thử lại sau.");
        }
    };

    return (
        <View style={Style_ChangPass.container}>
            <TouchableOpacity style={Style_ChangPass.header} onPress={() => navigation.goBack()}>
                <Image style={Style_ChangPass.backIcon} source={require('../../assets/icon/icon_long_arrow.png')} />
                <Text style={Style_ChangPass.headerTitle}>Bảo mật</Text>
            </TouchableOpacity>

            <Text style={Style_ChangPass.title}>Thay đổi mật khẩu</Text>

            {/* Hiển thị Email */}
            <View style={Style_ChangPass.inputContainer}>
                <TextInput value={users?.email} editable={false} style={Style_ChangPass.textInput} />
            </View>

            {/* Nhập mật khẩu mới */}
            <View style={Style_ChangPass.inputContainer}>
                <TextInput
                    placeholder="Nhập mật khẩu mới"
                    style={Style_ChangPass.textInput}
                    secureTextEntry={hidePassword}
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                    <Image
                        source={hidePassword
                            ? require('../../assets/icon/icon_hide.png')
                            : require('../../assets/icon/icon_show.png')}
                        style={Style_ChangPass.eyeIcon}
                    />
                </TouchableOpacity>
            </View>

            {/* Tiêu chí mật khẩu */}
            <Text style={Style_ChangPass.infoText}>Mật khẩu của bạn phải bao gồm:</Text>
            <View style={Style_ChangPass.listItem}>
                <Image style={Style_ChangPass.tickIcon} source={require('../../assets/icon/icon_tick.png')} />
                <Text style={Style_ChangPass.listText}>Ít nhất 8 ký tự</Text>
            </View>
            <View style={Style_ChangPass.listItem}>
                <Image style={Style_ChangPass.tickIcon} source={require('../../assets/icon/icon_tick.png')} />
                <Text style={Style_ChangPass.listText}>1 chữ cái và 1 số</Text>
            </View>
            <View style={Style_ChangPass.listItem}>
                <Image style={Style_ChangPass.tickIcon} source={require('../../assets/icon/icon_tick.png')} />
                <Text style={Style_ChangPass.listText}>1 ký tự đặc biệt (# ? ! $ & @)</Text>
            </View>

            <View style={Style_ChangPass.container_bottom}>
                <TouchableOpacity style={Style_ChangPass.saveButton} onPress={handleChangePassword}>
                    <Text style={Style_ChangPass.saveButtonText}>Lưu mật khẩu mới</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Page_ChangPass;
