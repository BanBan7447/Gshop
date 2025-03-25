import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { api_updateAddress, api_deleteAddress } from '../../helper/ApiHelper';
import Style_Edit_Address from '../../styles/Style_Edit_Address';

const Page_Edit_Address = (props) => {
    const { navigation, route } = props;
    const { address } = route.params; // Nhận dữ liệu địa chỉ từ màn trước

    const [detail, setDetail] = useState(address.detail);
    const [commune, setCommune] = useState(address.commune);
    const [district, setDistrict] = useState(address.district);
    const [province, setProvince] = useState(address.province);

    const handleUpdateAddress = async () => {
        const response = await api_updateAddress(address._id, detail, commune, district, province, address.id_user);
        if (response) {
            Alert.alert("Thành công", "Địa chỉ đã được cập nhật!", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);
        }
    };
    
    const handleDeleteAddress = async () => {
        Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa địa chỉ này không?", [
            { text: "Hủy", style: "cancel" },
            {
                text: "Xóa",
                style: "destructive",
                onPress: async () => {
                    const success = await api_deleteAddress(address._id);
                    if (success) {
                        Alert.alert("Thành công", "Địa chỉ đã được xóa!", [
                            { text: "OK", onPress: () => navigation.goBack() }
                        ]);
                    }
                }
            }
        ]);
    };
    

    return (
        <View style={Style_Edit_Address.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={Style_Edit_Address.header}>
                <Image style={Style_Edit_Address.backIcon} source={require('../../../src/assets/icon/icon_long_arrow.png')} />
                <Text style={Style_Edit_Address.headerTitle}>Chỉnh sửa địa chỉ</Text>
            </TouchableOpacity>

            <Text style={Style_Edit_Address.name}>Số nhà</Text>
            <TextInput style={Style_Edit_Address.input} value={detail} onChangeText={setDetail} />

            <Text style={Style_Edit_Address.name}>Phường/xã</Text>
            <TextInput style={Style_Edit_Address.input} value={commune} onChangeText={setCommune} />

            <Text style={Style_Edit_Address.name}>Quận/Huyện</Text>
            <TextInput style={Style_Edit_Address.input} value={district} onChangeText={setDistrict} />

            <Text style={Style_Edit_Address.name}>Tỉnh thành</Text>
            <TextInput style={Style_Edit_Address.input} value={province} onChangeText={setProvince} />

            <TouchableOpacity style={Style_Edit_Address.loginButton} onPress={handleUpdateAddress}>
                <Text style={Style_Edit_Address.loginButtonText}>Cập nhật</Text>
            </TouchableOpacity>

            <TouchableOpacity style={Style_Edit_Address.deleteButton} onPress={handleDeleteAddress}>
                <Text style={Style_Edit_Address.deleteButtonText}>Xóa</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Page_Edit_Address;
