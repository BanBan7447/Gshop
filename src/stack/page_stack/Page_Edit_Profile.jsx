import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import Style_Edit_Profile from '../../styles/Style_Edit_Profile';
import { api_updateProfile, api_uploadAvatar } from '../../helper/ApiHelper';
import { AppContext } from '../../context';
import { Axios } from 'axios';
import AxiosInstance from '../../helper/AxiosInstance';




const Page_Edit_Profile = (props) => {
    const { navigation } = props
    const { users, setUsers } = useContext(AppContext); // Thêm setUsers để cập nhật context
    const { launchImageLibrary } = require('react-native-image-picker');

    const [name, setName] = useState(users?.name);
    const [email, setEmail] = useState(users?.email);
    const [phone_number, setPhone] = useState(users?.phone_number);

    const [imageUri, setImageUri] = useState(null);
    const [avatar, setAvatar] = useState(users?.avatar || null);

    // Truyền dữ liệu cập nhật thông tin
    const handleUpdateProfile = async () => {
        if (!email || !name || !phone_number) {
            Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin!");
            return;
        }

        try {
            const response = await api_updateProfile(email, name, phone_number); // Truyền dữ liệu vào API

            console.log('email: ', email)
            console.log('name: ', name)
            console.log('phone: ', phone_number)

            if (response?.status === true) {
                Alert.alert("Thành công", "Cập nhật thông tin thành công!");

                // Cập nhật lại dữ liệu trong Context để các component khác nhận giá trị mới
                setUsers((prev) => ({
                    ...prev,
                    name: name,
                    email: email,
                    phone_number: phone_number,
                }));

                navigation.goBack(); // Quay về màn trước
            } else {
                Alert.alert("Lỗi", "Cập nhật thất bại, vui lòng thử lại!");
            }
        } catch (error) {
            console.log("Lỗi cập nhật thông tin:", error);
            Alert.alert("Lỗi", "Đã có lỗi xảy ra!");
        }
    };


    // // Hàm chọn ảnh từ thư viện
    // const handleChoosePhoto = () => {
    //     const options = {
    //         mediaType: 'photo',
    //         quality: 1,
    //     };
    //     launchImageLibrary(options, (response) => {
    //         if (response.didCancel) {
    //             console.log("Người dùng đã hủy chọn ảnh");
    //         } else if (response.errorMessage) {
    //             console.error("Lỗi chọn ảnh:", response.errorMessage);
    //         } else {
    //             setAvatar(response.assets[0].uri);
    //             handleUploadAvatar(response.assets[0].uri); // Tự động tải ảnh lên sau khi chọn
    //         }
    //     });
    // };

    // // Hàm tải ảnh lên server
    // const handleUploadAvatar = async (imageUri) => {
    //     if (!imageUri) {
    //         Alert.alert("Lỗi", "Vui lòng chọn ảnh trước khi tải lên!");
    //         return;
    //     }

    //     try {
    //         const response = await api_uploadAvatar(users.id, { uri: imageUri });

    //         if (response?.status === true) {
    //             Alert.alert("Thành công", "Cập nhật ảnh đại diện thành công!");
    //             setUsers((prev) => ({ ...prev, avatar: response.avatar_url }));
    //         } else {
    //             Alert.alert("Lỗi", "Cập nhật ảnh thất bại, vui lòng thử lại!");
    //         }
    //     } catch (error) {
    //         console.log("Lỗi tải ảnh:", error);
    //         Alert.alert("Lỗi", "Đã có lỗi xảy ra!");
    //     }
    // };

    // const pickImage = () => {
    //     const options = {
    //         mediaType: "photo",
    //         quality: 1,
    //     };

    //     launchImageLibrary(options, (response) => {
    //         if (response.didCancel) {
    //             console.log("Người dùng đã hủy chọn ảnh");
    //         } else if (response.errorMessage) {
    //             console.error("Lỗi chọn ảnh:", response.errorMessage);
    //         } else {
    //             setImageUri(response.assets[0].uri);
    //         }
    //     });
    // };

    // const handleUpload = async () => {
    //     if (imageUri) {
    //         const response = await uploadAvatar(userId, imageUri);
    //         console.log("Kết quả upload:", response);
    //     }
    // };

    // Gọi API lấy avatar mới sau khi cập nhật
    const fetchAvatar = async () => {
        try {
            const axiosInstance = AxiosInstance(); // Gọi hàm AxiosInstance đúng cách
            const response = await axiosInstance.get(`/get-user/${userId}`);
            if (response.data.status && response.data.data.avatar) {
                setImageUri(response.data.data.avatar);
            }
        } catch (error) {
            console.error("Lỗi lấy avatar:", error);
        }
    };

    const pickAndUploadImage = () => {
        const options = { mediaType: "photo", quality: 1 };

        launchImageLibrary(options, async (response) => {
            if (response.didCancel) {
                console.log("Người dùng đã hủy chọn ảnh");
            } else if (response.errorMessage) {
                console.error("Lỗi chọn ảnh:", response.errorMessage);
            } else {
                const uri = response.assets[0].uri;
                setImageUri(uri);

                // Gửi ảnh lên server
                const uploadResponse = await api_uploadAvatar(userId, imageUri);
                console.log("Kết quả upload:", uploadResponse);

                if (uploadResponse.status) {
                    Alert.alert("Thành công", "Ảnh đại diện đã được cập nhật!");
                    fetchAvatar(); // Gọi API lấy avatar mới sau khi upload thành công
                } else {
                    Alert.alert("Lỗi", "Không thể tải lên ảnh đại diện.");
                }
            }
        });
    };

    // Lấy avatar ban đầu khi component được mount
    useEffect(() => {
        fetchAvatar();
    }, []);


    return (
        <View style={Style_Edit_Profile.container}>
            <TouchableOpacity style={Style_Edit_Profile.header}
                onPress={() => navigation.navigate('Tab', { screen: 'Profile' })}>

                <Image style={Style_Edit_Profile.backIcon} source={require('../../assets/icon/icon_long_arrow.png')} />
                <Text style={Style_Edit_Profile.headerTitle}>Chỉnh sửa thông tin</Text>
            </TouchableOpacity>
            <View style={Style_Edit_Profile.profileImageContainer}>
                {/* <Image
                        style={Style_Edit_Profile.profileImage}
                        source={{ uri: 'https://bizweb.dktcdn.net/100/418/981/products/z5061600085948-565e771a2f075f0e1a7056fdd81ae20a.jpg?v=1704966316290' }} /> */}

                {imageUri && <Image source={{ uri: imageUri }} style={Style_Edit_Profile.profileImage} />}
            </View>
            <TouchableOpacity
                style={Style_Edit_Profile.updateButton}
                onPress={pickAndUploadImage} // Khi nhấn vào, chọn ảnh từ thư viện
            >
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
                onPress={handleUpdateProfile}>
                <Text style={Style_Edit_Profile.saveButtonText}>Lưu</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Page_Edit_Profile;
