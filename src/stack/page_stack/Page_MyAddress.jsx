import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Style_MyAddress from '../../styles/Style_MyAddress';
import { api_getAddressList, api_updateAddressSelected } from '../../helper/ApiHelper';
import { AppContext } from '../../context';

const Page_MyAddress = (props) => {
    const { navigation } = props;
    const [address, setAddress] = useState([]);
    const [loading, setLoading] = useState(true);
    const { users, setUsers } = useContext(AppContext);
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    const fetchAddresses = async () => {
        setLoading(true);
        try {
            const data = await api_getAddressList(users._id);
            if (Array.isArray(data)) {
                setAddress(data);

                const selectedAddress = data.find(addr => addr.selected);
                if (selectedAddress) {
                    setSelectedAddressId(selectedAddress?._id);
                }

                console.log("ID của địa chỉ: ", selectedAddress?._id)
            } else {
                console.error("Lỗi: API không trả về danh sách hợp lệ!", data);
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách địa chỉ:', error);
        } finally {
            setLoading(false);
        }
    };

    // Gọi API mỗi khi màn hình được focus
    useFocusEffect(
        useCallback(() => {
            fetchAddresses();
        }, [])
    );

    // Hàm chọn địa chỉ
    const handleSelectAddress = async (id_address) => {
        const selectState = id_address !== selectedAddressId;

        const response = await api_updateAddressSelected(users._id, id_address, selectState);
        console.log("Địa chỉ của user: ", users._id);
        console.log("ID địa chỉ: ", id_address);

        if (response) {
            setSelectedAddressId(selectState ? id_address : null);
            fetchAddresses();

            if (selectState) {
                navigation.goBack();
            }
        }
    }

    const renderAddressItem = ({ item }) => {
        const isSelected = item._id === selectedAddressId;

        return (
            <TouchableOpacity
                style={Style_MyAddress.addressContainer}
                onPress={() => handleSelectAddress(item._id)}>
                <View style={[Style_MyAddress.iconLocation, isSelected && Style_MyAddress.selectedAddress]}>
                    {
                        isSelected ? (
                            <Image style={Style_MyAddress.locationIcon} source={require('../../assets/icon/icon_tick_white.png')} />
                        ) : (
                            <Image style={Style_MyAddress.locationIcon} source={require('../../assets/icon/icon_location.png')} />
                        )
                    }
                </View>
                <View style={Style_MyAddress.addressDetails}>
                    <Text style={Style_MyAddress.addressText}>
                        {item.detail}, {item.commune}, {item.district}, {item.province}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('EditAddress', { address: item })}>
                        <Text style={Style_MyAddress.editText}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={Style_MyAddress.container}>
            {/* Header */}
            <TouchableOpacity
                style={Style_MyAddress.header}
                onPress={() => navigation.navigate('Tab', { screen: 'Profile' })}>
                <Image style={Style_MyAddress.backIcon} source={require('../../assets/icon/icon_long_arrow.png')} />
                <Text style={Style_MyAddress.headerTitle}>Địa chỉ giao hàng</Text>
            </TouchableOpacity>

            {/* Thêm địa chỉ */}
            <TouchableOpacity
                style={Style_MyAddress.addButton}
                onPress={() => navigation.navigate('AddAddress')}>
                <Text style={Style_MyAddress.addButtonText}>Thêm địa chỉ</Text>
            </TouchableOpacity>

            {/* Hiển thị loading */}
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#ff0000" />
                </View>
            ) : (
                address.length > 0 ? (
                    <FlatList
                        data={address}
                        keyExtractor={(item) => item._id || item.id}
                        renderItem={renderAddressItem}
                    />
                ) : (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>Không có địa chỉ nào</Text>
                )
            )}
        </View>
    );
};

export default Page_MyAddress;
