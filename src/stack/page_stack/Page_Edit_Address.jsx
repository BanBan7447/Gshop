import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ToastAndroid, Switch } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { api_updateAddress, api_deleteAddress, api_updateAddressSelected } from '../../helper/ApiHelper';
import Style_Edit_Address from '../../styles/Style_Edit_Address';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../../styles/colors';
import Style_Add_Address from '../../styles/Style_Add_Address';
import { AppContext } from '../../context';
const pcVN = require('@do-kevin/pc-vn');

const Page_Edit_Address = (props) => {
    const { users } = useContext(AppContext);
    const { navigation, route } = props;
    const { address } = route.params;

    const [detail, setDetail] = useState(address.detail);
    const [province, setProvince] = useState(null);
    const [district, setDistrict] = useState(null);
    const [ward, setWard] = useState(null);

    const [provinceList, setProvinceList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [wardList, setWardList] = useState([]);

    const [provinceOpen, setProvinceOpen] = useState(false);
    const [districtOpen, setDistrictOpen] = useState(false);
    const [wardOpen, setWardOpen] = useState(false);

    const [isSelected, setIsSelected] = useState(address.selected || false);

    // Load tỉnh
    useEffect(() => {
        const provinces = pcVN.getProvinces().map(item => ({
            label: item.name,
            value: item.code,
            name: item.name
        }));
        setProvinceList(provinces);

        const selectedProvince = provinces.find(p => p.label === address.province);
        if (selectedProvince) setProvince(selectedProvince.value);
    }, []);

    // Load quận khi có tỉnh
    useEffect(() => {
        if (province) {
            const districts = pcVN.getDistrictsByProvinceCode(province).map(item => ({
                label: item.name,
                value: item.code,
                name: item.name
            }));
            setDistrictList(districts);

            const selectedDistrict = districts.find(d => d.label === address.district);
            if (selectedDistrict) setDistrict(selectedDistrict.value);
        }
    }, [province]);

    // Load phường khi có quận
    useEffect(() => {
        if (district) {
            const wards = pcVN.getWardsByDistrictCode(district).map(item => ({
                label: item.name,
                value: item.code,
                name: item.name
            }));
            setWardList(wards);

            const selectedWard = wards.find(w => w.label === address.commune);
            if (selectedWard) setWard(selectedWard.value);
        }
    }, [district]);

    const handleUpdateAddress = async () => {
        if (!detail || !province || !district || !ward) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        const provinceName = provinceList.find(p => p.value === province)?.label;
        const districtName = districtList.find(d => d.value === district)?.label;
        const wardName = wardList.find(w => w.value === ward)?.label;

        const response = await api_updateAddress(address._id, detail, wardName, districtName, provinceName, address.id_user);
        if (response) {
            if (isSelected) {
                await api_updateAddressSelected(users._id, address._id, true);
            }

            Alert.alert("Thành công", "Địa chỉ đã được cập nhật!", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);
        } else {
            Alert.alert("Lỗi", "Cập nhật thất bại!");
        }
    };

    const handleDeleteAddress = async () => {
        Alert.alert("Xác nhận", "Bạn có chắc muốn xóa địa chỉ này?", [
            { text: "Hủy", style: "cancel" },
            {
                text: "Xóa", style: "destructive",
                onPress: async () => {
                    const success = await api_deleteAddress(address._id);
                    if (success) {
                        ToastAndroid.show("Đã xóa địa chỉ", ToastAndroid.SHORT);
                        navigation.goBack()
                    } else {
                        Alert.alert("Lỗi", "Không thể xóa địa chỉ.");
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

            <Text style={Style_Edit_Address.title}>Thông tin địa chỉ</Text>

            <TextInput
                style={Style_Edit_Address.input}
                placeholder="Nhập số nhà"
                value={detail}
                onChangeText={setDetail}
                placeholderTextColor={colors.Black}
            />

            <View style={{ zIndex: 3000 }}>
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
                    placeholderStyle={{ color: colors.Black }}
                    zIndex={3000}
                    zIndexInverse={1000}
                />
            </View>

            <View style={{ zIndex: 2000 }}>
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
                    zIndexInverse={2000}
                />
            </View>

            <View style={{ zIndex: 1000 }}>
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
                    zIndexInverse={3000}
                />
            </View>

            <View style={Style_Add_Address.container_switch}>
                <Text style={Style_Add_Address.text_switch}>Đặt làm mặc định</Text>
                <Switch
                    value={isSelected}
                    onValueChange={setIsSelected}
                    trackColor={{ false: colors.Grey, true: colors.Green }}
                    thumbColor={isSelected ? colors.White : colors.Black} />
            </View>

            <View style={{ flex: 1 }}></View>

            <View style={Style_Edit_Address.containerBTN}>
                <TouchableOpacity style={Style_Edit_Address.deleteButton} onPress={handleDeleteAddress}>
                    <Text style={Style_Edit_Address.deleteButtonText}>Xóa</Text>
                </TouchableOpacity>

                <TouchableOpacity style={Style_Edit_Address.loginButton} onPress={handleUpdateAddress}>
                    <Text style={Style_Edit_Address.loginButtonText}>Cập nhật</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Page_Edit_Address;
