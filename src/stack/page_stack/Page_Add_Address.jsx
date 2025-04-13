import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ToastAndroid, Switch } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { api_addAddress, api_updateAddressSelected } from '../../helper/ApiHelper';
import { AppContext } from '../../context';
import Style_Add_Address from '../../styles/Style_Add_Address';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../../styles/colors';
const pcVN = require('@do-kevin/pc-vn');

console.log("Danh sách tỉnh thành Việt Nam");
console.log(pcVN.getProvinces())
console.log("Danh sách quận huyện Việt Nam");
console.log(pcVN.getDistrictsByProvinceCode('60'));
console.log("Danh sách phường xã Việt Nam");
console.log(pcVN.getWardsByDistrictCode('593'))

const Page_Add_Address = (props) => {
    const { navigation, route } = props;
    const { users } = useContext(AppContext); // Lấy thông tin user từ context

    const [provinceList, setProvinceList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [wardList, setWardList] = useState([]);

    const [provinceOpen, setProvinceOpen] = useState(false);
    const [districtOpen, setDistrictOpen] = useState(false);
    const [wardOpen, setWardOpen] = useState(false);

    const [detail, setDetail] = useState(null);
    const [province, setProvince] = useState(null);
    const [district, setDistrict] = useState(null);
    const [ward, setWard] = useState(null);

    const [isSelected, setIsSelected] = useState(false);

    // Load tỉnh thành
    useEffect(() => {
        const data = pcVN.getProvinces().map(item => ({
            label: item.name,
            value: item.code,
            name: item.name
        }));
        setProvinceList(data);
    }, []);

    // Load quận huyện
    useEffect(() => {
        if (province) {
            const districts = pcVN.getDistrictsByProvinceCode(province).map(item => ({
                label: item.name,
                value: item.code,
                name: item.name
            }));
            setDistrictList(districts);
            setDistrict(null);
            setWard(null);
            setWardList([]);
        }
    }, [province]);

    // Load phường xã
    useEffect(() => {
        if (district) {
            const wards = pcVN.getWardsByDistrictCode(district).map(item => ({
                label: item.name,
                value: item.code,
                name: item.name
            }));
            setWardList(wards);
            setWard(null);
        };
    }, [district]);

    const handleAddAddress = async () => {
        if (!detail || !ward || !district || !province) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin địa chỉ!");
            return;
        }

        const provinceName = provinceList.find(item => item.value === province)?.label;
        const districtName = districtList.find(item => item.value === district)?.label;
        const wardName = wardList.find(item => item.value === ward)?.label;

        try {
            const response = await api_addAddress(detail, wardName, districtName, provinceName, users._id);
            if (response) {
                if (isSelected) {
                    ToastAndroid.show("Thêm địa chỉ thành công", ToastAndroid.SHORT);
                    await updateSelectedAddress(response._id);
                }
                navigation.goBack()
            } else {
                Alert.alert("Lỗi", "Không thể thêm địa chỉ, vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Lỗi khi thêm địa chỉ:", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi, vui lòng thử lại sau!");
        }
    };

    const updateSelectedAddress = async (id_address) => {
        try {
            const response = await api_updateAddressSelected(users._id, id_address, true);
            if (response) {
                ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
                return true
            } else {
                ToastAndroid.show("Cập nhật thất bại", ToastAndroid.SHORT);
                return false
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={Style_Add_Address.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={Style_Add_Address.header}>
                <Image style={Style_Add_Address.backIcon} source={require('../../../src/assets/icon/icon_long_arrow.png')} />
                <Text style={Style_Add_Address.headerTitle}>Thêm địa chỉ</Text>
            </TouchableOpacity>

            <Text style={Style_Add_Address.title}>Thông tin địa chỉ</Text>

            <TextInput
                style={Style_Add_Address.input}
                placeholder="Nhập số nhà"
                placeholderTextColor={colors.Black}
                value={detail}
                onChangeText={setDetail} />

            <View style={{zIndex: 3000}}>
                <DropDownPicker
                    open={provinceOpen}
                    value={province}
                    items={provinceList}
                    setOpen={setProvinceOpen}
                    setValue={setProvince}
                    setItems={setProvinceList}
                    placeholder='Chọn tỉnh/thành phố'
                    style={[Style_Add_Address.input, { borderWidth: 0 }]}
                    dropDownContainerStyle={{
                        borderRadius: 16,
                        backgroundColor: colors.Light_Blue,
                        borderWidth: 0,
                        marginTop: 0
                    }}

                    listItemLabelStyle={{ fontSize: 14 }}
                    placeholderStyle={{ color: colors.Black, fontSize: 14 }}
                    zIndex={3000}
                    zIndexInverse={1000} />
            </View>

            <View style={{zIndex: 2000}}>
                <DropDownPicker
                    open={districtOpen}
                    value={district}
                    items={districtList}
                    setOpen={setDistrictOpen}
                    setValue={setDistrict}
                    setItems={setDistrictList}
                    placeholder='Chọn quận/huyện'
                    disabled={!province}
                    style={[Style_Add_Address.input, !province && { opacity: 0.6 }]}
                    dropDownContainerStyle={{
                        borderRadius: 16,
                        backgroundColor: colors.Light_Blue,
                        borderWidth: 0,
                        marginTop: 0
                    }}

                    listItemLabelStyle={{ fontSize: 14 }}
                    placeholderStyle={[{ color: colors.Black }, !province && { opacity: 0.6 }]}
                    zIndex={2000}
                    zIndexInverse={2000} />
            </View>

            <View style={{zIndex: 1000}}>
                <DropDownPicker
                    open={wardOpen}
                    value={ward}
                    items={wardList}
                    setOpen={setWardOpen}
                    setValue={setWard}
                    setItems={setWardList}
                    placeholder='Chọn phường/xã'
                    disabled={!district}
                    style={[Style_Add_Address.input, !district && { opacity: 0.6 }]}
                    dropDownContainerStyle={{
                        borderRadius: 16,
                        backgroundColor: colors.Light_Blue,
                        borderWidth: 0,
                        marginTop: 0
                    }}

                    listItemLabelStyle={{ fontSize: 14 }}
                    placeholderStyle={[{ color: colors.Black }, !district && { opacity: 0.6 }]}
                    zIndex={1000}
                    zIndexInverse={3000} />
            </View>

            <View style={Style_Add_Address.container_switch}>
                <Text style={Style_Add_Address.text_switch}>Đặt làm mặc định</Text>
                <Switch
                    value={isSelected}
                    onValueChange={setIsSelected}
                    trackColor={{ false: colors.Grey, true: colors.Green }}
                    thumbColor={isSelected ? colors.White : colors.Black} />
            </View>

            <TouchableOpacity style={Style_Add_Address.loginButton} onPress={handleAddAddress}>
                <Text style={Style_Add_Address.loginButtonText}>Thêm</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Page_Add_Address;
