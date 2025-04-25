import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ToastAndroid, Switch, Animated, ActivityIndicator, Modal, FlatList } from 'react-native';
import React, { useState, useEffect, useContext, useRef } from 'react';
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
    const [modalVisible, setModalVisible] = useState({ province: false, district: false, ward: false });
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);

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

        setIsLoading(true);

        try {
            const provinceName = provinceList.find(p => p.value === province)?.label;
            const districtName = districtList.find(d => d.value === district)?.label;
            const wardName = wardList.find(w => w.value === ward)?.label;

            const response = await api_updateAddress(address._id, detail, wardName, districtName, provinceName, address.id_user);
            if (response) {
                await api_updateAddressSelected(users._id, address._id, isSelected);
                ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
                navigation.goBack();
            } else {
                Alert.alert("Lỗi", "Cập nhật thất bại!");
            }
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false)
        }
    };

    const handleDeleteAddress = async () => {
        Alert.alert("Xác nhận", "Bạn có chắc muốn xóa địa chỉ này?", [
            { text: "Hủy", style: "cancel" },
            {
                text: "Xóa", style: "destructive",
                onPress: async () => {
                    setIsLoading2(true);

                    try {
                        const success = await api_deleteAddress(address._id);
                        if (success) {
                            ToastAndroid.show("Đã xóa địa chỉ", ToastAndroid.SHORT);
                            navigation.goBack()
                        } else {
                            Alert.alert("Lỗi", "Không thể xóa địa chỉ.");
                        }
                    } catch (e) {
                        console.log(e)
                    } finally {
                        setIsLoading2(false);
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

            <TouchableOpacity
                onPress={() => setModalVisible({ ...modalVisible, province: true })}
                style={Style_Add_Address.input}>
                <Text style={{ fontSize: 14, color: colors.Black }}>
                    {provinceList.find(p => p.value === province)?.label || "Chọn tỉnh/thành phố"}
                </Text>
                <Image
                    source={require('../../assets/icon/icon_arrow_down.png')}
                    style={{ width: 14, height: 14 }} />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => setModalVisible({ ...modalVisible, district: true })}
                style={[Style_Add_Address.input, !province && { opacity: 0.6 }]}
                disabled={!province}>
                <Text style={{ fontSize: 14, color: colors.Black }}>
                    {districtList.find(p => p.value === district)?.label || 'Chọn quận/huyện'}
                </Text>
                <Image
                    source={require('../../assets/icon/icon_arrow_down.png')}
                    style={{ width: 14, height: 14 }} />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => setModalVisible({ ...modalVisible, ward: true })}
                style={[Style_Add_Address.input, !district && { opacity: 0.6 }]}
                disabled={!district}>
                <Text style={{ fontSize: 14, color: colors.Black }}>
                    {wardList.find(p => p.value === ward)?.label || 'Chọn phường/xã'}
                </Text>
                <Image
                    source={require('../../assets/icon/icon_arrow_down.png')}
                    style={{ width: 14, height: 14 }} />
            </TouchableOpacity>

            {/* <View style={{ zIndex: 3000 }}>
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
            </View> */}

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
                <TouchableOpacity
                    style={Style_Edit_Address.deleteButton}
                    onPress={handleDeleteAddress}>
                    {
                        isLoading2 ? (
                            <ActivityIndicator size='small' color={colors.White} />
                        ) : (
                            <Text style={Style_Edit_Address.deleteButtonText}>Xóa</Text>
                        )
                    }
                </TouchableOpacity>

                <TouchableOpacity
                    style={Style_Edit_Address.loginButton}
                    onPress={handleUpdateAddress}>
                    {
                        isLoading ? (
                            <ActivityIndicator size='small' color={colors.White} />
                        ) : (
                            <Text style={Style_Edit_Address.loginButtonText}>Cập nhật</Text>
                        )
                    }
                </TouchableOpacity>
            </View>

            <ModalSelector
                visible={modalVisible.province}
                data={provinceList}
                title={"Chọn tỉnh/thành phố"}
                onSelect={(val) => {
                    setProvince(val.value);
                    setDistrict(null);
                    setWard(null);
                    setModalVisible({ ...modalVisible, province: false });
                }}
                onClose={() => setModalVisible({ ...modalVisible, province: false })} />

            <ModalSelector
                visible={modalVisible.district}
                data={districtList}
                title={"Chọn quận/huyện"}
                onSelect={(val) => {
                    setDistrict(val.value);
                    setModalVisible({ ...modalVisible, district: false });
                }}
                onClose={() => setModalVisible({ ...modalVisible, district: false })} />

            <ModalSelector
                visible={modalVisible.ward}
                data={wardList}
                title={"Chọn phường/xã"}
                onSelect={(val) => {
                    setWard(val.value);
                    setModalVisible({ ...modalVisible, ward: false });
                }}
                onClose={() => setModalVisible({ ...modalVisible, ward: false })} />
        </View>
    );
};

export default Page_Edit_Address;
