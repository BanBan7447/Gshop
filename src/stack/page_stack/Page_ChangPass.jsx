import React, { useState } from 'react';
import { Image, Text, View, TextInput, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Style_ChangPass from '../../styles/Style_ChangPass';
import { api_changePassword } from '../../helper/ApiHelper';

const Page_ChangPass = ({ navigation }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);

    // Hàm xử lý đổi mật khẩu
    const handleChangePassword = async () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu nhập lại không khớp');
            return;
        }
        if (newPassword.length < 8) {
            Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 8 ký tự');
            return;
        }

        try {
            const userInfo = await AsyncStorage.getItem('userInfo');
            const user = JSON.parse(userInfo);
            if (!user || !user._id) {
                Alert.alert('Lỗi', 'Không tìm thấy thông tin tài khoản');
                return;
            }

            const data = {
                userId: user._id,
                newPassword,
                confirmPassword
            };

            const response = await api_changePassword(data);
            if (response && response.status) {
                ToastAndroid.show('Đổi mật khẩu thành công', ToastAndroid.LONG);
                navigation.goBack();
            } else {
                Alert.alert('Lỗi', 'Không thể đổi mật khẩu, vui lòng thử lại');
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi đổi mật khẩu');
            console.error(error);
        }
    };

    return (
        <View style={Style_ChangPass.container}>
            <TouchableOpacity style={Style_ChangPass.header} onPress={() => navigation.goBack()}>
                <Image style={Style_ChangPass.backIcon} source={require('../../assets/icon/icon_long_arrow.png')} />
                <Text style={Style_ChangPass.headerTitle}>Bảo mật</Text>
            </TouchableOpacity>

            <Text style={Style_ChangPass.title}>Thay đổi mật khẩu</Text>

            <View style={Style_ChangPass.inputContainer}>
                <TextInput
                    placeholder='Nhập mật khẩu mới'
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

            <View style={Style_ChangPass.inputContainer}>
                <TextInput
                    placeholder='Nhập lại mật khẩu mới'
                    style={Style_ChangPass.textInput}
                    secureTextEntry={hidePassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
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
