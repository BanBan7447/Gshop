import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Style_MyAddress from '../../styles/Style_MyAddress';
import { api_getAddressList, api_updateAddressSelected } from '../../helper/ApiHelper';
import { AppContext } from '../../context';
import colors from '../../styles/colors';

const Page_MyAddress = (props) => {
    const { navigation, route } = props;
    const [address, setAddress] = useState([]);
    const [loading, setLoading] = useState(true);
    const { users, setUsers } = useContext(AppContext);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchAddress();
        setRefreshing(false);
    }

    const fromCheckout = route?.params?.fromCheckout || false;

    const fetchAddress = async () => {
        setLoading(true);
        try {
            const data = await api_getAddressList(users._id);
            console.log("Danh sách địa chỉ mới nhất:", data);

            if (Array.isArray(data) && data.length > 0) {
                setAddress(data);

                const selectedAddress = data.find(addr => addr.selected);
                // if (selectedAddress) {
                //     setSelectedAddressId(selectedAddress?._id);
                //     console.log("ID của địa chỉ: ", selectedAddress?._id);
                // }

                setSelectedAddressId(selectedAddress?._id || null);
            } else {
                setAddress([]);
            }
        } catch (e) {
            console.error('Lỗi khi lấy danh sách địa chỉ:', e);
            setAddress([]);
        } finally {
            setLoading(false);
        }
    }

    // Gọi API mỗi khi màn hình được focus
    useFocusEffect(
        useCallback(() => {
            fetchAddress();
        }, [])
    );

    // Hàm chọn địa chỉ
    const handleSelectAddress = async (id_address) => {
        if (id_address === selectedAddressId) {
            return;
        }

        try {
            if (selectedAddressId) {
                await api_updateAddressSelected(users._id, selectedAddressId, false);
            }

            await api_updateAddressSelected(users._id, id_address, true);

            setSelectedAddressId(id_address);
            fetchAddress();

            if (selectedAddressId && fromCheckout) {
                // navigation.navigate("Payment")
                navigation.goBack()
            }
        } catch (e) {
            console.log(e)
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
        <ScrollView
            style={Style_MyAddress.container}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[colors.Red]}
                    tintColor={colors.Red}
                />
            }>
            <TouchableOpacity
                style={Style_MyAddress.header}
                onPress={() => navigation.goBack()}>
                <Image style={Style_MyAddress.backIcon} source={require('../../assets/icon/icon_long_arrow.png')} />
                <Text style={Style_MyAddress.headerTitle}>Địa chỉ giao hàng</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={Style_MyAddress.addButton}
                onPress={() => navigation.navigate('AddAddress')}>
                <Text style={Style_MyAddress.addButtonText}>Thêm địa chỉ</Text>
            </TouchableOpacity>

            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 24 }}>
                    <ActivityIndicator size="large" color="#ff0000" />
                </View>
            ) : (
                address.length > 0 ? (
                    <FlatList
                        data={address}
                        keyExtractor={(item) => item._id || item.id}
                        renderItem={renderAddressItem}
                        scrollEnabled={false}
                    />
                ) : (
                    <View style={{ marginTop: 24 }}>
                        <Text style={{ textAlign: 'center' }}>Không có địa chỉ nào</Text>
                    </View>
                )
            )}
        </ScrollView>
    );
};

export default Page_MyAddress;
