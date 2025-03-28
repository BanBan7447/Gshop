import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import Style_Edit_Profile from '../../styles/Style_Edit_Profile';
import { api_updateProfile, api_uploadAvatar } from '../../helper/ApiHelper';
import { AppContext } from '../../context';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Page_Edit_Profile = (props) => {
    const { navigation } = props
    const { users, setUsers } = useContext(AppContext);
    const [name, setName] = useState(users?.name);
    const [email, setEmail] = useState(users?.email);
    const [phone_number, setPhone] = useState(users?.phone_number);

    const [avatar, setAvatar] = useState(users?.avatar);
    const [loading, setLoading] = useState(false);

    // Chọn ảnh từ thư viện
    const pickAvatar = () => {
        const options = {
            mediaType: "photo",
            maxWidth: 1024,
            maxHeight: 1024,
            quality: 1,
        };

    launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log("Người dùng đã hủy chọn ảnh");
            } else if (response.errorMessage) {
                console.log("Lỗi khi chọn ảnh: ", response.errorMessage);
            } else {
                const image = response.assets[0].uri;
                setAvatar(image);
            }
        })
    };

    // Cập nhật thông tin user
    const updateProfile = async () => {
        setLoading(true);

        try {
            // Gọi API cập nhật thông tin người dùng
            const profileResponse = await api_updateProfile(email, name, phone_number);
            console.log("Cập nhật thông tin: ", profileResponse);

            if (profileResponse?.status !== true) {
                throw new Error("Cập nhật thông tin thất bại");
            };

            let newAvatar = users.avatar;

            // Nếu có ảnh thì upload ảnh
            if (avatar && avatar !== users.avatar) {
                const avatarResponse = await api_uploadAvatar(users._id, avatar);
                console.log("Upload ảnh avatar: ", avatarResponse);

                if (!avatarResponse?.status) {
                    throw new Error("Tải ảnh thất bại");
                };

                newAvatar = avatarResponse.data.avatar;
            };

            // Cập nhật dữ liệu
            const updateUser = {
                ...users,
                name,
                email,
                phone_number,
                avatar: newAvatar,
            }
            setUsers(updateUser);

            // setUsers((prev) => ({
            //     ...prev,
            //     name,
            //     email,
            //     phone_number,
            //     avatar: newAvatar,
            // }));

            // Lưu vào AsyncStorage
            await AsyncStorage.setItem('userInfo', JSON.stringify(updateUser))

            ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
            navigation.goBack();
        } catch (e) {
            console.log("Lỗi:", e);
            Alert.alert("Lỗi", e.message || "Đã có lỗi xảy ra!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={Style_Edit_Profile.container}>
            <TouchableOpacity style={Style_Edit_Profile.header}
                onPress={() => navigation.navigate('Tab', { screen: 'Profile' })}>

                <Image style={Style_Edit_Profile.backIcon} source={require('../../assets/icon/icon_long_arrow.png')} />
                <Text style={Style_Edit_Profile.headerTitle}>Chỉnh sửa thông tin</Text>
            </TouchableOpacity>
            <View style={Style_Edit_Profile.profileImageContainer}>
                <Image source={avatar ? { uri: avatar } : require("../../assets/icon/icon_deafult_profile.png")}
                    style={Style_Edit_Profile.profileImage} />
            </View>
            <TouchableOpacity
                style={Style_Edit_Profile.updateButton}
                onPress={pickAvatar}>
                <Image style={Style_Edit_Profile.uploadIcon} source={require('../../assets/icon/icon_upload_white.png')} />
                <Text style={Style_Edit_Profile.updateButtonText}>Cập nhật ảnh đại diện</Text>
            </TouchableOpacity>

            <View>
                <Text style={Style_Edit_Profile.label}>Họ tên</Text>
                <TextInput
                    style={Style_Edit_Profile.input}
                    placeholder="Nhập tên"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <View>
                <Text style={Style_Edit_Profile.label}>Số điện thoại</Text>
                <TextInput
                    style={Style_Edit_Profile.input}
                    placeholder="Nhập số điện thoại"
                    value={phone_number}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />
            </View>

            <View>
                <Text style={Style_Edit_Profile.label}>Email</Text>
                <TextInput
                    style={Style_Edit_Profile.input}
                    placeholder="Nhập email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>

            <TouchableOpacity
                style={Style_Edit_Profile.saveButton}
                onPress={updateProfile}
                disabled={loading}>
                <Text style={Style_Edit_Profile.saveButtonText}>Cập nhật</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Page_Edit_Profile;
