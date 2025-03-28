import React, { useState, useEffect, useContext } from 'react';
import { Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import Style_ChangPass from '../../styles/Style_ChangPass';
import { api_changePassword } from '../../helper/ApiHelper';  // Import hàm gọi API
import colors from '../../styles/colors';
import { AppContext } from '../../context';

const Page_ChangPass = ({ navigation, route }) => {
    const [email, setEmail] = useState(users?.email);
    const [userId, setUserId] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const { users, setUsers } = useContext(AppContext);


    // Lấy thông tin email và userId từ props hoặc AsyncStorage (tuỳ cách bạn lưu trữ)
    useEffect(() => {
        if (route.params?.email && route.params?.userId) {
            setEmail(route.params.email);
            setUserId(route.params.userId);
            ToastAndroid.show(`Email: ${route.params.email}`, ToastAndroid.SHORT);
        }
    }, [route.params]);

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
            Alert.alert('Lỗi', 'Mật khẩu chưa đáp ứng đủ yêu cầu.');
            return;
        }

        const response = await api_changePassword(userId, email, newPassword);
        if (response.status) {
            ToastAndroid.show('Đổi mật khẩu thành công!', ToastAndroid.SHORT);
            navigation.goBack();
        } else {
            Alert.alert('Lỗi', response.message);
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
