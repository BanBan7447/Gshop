import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Style_MyAddress from '../../styles/Style_MyAddress';
import { api_getAddressList } from '../../helper/ApiHelper';

const Page_MyAddress = (props) => {
    const { navigation } = props;
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = "678bf88c4d7b020105ad27fb"; // ID user test
    const [defaultAddressId, setDefaultAddressId] = useState(null);


    const fetchAddresses = async () => {
        setLoading(true);
        try {
            const data = await api_getAddressList(userId);
            if (Array.isArray(data)) {
                setAddresses(data);
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
                addresses.length > 0 ? (
                    <FlatList
                        data={addresses}
                        keyExtractor={(item) => item._id || item.id}
                        renderItem={({ item }) => (
                            <View style={Style_MyAddress.addressContainer}>
                                <View style={Style_MyAddress.iconLocation}>
                                    <Image style={Style_MyAddress.locationIcon} source={require('../../assets/icon/icon_location.png')} />
                                </View>
                                <View style={Style_MyAddress.addressDetails}>
                                    <Text style={Style_MyAddress.addressText}>
                                        {item.detail}, {item.commune}, {item.district}, {item.province}
                                    </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('EditAddress', { address: item })}>
                                        <Text style={Style_MyAddress.editText}>Chỉnh sửa</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                ) : (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>Không có địa chỉ nào</Text>
                )
            )}
        </View>
    );
};

export default Page_MyAddress;
