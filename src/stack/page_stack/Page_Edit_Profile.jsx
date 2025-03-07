import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import Style_Edit_Profile from '../../styles/Style_Edit_Profile';
import { api_updateProfile } from '../../helper/ApiHelper';
import { AppContext } from '../../context';

const Page_Edit_Profile = (props) => {
    const { navigation } = props
    const { users, setUsers } = useContext(AppContext); // Thêm setUsers để cập nhật context

    const [name, setName] = useState(users?.name);
    const [email, setEmail] = useState(users?.email);
    const [phone_number, setPhone] = useState(users?.phone_number);
    
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


    return (
        <View style={Style_Edit_Profile.container}>
            <View style={Style_Edit_Profile.header}>
                <Image style={Style_Edit_Profile.backIcon} source={require('../../assets/icon/icon_long_arrow.png')} />
                <Text style={Style_Edit_Profile.headerTitle}>Chỉnh sửa thông tin</Text>
            </View>
            <View style={Style_Edit_Profile.profileImageContainer}>
                <Image style={Style_Edit_Profile.profileImage} source={{ uri: 'https://bizweb.dktcdn.net/100/418/981/products/z5061600085948-565e771a2f075f0e1a7056fdd81ae20a.jpg?v=1704966316290' }} />
            </View>
            <TouchableOpacity style={Style_Edit_Profile.updateButton}>
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
