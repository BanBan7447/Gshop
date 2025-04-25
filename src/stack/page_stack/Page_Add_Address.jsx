import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ToastAndroid, Switch, ScrollView, Modal, FlatList, Animated, Easing, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { api_addAddress, api_updateAddressSelected } from '../../helper/ApiHelper';
import { AppContext } from '../../context';
import Style_Add_Address from '../../styles/Style_Add_Address';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../../styles/colors';
import { Picker } from '@react-native-picker/picker';
import { ModalDropdown } from 'react-native-modal-dropdown';
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
    const [modalVisible, setModalVisible] = useState({ province: false, district: false, ward: false });
    const [isLoading, setIsLoading] = useState(false);

    const ModalSelector = ({ visible, data, onSelect, onClose, title }) => {
        const fadeAnim = useRef(new Animated.Value(0)).current;
        const slideAnim = useRef(new Animated.Value(300)).current;
        const [showModal, setShowModal] = useState(visible);

        useEffect(() => {
            if (visible) {
                setShowModal(true);
                Animated.parallel([
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(slideAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]).start();
            } else {
                Animated.parallel([
                    Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                    Animated.timing(slideAnim, {
                        toValue: 300,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                ]).start(() => {
                    setShowModal(false);
                });
            }
        }, [visible]);

        const handleClose = () => {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 300,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                onClose();
            });
        };

        if (!showModal) return null;

        return (
            <Modal transparent visible={showModal} animationType="none" onRequestClose={handleClose}>
                <Animated.View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        opacity: fadeAnim,
                        justifyContent: 'flex-end',
                    }}
                >
                    <Animated.View
                        style={[
                            Style_Add_Address.modalContainer,
                            {
                                transform: [{ translateY: slideAnim }],
                            },
                        ]}
                    >
                        <Text style={Style_Add_Address.modalTitle}>{title}</Text>
                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => item?.value?.toString() || index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={Style_Add_Address.modalItem}
                                    onPress={() => onSelect(item)}
                                >
                                    <Text style={Style_Add_Address.modalItemText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity style={Style_Add_Address.modalClose} onPress={handleClose}>
                            <Text style={Style_Add_Address.modalCloseText}>Đóng</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </Animated.View>
            </Modal>
        );
    };

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
        if (province?.value) {
            const districts = pcVN.getDistrictsByProvinceCode(province.value).map(item => ({
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
        if (district?.value) {
            const wards = pcVN.getWardsByDistrictCode(district.value).map(item => ({
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

        // const provinceName = provinceList.find(item => item.value === province)?.label;
        // const districtName = districtList.find(item => item.value === district)?.label;
        // const wardName = wardList.find(item => item.value === ward)?.label;

        const provinceName = province?.label;
        const districtName = district?.label;
        const wardName = ward?.label;
        setIsLoading(true);
        
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
        } finally {
            setIsLoading(false);
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

            <TouchableOpacity
                onPress={() => setModalVisible({ ...modalVisible, province: true })}
                style={Style_Add_Address.input}>
                <Text style={{ fontSize: 14, color: colors.Black }}>{province?.label || 'Chọn tỉnh/thành phố'}</Text>
                <Image
                    source={require('../../assets/icon/icon_arrow_down.png')}
                    style={{ width: 14, height: 14 }} />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => setModalVisible({ ...modalVisible, district: true })}
                style={[Style_Add_Address.input, !province && { opacity: 0.6 }]}
                disabled={!province}>
                <Text style={{ fontSize: 14, color: colors.Black }}>{district?.label || 'Chọn quận/huyện'}</Text>
                <Image
                    source={require('../../assets/icon/icon_arrow_down.png')}
                    style={{ width: 14, height: 14 }} />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => setModalVisible({ ...modalVisible, ward: true })}
                style={[Style_Add_Address.input, !district && { opacity: 0.6 }]}
                disabled={!district}>
                <Text style={{ fontSize: 14, color: colors.Black }}>{ward?.label || 'Chọn phường/xã'}</Text>
                <Image
                    source={require('../../assets/icon/icon_arrow_down.png')}
                    style={{ width: 14, height: 14 }} />
            </TouchableOpacity>

            {/* <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 20 }}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled={true}>
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
                        marginTop: 0,
                        maxHeight: 200
                    }}
                    scrollViewProps={{ keyboardShouldPersistTaps: 'handled', nestedScrollEnabled: true }}
                    listItemLabelStyle={{ fontSize: 14 }}
                    placeholderStyle={{ color: colors.Black, fontSize: 14 }}
                    zIndex={3000}
                    zIndexInverse={1000} />
            </ScrollView>

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
                        marginTop: 0,
                        maxHeight: 200
                    }}
                    scrollViewProps={{ keyboardShouldPersistTaps: 'handled', nestedScrollEnabled: true }}
                    listItemLabelStyle={{ fontSize: 14 }}
                    placeholderStyle={[{ color: colors.Black }, !province && { opacity: 0.6 }]}
                    zIndex={2000}
                    zIndexInverse={2000} />
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
                        marginTop: 0,
                        maxHeight: 200
                    }}
                    scrollViewProps={{ keyboardShouldPersistTaps: 'handled', nestedScrollEnabled: true }}
                    listItemLabelStyle={{ fontSize: 14 }}
                    placeholderStyle={[{ color: colors.Black }, !district && { opacity: 0.6 }]}
                    zIndex={1000}
                    zIndexInverse={3000} />
            </View> */}

            <View style={[Style_Add_Address.container_switch, {marginTop: 24}]}>
                <Text style={Style_Add_Address.text_switch}>Đặt làm mặc định</Text>
                <Switch
                    value={isSelected}
                    onValueChange={setIsSelected}
                    trackColor={{ false: colors.Grey, true: colors.Green }}
                    thumbColor={isSelected ? colors.White : colors.Black} />
            </View>

            <TouchableOpacity
                style={[Style_Add_Address.loginButton, isLoading && { opacity: 0.6 }]}
                onPress={handleAddAddress}>
                {
                    isLoading ? (
                        <ActivityIndicator size='small' color={colors.White} />
                    ) : (
                        <Text style={Style_Add_Address.loginButtonText}>Thêm</Text>
                    )
                }
            </TouchableOpacity>

            <ModalSelector
                visible={modalVisible.province}
                data={provinceList}
                title={"Chọn tỉnh/thành phố"}
                onSelect={(val) => {
                    setProvince(val);
                    setModalVisible({ ...modalVisible, province: false });
                }}
                onClose={() => setModalVisible({ ...modalVisible, province: false })} />

            <ModalSelector
                visible={modalVisible.district}
                data={districtList}
                title={"Chọn quận/huyện"}
                onSelect={(val) => {
                    setDistrict(val);
                    setModalVisible({ ...modalVisible, district: false });
                }}
                onClose={() => setModalVisible({ ...modalVisible, district: false })} />

            <ModalSelector
                visible={modalVisible.ward}
                data={wardList}
                title={"Chọn phường/xã"}
                onSelect={(val) => {
                    setWard(val);
                    setModalVisible({ ...modalVisible, ward: false });
                }}
                onClose={() => setModalVisible({ ...modalVisible, ward: false })} />
        </View>
    );
};

export default Page_Add_Address;
