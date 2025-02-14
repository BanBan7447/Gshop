import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import Style_Edit_Profile from '../../styles/Style_Edit_Profile';

const Page_Edit_Profile = () => {
    return (
        <View style={Style_Edit_Profile.container}>
            <View style={Style_Edit_Profile.header}>
                <Image style={Style_Edit_Profile.backIcon} source={require('../../assets/icon/icon_long_arrow.png')} />
                <Text style={Style_Edit_Profile.headerTitle}>Chỉnh sửa thông tin</Text>
            </View>
            <View style={Style_Edit_Profile.profileImageContainer}>
                <Image style={Style_Edit_Profile.profileImage} source={{uri: 'https://bizweb.dktcdn.net/100/418/981/products/z5061600085948-565e771a2f075f0e1a7056fdd81ae20a.jpg?v=1704966316290'}} />
            </View>
            <TouchableOpacity style={Style_Edit_Profile.updateButton}>
                <Image style={Style_Edit_Profile.uploadIcon} source={require('../../assets/icon/icon_upload_white.png')} />
                <Text style={Style_Edit_Profile.updateButtonText}>Cập nhật ảnh đại diện</Text>
            </TouchableOpacity>
            <View>
                <Text style={Style_Edit_Profile.label}>Họ tên</Text>
                <TextInput
                    style={Style_Edit_Profile.input}
                    placeholder="Value"
                />
            </View>
            <View>
                <Text style={Style_Edit_Profile.label}>Số điện thoại</Text>
                <TextInput
                    style={Style_Edit_Profile.input}
                    placeholder="Value"
                />
            </View>
            <View>
                <Text style={Style_Edit_Profile.label}>Email</Text>
                <TextInput
                    style={Style_Edit_Profile.input}
                    placeholder="Value"
                />
            </View>
            <TouchableOpacity style={Style_Edit_Profile.saveButton}>
                <Text style={Style_Edit_Profile.saveButtonText}>Lưu</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Page_Edit_Profile;
