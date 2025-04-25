import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ToastAndroid, ScrollView, ActivityIndicator } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import Style_Edit_Profile from '../../styles/Style_Edit_Profile';
import { api_updateProfile, api_uploadAvatar } from '../../helper/ApiHelper';
import { AppContext } from '../../context';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../styles/colors';

const Page_Edit_Profile = (props) => {
    const { navigation } = props
    const { users, setUsers } = useContext(AppContext);
    const [name, setName] = useState(users?.name);
    const [email, setEmail] = useState(users?.email);
    const [phone_number, setPhone] = useState(users?.phone_number);

    const [avatar, setAvatar] = useState(users?.avatar);
    const [loading, setLoading] = useState(false);

    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");

    const validateEmail = (text) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(text)) {
            setEmailError("Email không hợp lệ");
        } else {
            setEmailError("");
        }
        setEmail(text);
    };

    const validatePhone = (text) => {
        const cleaned = text.replace(/\D/g, "");
        if (cleaned.length !== 10) {
            setPhoneError("Số điện thoại phải có đúng 10 số");
        } else {
            setPhoneError("");
        }
        setPhone(text);
    }

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
        if (emailError || phoneError) {
            Alert.alert("Lỗi cập nhật", "Vui lòng kiểm tra lại thông tin nhập vào và thử lại.");
            return;
        }

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
        <ScrollView style={Style_Edit_Profile.container}>
            <TouchableOpacity style={Style_Edit_Profile.header}
                onPress={() => navigation.goBack()}>

                <Image style={Style_Edit_Profile.backIcon} source={require('../../assets/icon/icon_long_arrow.png')} />
                <Text style={Style_Edit_Profile.headerTitle}>Chỉnh sửa thông tin</Text>
            </TouchableOpacity>
            <View style={Style_Edit_Profile.profileImageContainer}>
                <Image
                    source={
                        avatar && (avatar.startsWith("https") || avatar.startsWith("file") || avatar.startsWith("content"))
                            ? { uri: avatar }
                            : require("../../assets/icon/icon_deafult_profile.png")
                    }
                    style={Style_Edit_Profile.profileImage}
                />

            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 24 }}>
                <TouchableOpacity
                    style={Style_Edit_Profile.updateButton}
                    onPress={pickAvatar}>
                    <Image style={Style_Edit_Profile.uploadIcon} source={require('../../assets/icon/icon_upload_white.png')} />
                    <Text style={Style_Edit_Profile.updateButtonText}>Cập nhật ảnh đại diện</Text>
                </TouchableOpacity>
            </View>

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
                    onChangeText={validatePhone}
                    keyboardType="phone-pad"
                />
                {phoneError ? <Text style={Style_Edit_Profile.error}>{phoneError}</Text> : null}
            </View>

            <View>
                <Text style={Style_Edit_Profile.label}>Email</Text>
                <TextInput
                    style={Style_Edit_Profile.input}
                    placeholder="Nhập email"
                    value={email}
                    onChangeText={validateEmail}
                    keyboardType="email-address"
                    editable={false}
                />
                {emailError ? <Text style={Style_Edit_Profile.error}>{emailError}</Text> : null}
            </View>

            <TouchableOpacity
                style={Style_Edit_Profile.saveButton}
                onPress={updateProfile}
                disabled={loading}>
                {
                    loading ? (
                        <ActivityIndicator size='small' color={colors.White}/>
                    ) : (
                        <Text style={Style_Edit_Profile.saveButtonText}>Cập nhật</Text>
                    )
                }
            </TouchableOpacity>
        </ScrollView>
    );
};

export default Page_Edit_Profile;
