import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import { api_addAddress } from '../../helper/ApiHelper';
import { AppContext } from '../../context';
import Style_Add_Address from '../../styles/Style_Add_Address';

const Page_Add_Address = (props) => {
    const { navigation } = props;
    const { users } = useContext(AppContext); // Lấy thông tin user từ context

    const [detail, setDetail] = useState('');
    const [commune, setCommune] = useState('');
    const [district, setDistrict] = useState('');
    const [province, setProvince] = useState('');
    
    const handleAddAddress = async () => {
        if (!detail || !commune || !district || !province) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin địa chỉ!");
            return;
        }
    
        try {
            const response = await api_addAddress(detail, commune, district, province, users._id);
            if (response) {
                Alert.alert("Thành công", "Địa chỉ đã được thêm!", [
                    { text: "OK", onPress: () => navigation.goBack() }
                ]);
            } else {
                Alert.alert("Lỗi", "Không thể thêm địa chỉ, vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Lỗi khi thêm địa chỉ:", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi, vui lòng thử lại sau!");
        }
    };
    
    return (
        <View style={Style_Add_Address.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={Style_Add_Address.header}>
                <Image style={Style_Add_Address.backIcon} source={require('../../../src/assets/icon/icon_long_arrow.png')} />
                <Text style={Style_Add_Address.headerTitle}>Thêm địa chỉ</Text>
            </TouchableOpacity>

            <Text style={Style_Add_Address.name}>Số nhà</Text>
            <TextInput style={Style_Add_Address.input} placeholder="Nhập số nhà" value={detail} onChangeText={setDetail} />

            <Text style={Style_Add_Address.name}>Phường/xã</Text>
            <TextInput style={Style_Add_Address.input} placeholder="Nhập phường/xã" value={commune} onChangeText={setCommune} />

            <Text style={Style_Add_Address.name}>Quận/Huyện</Text>
            <TextInput style={Style_Add_Address.input} placeholder="Nhập quận/huyện" value={district} onChangeText={setDistrict} />

            <Text style={Style_Add_Address.name}>Tỉnh thành</Text>
            <TextInput style={Style_Add_Address.input} placeholder="Nhập tỉnh/thành phố" value={province} onChangeText={setProvince} />

            <TouchableOpacity style={Style_Add_Address.loginButton} onPress={handleAddAddress}>
                <Text style={Style_Add_Address.loginButtonText}>Thêm</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Page_Add_Address;
